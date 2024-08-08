
import { Route, Routes } from "react-router-dom"
import User from "./pages/User"



export default function App() {
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
      <Routes>
        <Route path="/" element={<User />} />

      </Routes>
    </>
  )
}