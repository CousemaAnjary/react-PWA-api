import { useState } from "react"

export default function App() {
  /**
   * ! STATE (état, données) de l'application
   */
  const [count, setCount] = useState(0)

  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */
  const handleIncremente = () => {
    setCount(count + 1)
  }

  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <>
      <p>Compteur : {count}</p>
      <button onClick={handleIncremente}>Incrementer</button>
    </>
  )
}
