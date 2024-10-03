import { CirclePlus, Ellipsis, Eraser } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Définir le schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
})

type KanbanCardType = {
    name: string
}


export default function TodoList() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isAdding, setIsAdding] = useState(false)

    const form = useForm<KanbanCardType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleSubmit = async (): Promise<void> => {


    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <Card className="flex flex-col w-full max-w-72 shadow-sm" >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold">To-do list</CardTitle>


                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Ellipsis className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardContent className="flex-1 space-y-2 px-4 py-1 overflow-visible transition-all duration-200 ease-in-out"      >
                            {/* 
                            {loading ? (
                                Array(cards.length || 1).fill(null).map((_, index) => (
                                    <SkeletonCard key={index} />
                                ))
                            ) : (
                                cards.map((card, index) => (
                                    <KanbanCard key={card.id} card={card} index={index} onDelete={handleDeleteCard} />
                                ))
                            )} */}

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
                                                        className="w-full h-12 shadow-sm"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-6 gap-2 mt-3">
                                        <Button type="submit" size={"sm"} className="col-span-5 w-full rounded-sm">
                                            Ajouter
                                        </Button>

                                        <Button type="button" variant="outline" size={"sm"} className="w-full p-2 rounded-sm">
                                            <Eraser className="h-4 w-4" />
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
                            size={"sm"}
                            className="w-full justify-start items-center font-medium"

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