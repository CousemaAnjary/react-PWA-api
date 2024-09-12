import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
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
            <nav className="container-fluid p-4 bg-white border-b">
                <div className="container flex justify-between items-center">
                    <div className="logo ml-10">
                        <h1 className="font-mono text-xl font-medium">Logo</h1>
                    </div>

                    <div className="navbar">
                        <ul className="flex gap-2 mr-10">
                            <li><Link to="#"><Button variant={"ghost"} className="font-semibold">Dashobard</Button></Link></li>
                            <li><Link to="#"><Button variant={"ghost"} className="font-semibold">To-do</Button></Link></li>
                            <li><Link to="#"><Button variant={"ghost"} className="font-semibold">Users</Button></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}