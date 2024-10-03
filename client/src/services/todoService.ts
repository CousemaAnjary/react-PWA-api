import { TodoCardType } from '@/typeScript/Todo'
import api from './apiConfig'


// Récupérer la liste des tâches
export const getTodos = async () => {
    try {
        // Si l'utilisateur est en ligne, récupérer les tâches depuis l'API
        const response = await api.get('/todo-cards');
        return response.data.todoCards; // Retourner les données récupérées de l'API
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
        throw error;
    }
};

// Ajouter une tâche 
export const addTodo = async (dataTodo: TodoCardType) => {
    try {
        // Appeler l'API pour ajouter une tâche
        const response = await api.post('/todo-card', dataTodo)
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}

// Mettre à jour une tâche
export const updateTodo = async (id: string, dataTodo: TodoCardType) => {
    try {
        // Appeler l'API pour mettre à jour une tâche
        const response = await api.put(`/todo-card/${id}`, dataTodo);
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}

// Supprimer une tâche
export const deleteTodo = async (id: string) => {
    try {
        // Appeler l'API pour supprimer une tâche
        const response = await api.delete(`/todo-card/${id}`)
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}