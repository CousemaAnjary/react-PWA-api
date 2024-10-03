import Navbar from "@/components/Navbar";
import TodoList from "@/components/todo/TodoList";

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative min-h-screen">
                {/* En-tête */}
                <header>
                    <Navbar />
                </header>

                {/* Contenu */}
                <main>
                    <section className="flex justify-center items-start min-h-[79vh] mt-5 ">
                        <TodoList />
                    </section>
                </main>

                {/* Pied de page */}
                <footer></footer>
            </div >
        </>
    )
}