import { z } from "zod"
import TodoCard from "./TodoCard"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { TodoCardType } from "@/typeScript/Todo"
import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus, CopyMinus, Ellipsis } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { addTodo, getTodos } from "@/services/todoService"



// Définir le schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
})

export default function TodoList() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isAdding, setIsAdding] = useState(false)
    const addCardRef = useRef<HTMLDivElement>(null)
    const [todoCards, setTodoCards] = useState<TodoCardType[]>([])

    const form = useForm<TodoCardType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        // Récupérer les tâches
        const fetchTodos = async () => {
            try {
                // Appeler l'API pour récupérer les tâches
                const todos = await getTodos()
                setTodoCards(todos) // Mettre à jour les tâches

            } catch (error) {
                // Gérer les erreurs
                console.error(error)
            }
        }

        fetchTodos() // Appeler la fonction pour récupérer les tâches
    }, [])


    // Écouter les clics de l'utilisateur
    useEffect(() => {
        // Écouter les clics de l'utilisateur
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            // Arrêter d'écouter les clics de l'utilisateur
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Fermer le formulaire d'ajout de carte
    const handleCancel = () => {
        setIsAdding(false) // Fermer le formulaire
        form.reset({ name: '' }) // Réinitialiser le champ de saisie    
    }

    // Fermer le formulaire d'ajout de carte
    const handleClickOutside = (event: MouseEvent) => {

        // Si l'utilisateur clique en dehors du formulaire
        if (addCardRef.current && !addCardRef.current.contains(event.target as Node)) {
            setIsAdding(false) // Fermer le formulaire
        }
    }

    // Soumettre le formulaire d'ajout de carte
    const handleSubmit = async (data: TodoCardType): Promise<void> => {

        // Données à envoyer au serveur
        const todo = {
            id: "",
            name: data.name,
            is_completed: false
        }

        try {
            // Appeler l'API pour ajouter une tâche
            const response = await addTodo(todo)
            const newTodoCards = response.todoCard
            setTodoCards([...todoCards, newTodoCards]) // Mettre à jour les tâches

            // Réinitialiser le formulaire
            form.reset({ name: '' })
            setIsAdding(false) // Fermer le formulaireF

        } catch (error) {
            // Gérer les erreurs
            console.error(error)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <Card className="flex flex-col w-full max-w-md shadow-sm mt-8" ref={addCardRef} >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold">To-do list</CardTitle>


                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Ellipsis className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardContent className="flex-1 space-y-2 px-4 py-1 overflow-visible transition-all duration-200 ease-in-out">

                            {todoCards.map((card, index) => (
                                <TodoCard key={index} card={card} />
                            ))}

                            {isAdding && (
                                <div className="flex flex-col justify-between h-full">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field}
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
                                        <Button type="submit" size={"sm"} className="col-span-6 w-full rounded-sm">
                                            Ajouter
                                        </Button>

                                        <Button type="button" variant="outline" size={"sm"} className="w-full p-2 rounded-sm" onClick={handleCancel}>
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
        </>
    )
}