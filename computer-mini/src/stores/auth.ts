import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    phone: '',
    token: '',
    loggedIn: false,
  }),
  getters: {
    isLoggedIn: (s) => s.loggedIn && !!s.token,
  },
  actions: {
    loginWithCode(phone: string, code: string) {
      if (!phone || !code) throw new Error('缺少信息')
      this.phone = phone
      this.token = `tok_${Date.now()}`
      this.loggedIn = true
    },
    logout() {
      this.phone = ''
      this.token = ''
      this.loggedIn = false
    },
  },
})