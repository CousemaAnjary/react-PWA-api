import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Card, CardContent } from "../ui/card"
import { TodoCardProps } from "@/typeScript/Todo"


export default function TodoCard({ card, onDelete, onUpdate }: TodoCardProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isChecked, setIsChecked] = useState(card.is_completed);

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // Gérer le changement de la checkbox
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        // Mettre à jour la tâche pour refléter l'état de complétion
        onUpdate(card.id, { ...card, is_completed: !isChecked });
    }

    // Gérer la suppression de la tâche
    const handleDelete = async (): Promise<void> => {
        onDelete(card.id);
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative group">
                <Card className="w-full border shadow-sm group-hover:border-slate-700 transition-all duration-300 rounded-sm">
                    <CardContent className="p-1 pl-2 flex justify-between items-center">
                        <div className="flex items-center">
                            <Checkbox
                                id="todo-checkbox"
                                checked={isChecked}
                                onCheckedChange={handleCheckboxChange}
                                className="mr-2"

                            />
                            <p
                                className={`text-sm break-words overflow-hidden text-ellipsis ${isChecked ? 'line-through' : ''
                                    }`}
                            >
                                {card.name}
                            </p>
                        </div>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            onClick={handleDelete}
                            className="ml-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}