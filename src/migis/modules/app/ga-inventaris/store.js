export default {
  namespaced: true,
  state: {
    merkList: [],
    locationList: [],
    gaInvData: [],
    typeProps: [
      {1: 'Stock', 2: 'On User', 3: 'Property', 4: 'Maintenance'},
      {1: 'tabler:box', 2: 'tabler:users', 3: 'tabler:tag', 4: 'tabler:settings-check'},
      {1: 'primary', 2: 'primary', 3: 'primary', 4: 'warning'},
      {1: 'GA', 2: 'IT', 3: 'HSE'}
    ],
  },
  actions: {
    async init(context, payload) {},
    async release(context, payload) {}
  },
  mutations: {
    SET_MERKLIST(state, value) { state. merkList = value },
    SET_LOCATIONLIST(state, value) { state.locationList = value },
    SET_GAINVLIST(state, value) { state.gaInvData = value },
  },
  getters: {
    gaInvPaginate: (state, getters) => (currentPage, itemPerPage, query) => {
      const filteredArray = state.gaInvData.filter(item =>
        item.kode_brg.toLowerCase().includes(query?.toLowerCase()) ||
        item.nama_brg.toLowerCase().includes(query?.toLowerCase()) ||
        item.invloc?.name.toLowerCase().includes(query?.toLowerCase())
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
    detailByCode: (state) => (code) => {
      return state.gaInvData.find(item => item.kode_brg === code)
    },
    gaInvMerk(state) {
      return state.merkList.sort(function (a,b){
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(nameA<nameB){return -1}
        if(nameA>nameB){return 1}
        return 0
      })
    },
    gaInvLocation(state) {
      return state.locationList.sort(function (a,b){
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(nameA<nameB){return -1}
        if(nameA>nameB){return 1}
        return 0
      })
    },
  },
  modules: {},
}
