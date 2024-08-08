import api from "./config/apiConfig"
import { UserType } from "@/typeScript/Type"


// Inscrire un nouvel utilisateur
export const createUser = async (dataUser: UserType) => {
    try {
        // Appel à l'API pour enregistrer un nouvel utilisateur
        const response = await api.post('/register', dataUser, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
    }
}