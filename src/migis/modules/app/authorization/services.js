import AppServices from '@/migis/modules/app/services'
import UserServices from '@/migis/modules/app/user/services'
import http from '@/migis/modules/libs/axios';
import store from '@/store';
import { storeToken, getToken, verifyToken } from '@/migis/modules/libs/vue-cookies'

class AuthorizationService {
  constructor() {
    this.routename = 'auth';
  }

  async init() {
    await this.getPermissionAll()
    await this.getRoleAll()
    await UserServices.getUsers()
  };

  async release() {
    store.commit('migis/user/SET_USERS', [], { root: true })
    store.commit('migis/authorization/SET_PERMISSIONS', [], { root:true })
    store.commit('migis/authorization/SET_ROLES', [], { root:true })
  };

  /** Permisson Section */
  async getPermissionAll() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/permission/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/authorization/SET_PERMISSIONS', response.data.data, {root:true})
      }
      return response.data
    } catch (e) {
      throw e
    }
  };

  async updatePermission(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/permission/${payload.permission_unique_str}`, 
        payload,
        { headers: 
          { Authorization: token ? `Bearer ${token}` : '' },
        }
      )
      return response.data
    } catch (e) {
      throw e
    }
  };
  /** End Permisson Section */

  /** Role Section */
  async getRoleAll() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/role/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/authorization/SET_ROLES', response.data.data, {root:true})
      }
      return response.data
    } catch (e) {
      throw e
    }
  };

  async createRole(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/role/create`, 
        payload,
        { headers: 
          { Authorization: token ? `Bearer ${token}` : '' },
        }
      )
      return response.data
    } catch (e) {
      throw e
    }
  };

  async updateRole(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/role/${payload.role_unique_str}`, 
        payload,
        { headers: 
          { Authorization: token ? `Bearer ${token}` : '' },
        }
      )
      return response.data
    } catch (e) {
      throw e
    }
  };

  async deleteRole(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.delete(`${prefix}/${this.routename}/role/${payload.unique}`, 
        { headers: 
          { Authorization: token ? `Bearer ${token}` : '' },
        }
      )
      return response.data
    } catch (e) {
      throw e
    }
  };
  /** End Role Section */

  /** User Section */
  async signIn(payload) {
    try {
      const getToken = await this.getTokenFromServer(payload)
      const sendAuthentication = await this.sendAuthenticate()
      return sendAuthentication
    } catch (error) {
      throw error
    }
  };

  async signOut() {
    try {
      const token = await getToken();
      const decryptedToken = await verifyToken();
      const socketId = store.state.migis.socket.socketProps.id
      const sendRequestParams = {
        eventName: 'userLoggedOut',
        eventMessage: JSON.stringify({
          userId: decryptedToken.user_id,
          token: token,
          socketId: socketId,
        })
      };
      const emitEvent = await store.dispatch('migis/socket/emitting', sendRequestParams, {root:true})
      return emitEvent
    } catch (error) {
      throw error
    }
  };

  async createUserAuth(payload) {
    try {
      const dataCreate = {
        user_id: payload.user_id,
        nik: payload.nik.toString(),
        permissions: JSON.stringify(payload.permissions),
        roles: JSON.stringify(payload.roles),
        createLogin: {
          email: payload.dataLogin.email,
          password: payload.dataLogin.password,
          cpassword: payload.dataLogin.rePassword,
          isActive: payload.dataLogin.isActive,
          user_auth_id: payload.dataLogin.user_auth_id,
        },
      }
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/register`, dataCreate, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      return response
    } catch (error) {
      throw error
    }
  };

  async getTokenFromServer(payload) {
    try {
      await AppServices.init()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/login`, payload)
      await storeToken(response.data.data)
      return response.data
    } catch (error) {
      throw error
    }
  };

  async sendAuthenticate() {
    try {
      const token = await getToken()
      const decryptedToken = await verifyToken();
      const socketId = store.state.migis.socket.socketProps.id
      const sendRequestParams = {
        eventName: 'userLoggedIn',
        eventMessage: JSON.stringify({
          userId: decryptedToken.user_id,
          token: token,
          socketId: socketId,
        })
      };
      const emitEvent = await store.dispatch('migis/socket/emitting', sendRequestParams, {root:true})
      return emitEvent
    } catch (error) {
      throw error
    }
  };

  async getAuthenticated(payload) {
    try {
      const decryptedToken = await verifyToken();
      store.commit('migis/auth/SET_USERID', decryptedToken.user_id);
      store.commit('migis/auth/SET_USERDATA', payload.userdata);
      const userData = await store.getters['migis/auth/userData']
      const setPermissions = await this.setUserAuthPermissions({
        userRoles: userData.userRoles,
        userPermissions: userData.userPermissions
      })
      return payload.userdata
    } catch (error) {
      throw error
    }
  };

  async setUserAuthPermissions(payload) {
    try {
      const permissions = payload.userPermissions
      const permissionsRole = payload.userRoles.reduce((acc, curr) => acc.concat(curr.rolePermissions), [])
      const combinedPermissions = permissions.concat(permissionsRole)

      const rawTransformed = combinedPermissions.filter((item, index) => {
        return (
          combinedPermissions.findIndex((el) => { return el.permission_unique_str === item.permission_unique_str }) === index
        )
      })
      const transformed = await rawTransformed.map(permission => {
        const [action, subject] = permission.name.split('.')
        return { action, subject }
      })
      store.commit('migis/auth/SET_USERABILITIES', transformed)
      return transformed
    } catch (error) {
      throw error
    }
  };


  async updateUserRolePermission(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/user/${payload.user_id}/role-permission`,
        payload,
        { headers: 
          { Authorization: token ? `Bearer ${token}` : '' },
        }
      )
      return response.data
    } catch (e) {
      throw e
    }
  };
  /** End User Section */

  validator(form) {
    const errors = []
    if(!form.name) errors.push('Nama role harus diisi.')
    if(!form.description) errors.push('Deskripsi harus diisi.')
    return { success: errors.length === 0, message: errors }
  };

  permissionValidator(form) {
    const errors = []
    if(!form.text) errors.push('Teks harus diisi.')
    if(!form.description) errors.push('Deskripsi harus diisi.')
    return { success: errors.length === 0, message: errors }
  };

  validatorUserAuth(payload) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const errors = [];
    if(!payload.dataLogin.email) errors.push('Email tidak boleh kosong.')
    if(!payload.dataLogin.password) errors.push('Password tidak boleh kosong.')
    if(!payload.dataLogin.rePassword) errors.push('Konfirmasi Password tidak boleh kosong.')
    if(!payload.dataLogin.email.match(emailRegex)) errors.push('Format email tidak sesuai.')
    if(payload.dataLogin.password.length < 6) errors.push('Password minimal 6 karakter.')
    if(payload.dataLogin.password !== payload.dataLogin.rePassword) errors.push('Konfirmasi Password tidak sama.')
    return { success: errors.length === 0, message: errors }
  };

  validatorUpdateUserAuth(payload) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const errors = [];
    if(!payload.dataLogin.email) errors.push('Email tidak boleh kosong.')
    if(!payload.dataLogin.email.match(emailRegex)) errors.push('Format email tidak sesuai.')
    if(payload.dataLogin.password) {
      if(payload.dataLogin.password.length < 6) errors.push('Password minimal 6 karakter.')
      if(!payload.dataLogin.rePassword) errors.push('Konfirmasi Password tidak boleh kosong.')
      if(payload.dataLogin.password !== payload.dataLogin.rePassword) errors.push('Konfirmasi Password tidak sama.')
    }
    return { success: errors.length === 0, message: errors }
  }
}

export default new AuthorizationService()