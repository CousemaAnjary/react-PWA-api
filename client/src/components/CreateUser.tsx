import { z } from "zod"
import { UserType } from "@/typeScript/Type"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { createUser } from "@/services/userService"


// Définir le schéma de validation avec Zod
const formSchema = z.object({
    last_name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    first_name: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    age: z.number().int().positive({ message: "L'âge doit être un nombre positif" }),
    image: z.instanceof(File).optional()
});

export default function CreateUser() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form: UseFormReturn<UserType> = useForm<UserType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            last_name: "",
            first_name: "",
            email: "",
            age: 1,
            image: undefined
        },
    });

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleSubmit = async (data: UserType) => {
        // Données à envoyer pour creer un nouvel utilisateur
        const dataUser = {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            age: data.age,
            image: data.image
        }

        try {
            await createUser(dataUser)

        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="p-8 max-w-lg w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>

                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="ABDILLAH" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prénom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Cousema Anjary" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="exemple@gmail.com" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Âge</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : undefined) }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Button type="submit">Soumettre</Button>
                            </div>

                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}
