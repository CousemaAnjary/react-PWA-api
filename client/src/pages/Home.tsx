import { z } from "zod";
import { UserType } from "@/typeScript/Type";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "@/components/ui/input";

// Définir le schéma de validation avec Zod
const formSchema = z.object({
    last_name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    first_name: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    age: z.number().int().positive({ message: "L'âge doit être un nombre positif" }),
    image: z.instanceof(File).optional()
});

export default function Home() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form: UseFormReturn<UserType> = useForm<UserType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            last_name: "",
            first_name: "",
            email: "",
            age: 0,
            image: undefined
        },
    });

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const onSubmit = (data: UserType) => {
        console.log(data);
        // Envoyer les données au serveur ou les stocker localement
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <input {...field} type="email" className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Âge</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        className="input"
                                        onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : undefined) }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Soumettre</Button>
                </form>
            </Form>
        </>
    );
}
