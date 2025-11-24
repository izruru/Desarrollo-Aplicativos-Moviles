// src/components/Reloj.tsx
import React, { useEffect, useState } from "react"

export default function Reloj() {
  const [hora, setHora] = useState<string>(formatNow())

  useEffect(() => {
    const id = setInterval(() => {
      setHora(formatNow())
    }, 1000)

    // cleanup: cuando el componente se desmonta, limpiamos el interval
    return () => clearInterval(id)
  }, []) // [] -> se monta una vez

  return (
    <div className="reloj card" aria-live="polite">
      <div>Reloj</div>
      <div style={{ fontSize: 22 }}>{hora}</div>
    </div>
  )
}

function pad(n: number) { return n.toString().padStart(2, "0") }
function formatNow() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
