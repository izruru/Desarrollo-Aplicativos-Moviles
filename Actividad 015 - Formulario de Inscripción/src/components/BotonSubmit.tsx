import React from "react"
import "../estilos/BotonSubmit.css"

interface BotonSubmitProps {
  texto: string
  onClick: (e: React.FormEvent) => void
}

export default function BotonSubmit({ texto, onClick }: BotonSubmitProps) {
  return (
    <button className="boton-submit" onClick={onClick}>
      {texto}
    </button>
  )
}

