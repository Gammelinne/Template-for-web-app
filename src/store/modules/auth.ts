import { defineStore } from 'pinia'
import axios from '@/axios'
import router from '@/router'
import { toast } from 'vue3-toastify'
export interface AuthUser {
  token: string | null
  user: {
    avatar?: string
    email?: string
    username?: string
    firstName?: string
    lastName?: string
    emailVerifiedAt?: string
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
        this.clearError()
        this.loading = true
        localStorage.removeItem('token')

        const { data } = await axios.post('/login', { recpatchaToken, email, password })

        const { token, user: loggedInUser } = data
        this.handleAuthSuccess(token.token, loggedInUser)
        this.fetchUser()
        await router.push('/')
      } catch (error) {
        await this.handleAuthError(error)
        if (this.error.message === 'Email not verified') {
          await router.push('/verify-email/' + email)
        }
      } finally {
        this.loading = false
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
            this.user.email = response.data.email
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
            this.fetchUser()
            router.push('/')
          })
        this.loading = false
      } catch (error: any) {
        this.handleAuthError(error)
      }
    },

    async logout(): Promise<void> {
      try {
        this.clearError()
        this.loading = true
        await axios.post('/logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        this.handleAuthSuccess('', {})
      } finally {
        this.loading = false
        router.push('/login')
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
        router.push('/login')
        this.handleAuthError(error)
      }
    },

    async updateUser(avatar?: any, email?: string, password?: string): Promise<void> {
      try {
        this.error = null
        this.loading = true
        if (!this.isLoggedIn) return Promise.reject(new Error('User not logged in'))
        if (avatar) {
          const formData = new FormData()
          formData.append('avatar', avatar[0])
          await axios.put('/users/update', formData).then((response) => {
            this.user = { ...this.user, ...response.data.user }
          })
          toast('test', {
            type: 'success'
          })
        } else {
          await axios
            .put('/users/update', {
              email: email,
              password: password
            })
            .then((response) => {
              console.log(response.data)
              this.user = { ...this.user, ...response.data.user }
            })
        }
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

    async handleAuthError(error: any): Promise<void> {
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
