import React, { useState, useEffect } from "react"
import InputField from "./InputField"
import BotonSubmit from "./BotonSubmit"
import "../estilos/FormularioInscripcion.css"

export default function FormularioInscripcion() {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [mensajeExito, setMensajeExito] = useState(false)

  useEffect(() => {
    if (mensajeExito) {
      document.title = "Inscripción Exitosa (●'◡'●)"
    } else {
      document.title = "Sistema de Inscripción"
    }
  }, [mensajeExito])

  function handleSubmit(e: React.FormEvent) {
  // esto evita que la página se recargue
  e.preventDefault()

  if (!nombre || !apellido || !email || !telefono) {
    alert("Por favor, completa todos los campos")
    return
  }
  setMensajeExito(true)
}


  function handleReset() {
  setNombre("")
  setApellido("")
  setEmail("")
  setTelefono("")

  setMensajeExito(false)
}


  if (mensajeExito) {
    return (
      <div className="confirmacion">
        <h2>¡Inscripción exitosa!</h2>
        <p><strong>Nombre completo:</strong> {nombre} {apellido}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>

        <BotonSubmit texto="Nueva inscripción" onClick={handleReset} />
      </div>
    )
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <InputField
        label="Nombre"
        type="text"
        value={nombre}
        placeholder="Ingresa tu nombre"
        onChange={(e) => setNombre(e.target.value)}
      />

      <InputField
        label="Apellido"
        type="text"
        value={apellido}
        placeholder="Ingresa tu apellido"
        onChange={(e) => setApellido(e.target.value)}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        placeholder="ejemplo@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Teléfono"
        type="tel"
        value={telefono}
        placeholder="1234567890"
        onChange={(e) => setTelefono(e.target.value)}
      />

      <BotonSubmit texto="Enviar" onClick={handleSubmit} />
    </form>
  )
}
