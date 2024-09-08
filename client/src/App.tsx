import { useState } from "react"

export default function App() {
  /**
   * ! STATE (état, données) de l'application
   */
  const [count, setCount] = useState(0)


  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */
  function handleIncrementation() {
    setCount(count + 1)
  }


  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <>
      <h1>app</h1>
      <p>{count}</p>
      <button onClick={handleIncrementation}>Incrementation</button>
    </>
  )
}