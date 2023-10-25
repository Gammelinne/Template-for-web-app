import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/pinia-provider'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      name: 'reset-password',
      path: '/reset-password',
      component: () => import('@/views/ForgotPasswordView.vue'),
    }
    /* {
      name: 'About',
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
      meta: { requiresAuth: false }
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { requiresAuth: false }
    } */
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (authStore.isLoggedIn) {
      if (to.name === 'login') {
        next('/')
      }
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
