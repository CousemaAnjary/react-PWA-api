import axios from 'axios'

// Récupération de l'URL de l'API depuis les variables d'environnement 
// const API_URL = import.meta.env.VITE_BACKEND_API_URL === 'localhost' ? import.meta.env.VITE_BACKEND_API_URL : 'http://192.168.88.14:8000/api'
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Configuration de l'instance axios
const api = axios.create({
    baseURL: API_URL,
    // withCredentials: true // Pour envoyer les cookies avec les requêtes
})

// Ajouter un intercepteur 
api.interceptors.request.use((config) => {

    // // Récupérer le token JWT de localStorage
    // const token = localStorage.getItem('token')

    // Ajouter le token JWT dans les headers de la requête
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`
    // }

    // Ajouter les headers par défaut
    config.headers = config.headers || {}

    // Ajouter le Content-Type pour les requêtes POST avec des données JSON
    config.headers['Content-Type'] = `application/json`;

    return config

})

export default api