import { z } from "zod";
import TodoCard from "./TodoCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { TodoCardType } from "@/typeScript/Todo";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, CopyMinus, Ellipsis } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { addTodo, getTodos, updateTodo, deleteTodo } from "@/services/todoService"; // Importer les services


// Définir le schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
});

export default function TodoList() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isAdding, setIsAdding] = useState(false);
    const addCardRef = useRef<HTMLDivElement>(null);
    const [todoCards, setTodoCards] = useState<TodoCardType[]>([]);
    const [pendingTasks, setPendingTasks] = useState<TodoCardType[]>([]); // Tâches en attente de synchronisation

    const form = useForm<TodoCardType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        // Récupérer les tâches
        const fetchTodos = async () => {
            try {
                const todos = await getTodos();
                setTodoCards(todos); // Mettre à jour les tâches
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches", error);
            }
        };

        fetchTodos();
    }, []);

    // Vérifier si l'utilisateur est de retour en ligne pour synchroniser les tâches
    useEffect(() => {
        window.addEventListener('online', syncPendingTasks);
        return () => {
            window.removeEventListener('online', syncPendingTasks);
        };
    }, [pendingTasks]);

    const syncPendingTasks = async () => {
        if (pendingTasks.length > 0) {
            console.log('Synchronisation des tâches en attente...');
            for (const task of pendingTasks) {
                try {
                    await addTodo(task);
                    console.log('Tâche synchronisée :', task.name);
                } catch (error) {
                    console.error('Erreur lors de la synchronisation de la tâche:', error);
                }
            }
            setPendingTasks([]); // Vider les tâches en attente après la synchronisation
        }
    };

    // Gérer la fermeture du formulaire en cas de clic extérieur
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fermer le formulaire d'ajout de carte
    const handleClickOutside = (event: MouseEvent) => {
        if (addCardRef.current && !addCardRef.current.contains(event.target as Node)) {
            setIsAdding(false); // Fermer le formulaire
        }
    };

    // Gérer la soumission du formulaire d'ajout de carte
    const handleSubmit = async (data: TodoCardType): Promise<void> => {
        const todo = {
            id: "",  // L'ID pourrait être généré par l'API lors de la synchronisation en ligne
            name: data.name,
            is_completed: false,
        };

        if (!navigator.onLine) {
            // Ajouter la tâche localement si l'utilisateur est hors ligne
            setPendingTasks([...pendingTasks, todo]);
            setTodoCards([...todoCards, todo]); // Mettre à jour l'UI immédiatement
            form.reset({ name: "" });
            setIsAdding(false);
            console.log('Vous êtes hors ligne. La tâche sera synchronisée plus tard.');
            return;
        }

        try {
            const response = await addTodo(todo);
            const newTodoCard = response.todoCard;
            setTodoCards([...todoCards, newTodoCard]);
            form.reset({ name: "" });
            setIsAdding(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche", error);
        }
    };



    // Gérer la mise à jour d'une tâche
    const handleUpdate = async (id: string, updatedTodo: TodoCardType) => {
        try {
            await updateTodo(id, updatedTodo);
            // Mettre à jour localement l'état de la tâche dans la liste
            const updatedTodoCards = todoCards.map((card) =>
                card.id === id ? updatedTodo : card
            );
            setTodoCards(updatedTodoCards);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche", error);
        }
    };

    // Gérer la suppression d'une tâche
    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            // Supprimer localement la tâche de la liste
            const updatedTodoCards = todoCards.filter((card) => card.id !== id);
            setTodoCards(updatedTodoCards);
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche", error);
        }
    };

    // Fermer le formulaire d'ajout de carte
    const handleCancel = () => {
        setIsAdding(false);
        form.reset({ name: "" }); // Réinitialiser le champ de saisie
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Card className="flex flex-col w-full max-w-md shadow-sm mt-8" ref={addCardRef}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">To-do list</CardTitle>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Ellipsis className="h-4 w-4" />
                </Button>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <CardContent className="flex-1 space-y-2 px-4 py-1 overflow-visible transition-all duration-200 ease-in-out">
                        {/* Afficher toutes les tâches */}
                        {todoCards.map((card, index) => (
                            <TodoCard
                                key={index}
                                card={card}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        ))}

                        {/* Formulaire d'ajout d'une nouvelle tâche */}
                        {isAdding && (
                            <div className="flex flex-col justify-between h-full">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder="Entrez un titre pour cette liste"
                                                    autoFocus
                                                    className="w-full h-10 shadow-sm rounded-sm"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-7 gap-2 mt-3">
                                    <Button
                                        type="submit"
                                        size={"sm"}
                                        className="col-span-6 w-full rounded-sm"
                                    >
                                        Ajouter
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size={"sm"}
                                        className="w-full p-2 rounded-sm"
                                        onClick={handleCancel}
                                    >
                                        <CopyMinus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </form>
            </Form>

            <CardFooter className="px-4 mt-2">
                {!isAdding && (
                    <Button
                        variant="outline"
                        size={"default"}
                        className="w-full justify-start items-center font-medium"
                        onClick={() => setIsAdding(true)}
                    >
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Ajouter une liste
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
