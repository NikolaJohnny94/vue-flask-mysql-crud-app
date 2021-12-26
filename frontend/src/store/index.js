import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    usersSearch: [],
    message: '',
    createdAlert: false,
    updatedAlert: false,
    deletedAlert: false,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
      state.usersSearch = users
    },
    SHOW_OR_HIDE_CREATED_ALERT(state, createdAlert) {
      state.createdAlert = !createdAlert
    },
    SHOW_OR_HIDE_UPDATED_ALERT(state, updatedAlert) {
      state.updatedAlert = !updatedAlert
    },
    SHOW_OR_HIDE_DELETED_ALERT(state, deletedAlert) {
      state.deletedAlert = !deletedAlert
    },
    SET_MESSAGE(state, msg) {
      state.message = msg
    },
    SEARCH_SET_USERS(state, users) {
      state.users = users
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get('http://localhost:5000/users/')
      commit('SET_USERS', response.data)
    },
    showOrHideCreatedAlert({ commit }) {
      commit('SHOW_OR_HIDE_CREATED_ALERT', this.state.createdAlert)
    },
    showOrHideUpdatedAlert({ commit }) {
      commit('SHOW_OR_HIDE_UPDATED_ALERT', this.state.updatedAlert)
    },
    showOrHideDeletedAlert({ commit }) {
      commit('SHOW_OR_HIDE_DELETED_ALERT', this.state.deletedAlert)
    },
    setMessage({ commit }, msg) {
      commit('SET_MESSAGE', msg)
    },
    searchThroughUsers({ commit }, search) {
      commit(
        'SEARCH_SET_USERS',
        this.state.usersSearch.filter(
          (users) =>
            users.firstname.toLowerCase().match(search.toLowerCase()) ||
            users.lastname.toLowerCase().match(search.toLowerCase()) ||
            users.email.toLowerCase().match(search.toLowerCase()) ||
            users.country.toLowerCase().match(search.toLowerCase()) ||
            users.city.toLowerCase().match(search.toLowerCase())
        )
      )
    },
  },
  getters: {
    getUsers: (state) => state.users,
    getCreatedAlert: (state) => state.createdAlert,
    getUpdatedAlert: (state) => state.updatedAlert,
    getDeletedAlert: (state) => state.deletedAlert,
    getMessage: (state) => state.message,
  },
})
