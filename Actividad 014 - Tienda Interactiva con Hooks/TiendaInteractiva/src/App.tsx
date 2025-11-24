import React from "react"
import Producto from "./components/Producto"
import Reloj from "./components/Reloj"
import "./index.css"

export default function App() {
  return (
    <div className="app">
      <h1>Productos — Actividad 14</h1>

      <section className="product-grid">
        <Producto nombre="Destornillador" />
        <Producto nombre="Martillo" />
        <Producto nombre="Cinta métrica" />
      </section>

      <Reloj />
    </div>
  )
}

