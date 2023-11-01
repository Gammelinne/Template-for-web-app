import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/axios'
import router from '@/router'

export interface AuthUser {
  token: string | null
  user: {
    id?: string
    avatar?: string
    email?: string
    username?: string
    firstName?: string
    lastName?: string
  }
  loading: boolean
  error: any
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthUser => ({
    token: localStorage.getItem('token'),
    user: {},
    loading: false,
    error: null
  }),
  getters: {
    isLoggedIn: (state: AuthUser): boolean => !!state.token,
    authStatus: (state: AuthUser): boolean => state.loading,
    loggedInUser: (state: AuthUser): { id?: string; avatar?: string; email?: string } => state.user,
    errorStatus: (state: AuthUser): { message: string; errors?: Record<string, string[]> } | null =>
      state.error
  },
  actions: {
    async login({
      email,
      password,
      recpatchaToken
    }: {
      email: string
      password: string
      recpatchaToken: string
    }): Promise<void> {
      try {
        this.error = null
        this.loading = true
        localStorage.removeItem('token')
        const response: AxiosResponse<{
          token: { token: string; type: string }
          user: { id?: string; avatar?: string; email?: string }
        }> = await axios.post('/login', {
          recpatchaToken,
          email,
          password
        })
        const { token, user: loggedInUser } = response.data
        this.handleAuthSuccess(token.token, loggedInUser)
        this.fetchUser()
        router.push('/')
      } catch (error) {
        this.handleAuthError(error)
      }
    },

    async register(
      newUser: { email: string; password: string },
      recpatchaToken: string
    ): Promise<boolean> {
      try {
        localStorage.removeItem('token')
        this.error = null
        this.loading = true
        await axios
          .post('/register', {
            newUser,
            recpatchaToken
          })
          .then((response) => {
            this.user.id = response.data.userId
          })
        this.loading = false
        return true
      } catch (error: any) {
        this.handleAuthError(error)
        return false
      }
    },

    async googleRegister(googleData: {
      clientId: string
      client_id: string
      credential: string
      selected_by: string
    }) {
      try {
        localStorage.removeItem('token')
        this.error = null
        this.loading = true
        await axios
          .post('/google/redirect', {
            googleData
          })
          .then((response) => {
            const { token, user: loggedInUser } = response.data
            this.handleAuthSuccess(token.token, loggedInUser)
            router.push('/')
          })
        this.loading = false
      } catch (error: any) {
        this.handleAuthError(error)
      }
    },

    async logout(): Promise<void> {
      try {
        this.error = null
        this.loading = true
        await axios.post('/logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        this.handleAuthSuccess('', {})
      } catch (error) {
        this.handleAuthError(error)
      }
    },

    async fetchUser(): Promise<void> {
      try {
        this.error = null
        this.loading = true
        if (!this.isLoggedIn) return Promise.reject(new Error('User not logged in'))
        const response = await axios.get('/users/me')
        this.user = response.data
        this.loading = false
      } catch (error) {
        //router.push('/login')
        this.handleAuthError(error)
      }
    },

    async updateUser(updatedInfo: { email?: string; password?: string }): Promise<void> {
      try {
        this.error = null
        this.loading = true
        if (!this.isLoggedIn) return Promise.reject(new Error('User not logged in'))
        const response: AxiosResponse<{ user: { id?: string; avatar?: string; email?: string } }> =
          await axios.put('/user', updatedInfo)
        const updatedUser = response.data.user
        this.user = { ...this.user, ...updatedUser }
        this.loading = false
      } catch (error) {
        this.handleAuthError(error)
      }
    },

    async sendResetPasswordEmail(email: string): Promise<void> {
      try {
        this.error = null
        this.loading = true
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        await axios.post('/reset-password-email', {
          email
        })
      } catch (error) {
        this.handleAuthError(error)
      } finally {
        this.loading = false
      }
    },
    async resetPassword(
      password: String,
      password_confirmation: String,
      token: any
    ): Promise<void> {
      try {
        localStorage.removeItem('token')
        this.error = null
        this.loading = true
        await axios.post('/reset-password', {
          password,
          password_confirmation,
          token
        })
        this.loading = false
      } catch (error) {
        this.handleAuthError(error)
      }
    },
    async deleteUser(): Promise<void> {
      try {
        this.error = null
        this.loading = true
        if (!this.isLoggedIn) return Promise.reject(new Error('User not logged in'))
        await axios.delete('/user')
        this.handleAuthSuccess('', {} as { id?: string; avatar?: string; email?: string })
      } catch (error) {
        this.handleAuthError(error)
      } finally {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        router.push('/login')
      }
    },

    resendEmailConfirmation(email: string): Promise<void> {
      return axios.post('resend-verification-email', { email })
    },

    handleAuthSuccess(
      token: string | null,
      user: { id?: string; avatar?: string; email?: string }
    ): void {
      if (token) {
        this.token = token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
      }
      this.user = user
      this.loading = false
      this.error = null
    },

    handleAuthError(error: any): void {
      this.error = error.response.data
      localStorage.removeItem('token')
      this.loading = false
    },

    getFieldError(fieldName: string): string[] {
      const errors = this.error || {}
      if (fieldName in errors) {
        const fieldErrors = errors[fieldName] || null
        return fieldErrors || []
      }
      return []
    },
    clearError(): void {
      this.error = null
    },

    getToken(): string | null {
      return localStorage.getItem('token') || null
    }
  }
})
