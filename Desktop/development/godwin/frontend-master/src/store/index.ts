import { createStore } from 'vuex'

export default createStore({
  state: {
    notifications: {
      desktop_notification: 'yes',
      email_notification: 'instantly',
      update_notification: 'no'
    },
    user: {}
  },
  getters: {
  },
  mutations: {
    setNotifications (state, notifications) {
      state.notifications =  {...state.notifications, ...notifications}
    },
    storeUser(state, user) {
      state.user = {...state.user, ...user}
    }
  },
  actions: {
  },
  modules: {
  }
})
