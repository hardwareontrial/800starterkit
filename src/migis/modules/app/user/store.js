export default {
  namespaced: true,
  state: {
    users: [],
  },
  actions: {},
  mutations: {
    SET_USERS(state, value) {
      state.users = value
    },
  },
  getters: {
    users(state) {
      return state.users
    },
    usersNoAdmin(state, getters) {
      const rawData = getters.users
      if(!rawData){ return [] }
      return rawData.filter(item => !(!!item.is_admin));
    },
    usersNoAdminNoExt(state, getters) {
      const rawData = getters.usersNoAdmin
      if(!rawData){ return [] }
      return rawData.filter(function (data) {
        return !data.fname.toLowerCase().includes('admin') &&
          !data.fname.toLowerCase().includes('sandojo') &&
          !data.fname.toLowerCase().includes('indra w') &&
          !data.fname.toLowerCase().includes('andri j')
      });
    },
    usersNoAdminNoExtActive(state, getters) {
      const rawData = getters.usersNoAdminNoExt
      if(!rawData){ return [] }
      return rawData.filter(item => !!item.is_active);
    },
    usersPaginate: (state, getters) => (currentPage, limit, query) => {
      const filteredArray = getters.usersNoAdminNoExt.filter(item =>
        item.fname.toLowerCase().includes(query?.toLowerCase()) ||
        item.nik.toString().includes(query) ||
        item.position?.name.toLowerCase().includes(query?.toLowerCase())
      )
      const countFilteredArray = filteredArray.length
      const totalPages = Math.ceil(countFilteredArray/limit)
      currentPage = Math.min(Math.max(1, currentPage), totalPages)
      const startIndex = (currentPage -1)*limit
      const endIndex = startIndex + limit
      const itemsForPage = filteredArray.slice(startIndex, endIndex)
      const from = ((currentPage -1)* limit) +1
      const to = Math.min((currentPage * limit), countFilteredArray)
      return {
        items: itemsForPage,
        total: countFilteredArray,
        currentPage: Math.max(currentPage, 1),
        per_page: limit,
        from: Math.max(from, 0),
        to: to,
      }
    },
    usersNoAuth(state, getters) {
      return getters.usersNoAdminNoExtActive.filter(item => !item.datalogin)
    },
    userDetailByUnique: (state, getters) => (unique) => {
      return state.users.find(item => item.user_unique_str === unique)
    }
  },
  modules: {},
}
