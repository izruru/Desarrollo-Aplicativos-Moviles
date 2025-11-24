import React, { useState } from "react"

type Props = { nombre: string }

export default function Producto({ nombre }: Props) {
  const [cant, setCant] = useState<number>(0)

  function inc() { setCant(prev => prev + 1) }
  function dec() { setCant(prev => (prev > 0 ? prev - 1 : 0)) }
  function reset() { setCant(0) }

  return (
    <article className="card">
      <h3>{nombre}</h3>
      <p>Cantidad: <span className="counter">{cant}</span></p>

      <div className="controls">
        <button className="btn" onClick={dec} aria-label={`disminuir ${nombre}`}>−</button>
        <button className="btn" onClick={inc} aria-label={`aumentar ${nombre}`}>+</button>
        <button className="btn" onClick={reset} aria-label={`resetear ${nombre}`}>reset</button>
      </div>
    </article>
  )
}
