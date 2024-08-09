import api from "./config/apiConfig"
import localforage from "localforage"
import { UserType } from "@/typeScript/Type"


// Inscrire un nouvel utilisateur
export const createUser = async (dataUser: UserType) => {
    if (navigator.onLine) {
        try {
            // Appel à l'API pour enregistrer un nouvel utilisateur
            const response = await api.post('/user', dataUser, { headers: { 'Content-Type': 'multipart/form-data' } })
            return response.data // Retourner les données de la réponse de l'API

        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error)
        }

    } else {
        await localforage.setItem('user-data', dataUser)
        console.log('Données sauvegardées localement')
    }
}

// Synchroniser les données locales avec l'API
export const syncData = async () => {
    const userData = await localforage.getItem('user-data')

    if (userData && navigator.onLine) {
        try {
            await api.post('/users', userData, { headers: { 'Content-Type': 'multipart/form-data' } })
            await localforage.removeItem('user-data')
            console.log('Données synchronisées avec le serveur')

        } catch (error) {
            console.error('Erreur lors de la synchronisation des données:', error)
        }
    }

}