// axios.js

import axios from 'axios'

// Création d'une instance d'axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL de base de l'API
  timeout: 5000 // Timeout de 5 secondes
})

// Ajout d'un intercepteur pour toutes les requêtes sortantes
instance.interceptors.request.use(
  (config) => {
    // Ajout du token d'authentification dans le header
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Gérer les erreurs de manière centralisée ici
    return Promise.reject(error)
  }
)
// Ajout d'un intercepteur pour toutes les réponses entrantes
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Gérer les erreurs de manière centralisée ici
    return Promise.reject(error)
  }
)

export default instance
