import api from './apiConfig'


// Récupérer la liste des tâches
export const getTodos = async () => {
    try {
        // Appeler l'API pour récupérer les tâches
        const response = await api.get('/todos')
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}

// Ajouter une tâche 
export const addTodo = async (todo) => {
    try {
        // Appeler l'API pour ajouter une tâche
        const response = await api.post('/todos', todo)
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}

// Mettre à jour une tâche
export const updateTodo = async (id, todo) => {
    try {
        // Appeler l'API pour mettre à jour une tâche
        const response = await api.put(`/todos/${id}`, todo)
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}

// Supprimer une tâche
export const deleteTodo = async (id) => {
    try {
        // Appeler l'API pour supprimer une tâche
        const response = await api.delete(`/todos/${id}`)
        return response.data // Retourner les données de la réponse

    } catch (error) {
        // Gérer les erreurs
        console.error(error)
    }
}