export default {
  namespaced: true,
  state: {
    reservationRooms: [],
    roomResources: [],
  },
  actions: {
    init() {},
    release(context, payload) {
      context.commit('SET_RESERVATIONROOMS', [])
      context.commit('SET_ROOMRESOURCES', [])
    },
  },
  mutations: {
    SET_RESERVATIONROOMS(state, payload) {
      state.reservationRooms = payload
    },
    SET_ROOMRESOURCES(state, payload) {
      state.roomResources = payload
    },
  },
  getters: {
    getRoomResourceActiveOnly(state) {
      if(state.roomResources.length <= 0) { return [] }
      return state.roomResources.filter(room => room.is_active === 1)
    },
    getReservationRoomReservedOnly(state) {
      if(state.reservationRooms.length <= 0) { return [] }
      return state.reservationRooms.filter(event => event.status === 'reserved')
    },
    getReservationByDateByRoomId: (state, getters) => (inputDate, inputRoomId) => {
      const filtered = state.reservationRooms.filter(event => {
        const eventStartTime = event.start_time.split(' ')[0]
        const sameStartTime = eventStartTime === inputDate
        const roomIdMatch = inputRoomId ? event.room_id === inputRoomId : true
        return sameStartTime && roomIdMatch
      })
      return filtered
    },
    getReservationRoomPaginate: (state) => (limit, currentPage, query) => {
      const filteredArray = state.reservationRooms.filter(item =>
        item.title.toLowerCase().includes(query?.toLowerCase()) ||
        item.creatorData.fname.toLowerCase().includes(query?.toLowerCase()) ||
        item.start_time === query || item.end_time === query || item.room.name.toLowerCase().includes(query?.toLowerCase())
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
        totalPages: totalPages,
        per_page: limit,
        from: Math.max(from, 0),
        to: to,
      }
    },
  },
  modules: {},
}