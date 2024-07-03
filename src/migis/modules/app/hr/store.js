export default {
  namespaced: true,
  state: {
    positions: [],
    departments: [],
  },
  actions: {},
  mutations: {
    SET_POSITIONS(state, payload) {
      state.positions = payload
    },
    SET_DEPTS(state, payload) {
      state.departments = payload
    },
  },
  getters: {
    getDepartmentPaginate: (state, getters) => (currentPage, itemPerPage, query) => {
      const filteredArray = state.departments.filter(item =>
        item.name.toLowerCase().includes(query?.toLowerCase())
      );
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
    getActiveDepartment(state, getters) {
      return state.departments.filter(dept => dept.is_active === 1)
    },
    getPositionPaginate: (state, getters) => (currentPage, itemPerPage, query) => {
      const filteredArray = state.positions.filter(item =>
        item.name.toLowerCase().includes(query?.toLowerCase())
      );
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
    getActivePosition(state, getters) {
      return state.positions.filter(position => position.is_active === 1)
    },
  },
  modules: {},
}