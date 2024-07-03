export default {
  namespaced: true,
  state: {
    permissions: [],
    roles:[],
  },
  actions: {},
  mutations: {
    SET_PERMISSIONS(state, value) { state.permissions = value },
    SET_ROLES(state, value) { state.roles = value },
  },
  getters: {
    countPermission(state) {
      return state.permissions.length
    },
    countRole(state) {
      return state.roles.length
    },
    permissionPaginate: (state) => (currentPage, itemPerPage, query) => {
      const filteredArray = state.permissions.filter(item =>
        item.text.toLowerCase().includes(query?.toLowerCase()) ||
        item.description.toLowerCase().includes(query?.toLowerCase()) ||
        item.group_name.toLowerCase().includes(query?.toLowerCase())
      )
      const countFilteredArray = filteredArray.length
      const totalPages = Math.ceil(countFilteredArray/itemPerPage)
      currentPage = Math.min(Math.max(1, currentPage), totalPages)
      const startIndex = (currentPage -1)*itemPerPage
      const endIndex = startIndex + itemPerPage
      const itemsForPage = filteredArray.slice(startIndex, endIndex)
      const from = ((currentPage -1)* itemPerPage) +1
      const to = Math.min((currentPage * itemPerPage), countFilteredArray)
      return {
        items: itemsForPage,
        total: countFilteredArray,
        currentPage: Math.max(currentPage, 1),
        totalPages: totalPages,
        per_page: itemPerPage,
        from: Math.max(from, 0),
        to: to,
      }
    },
    rolePaginate: (state) => (currentPage, itemPerPage, query) => {
      const filteredArray = state.roles.filter(item =>
        item.name.toLowerCase().includes(query?.toLowerCase())
      )
      const countFilteredArray = filteredArray.length
      const totalPages = Math.ceil(countFilteredArray/itemPerPage)
      currentPage = Math.min(Math.max(1, currentPage), totalPages)
      const startIndex = (currentPage -1)*itemPerPage
      const endIndex = startIndex + itemPerPage
      const itemsForPage = filteredArray.slice(startIndex, endIndex)
      const from = ((currentPage -1)* itemPerPage) +1
      const to = Math.min((currentPage * itemPerPage), countFilteredArray)
      return {
        items: itemsForPage,
        total: countFilteredArray,
        currentPage: Math.max(currentPage, 1),
        totalPages: totalPages,
        per_page: itemPerPage,
        from: Math.max(from, 0),
        to: to,
      }
    },
    permissionByUnique: (state) => (unique) => {
      return state.permissions.find(item => item.permission_unique_str === unique)
    },
    roleByUnique: (state) => (unique) => {
      return state.roles.find(item => item.role_unique_str === unique)
    },
    usersListForRole: (state, getters, rootState) => (unique_role, currentPage, itemPerPage, query) => {
      const filteredUsers = rootState.migis.user.users
      const usersListNoExt = filteredUsers.filter(function (data) {
        return !data.fname.toLowerCase().includes('sandojo') &&
        !data.fname.toLowerCase().includes('indra w') &&
        !data.fname.toLowerCase().includes('andri j')
      });
      let fiteredUserByRole;
      fiteredUserByRole = usersListNoExt
      if(unique_role) {
        fiteredUserByRole = usersListNoExt.filter(
          user => user.userRoles.some(role => role.role_unique_str === unique_role)
        )
      }
      const filteredUser = fiteredUserByRole.filter(function (user) {
        return user.fname.toLowerCase().includes(query) ||
        user.position?.name.toLowerCase().includes(query)
      })
      const countFilteredArray = filteredUser.length
      const totalPages = Math.ceil(countFilteredArray/itemPerPage)
      currentPage = Math.min(Math.max(1, currentPage), totalPages)
      const startIndex = (currentPage -1)*itemPerPage
      const endIndex = startIndex + itemPerPage
      const itemsForPage = filteredUser.slice(startIndex, endIndex)
      const from = ((currentPage -1)* itemPerPage) +1
      const to = Math.min((currentPage * itemPerPage), countFilteredArray)
      return {
        items: itemsForPage,
        total: countFilteredArray,
        currentPage: Math.max(currentPage, 1),
        totalPages: totalPages,
        per_page: itemPerPage,
        from: Math.max(from, 0),
        to: to,
      }
    },
  },
  modules: {},
  }