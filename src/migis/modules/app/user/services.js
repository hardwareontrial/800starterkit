import AppServices from '@/migis/modules/app/services'
import http from "@/migis/modules/libs/axios";
import store from "@/store";
import AuthorizationServices from '@/migis/modules/app/authorization/services'

class UserServices {
  constructor() {
    this.routename = 'user';
  }

  async init() {
    await this.getUsers()
  };

  async getUsers() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/user/SET_USERS', response.data.data, {root:true})
      }
      return response.data
    } catch (e) {
      console.error(`error on getUsers (user\services): ${e}`)
      throw e
    }
  };

  async createUser(payload) {
    // console.log(payload)
    try {
      const createdForm = new FormData();
      createdForm.append('avatarFile', payload.avatarFile)
      createdForm.append('nik', payload.nik)
      createdForm.append('fname', payload.fname)
      createdForm.append('mname', payload.mname)
      createdForm.append('lname', payload.lname)
      createdForm.append('positionId', payload.positionId)
      createdForm.append('isActive', payload.isActive);
      createdForm.append('isAdmin', payload.isAdmin);
      createdForm.append('permissions', JSON.stringify(payload.permissions));
      createdForm.append('roles', JSON.stringify(payload.roles));
      createdForm.append('user_id', payload.user_id);
      createdForm.append('user_unique_str', payload.user_unique_str);
      createdForm.append('avatar', payload.avatar);
      createdForm.append('createLogin[isActive]', payload.dataLogin.isActive);
      createdForm.append('createLogin[email]', payload.dataLogin.email);
      createdForm.append('createLogin[password]', payload.dataLogin.password);
      createdForm.append('createLogin[cpassword]', payload.dataLogin.rePassword);
      createdForm.append('createLogin[user_auth_id]', payload.dataLogin.user_auth_id);

      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const creating = await http.post(`${prefix}/${this.routename}/create`, createdForm, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      return creating
    } catch (error) {
      throw error
    }
  };

  async detailUser(payload) {
    try {
      const queryBy = payload.detailBy;
      const params = payload.params;
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const detail = await http.get(`${prefix}/${this.routename}/${params}/detail`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          detailBy: queryBy,
        },
      })
      return detail
    } catch (error) {
      throw error
    }
  };

  async updateUser(payload) {
    // console.log(payload)
    try {
      const updateForm = new FormData()
      updateForm.append('avatarFile', payload.avatarFile)
      updateForm.append('nik', payload.nik)
      updateForm.append('fname', payload.fname)
      updateForm.append('mname', payload.mname)
      updateForm.append('lname', payload.lname)
      updateForm.append('positionId', payload.positionId)
      updateForm.append('isActive', payload.isActive);
      updateForm.append('isAdmin', payload.isAdmin);
      updateForm.append('permissions', JSON.stringify(payload.permissions));
      updateForm.append('roles', JSON.stringify(payload.roles));
      updateForm.append('user_id', payload.user_id);
      updateForm.append('user_unique_str', payload.user_unique_str);
      updateForm.append('avatar', payload.avatar);
      updateForm.append('dataLogin[isActive]', payload.dataLogin.isActive);
      updateForm.append('dataLogin[email]', payload.dataLogin.email);
      updateForm.append('dataLogin[password]', payload.dataLogin.password);
      updateForm.append('dataLogin[cpassword]', payload.dataLogin.rePassword);
      updateForm.append('dataLogin[user_auth_id]', payload.dataLogin.user_auth_id);
      
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const updating = await http.put(`${prefix}/${this.routename}/${payload.user_id}/update`, updateForm, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data',
        },
      });
      return updating.data
    }
    catch(error) {
      console.log(error)
      throw error
    }
  };

  validatorCreateUser(payload) {
    const errorsUser = [];
    let errorsAuth = [];
    if(!payload.nik) errorsUser.push('NIK tidak boleh kosong.')
    if(!payload.fname) errorsUser.push('Nama tidak boleh kosong.')
    if(payload.avatarFile){
      const allowedSize = 2048 * 1024
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']
      if(!allowedMimes.includes(payload.avatarFile.type)) errorsUser.push('Ekstensi Gambar tidak sesuai (JPG, JPEG, PNG).')
      if(allowedSize < payload.avatarFile.size) errorsUser.push('Ukuran file melebihi batas (2MB).')
    }
    if(payload.dataLogin.isActive){
      const authValid = AuthorizationServices.validatorUserAuth(payload)
      if(!authValid.success) {
        errorsAuth = authValid.message
      }
    }
    const errors = [...errorsUser, ...errorsAuth]
    return { success: errors.length === 0, message: errors }
  };

  validatorUpdateUser(payload) {
    const errorsUser = [];
    let errorsAuth = [];
    if(!payload.nik) errorsUser.push('NIK tidak boleh kosong.')
    if(!payload.fname) errorsUser.push('Nama tidak boleh kosong.')
    if(payload.avatarFile){
      const allowedSize = 2048 * 1024
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']
      if(!allowedMimes.includes(payload.avatarFile.type)) errorsUser.push('Ekstensi Gambar tidak sesuai (JPG, JPEG, PNG).')
      if(allowedSize < payload.avatarFile.size) errorsUser.push('Ukuran file melebihi batas (2MB).')
    }
    if(payload.dataLogin.isActive){
      const authValid = AuthorizationServices.validatorUpdateUserAuth(payload)
      if(!authValid.success) {
        errorsAuth = authValid.message
      }
    }
    const errors = [...errorsUser, ...errorsAuth]
    return { success: errors.length === 0, message: errors }
  }
}

export default new UserServices()