import { openDB } from 'idb';
import { TodoCardType } from '@/typeScript/Todo';

// Ouvrir la base de données IndexedDB
export const initDB = async () => {
    return openDB('todoDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('todos')) {
                db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

// Ajouter un todo dans IndexedDB
export const addTodoToDB = async (todo: TodoCardType): Promise<void> => {
    const db = await initDB();
    await db.add('todos', todo);
};

// Récupérer tous les todos de IndexedDB
export const getTodosFromDB = async (): Promise<TodoCardType[]> => {
    const db = await initDB();
    return await db.getAll('todos');
};

// Supprimer tous les todos de IndexedDB
export const clearTodosFromDB = async (): Promise<void> => {
    const db = await initDB();
    await db.clear('todos');
};
