import { useState } from "react";

import { BotonUsuario } from "./components/BotonUsuario/BotonUsuario";
import { Bienvenida } from "./components/Bienvenida/Bienvenida";

import "./App.css";

interface IUsuario {
  id: number;
  nombre: string;
}

export default function App() {
  
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<IUsuario | null>(null);

  const usuarios: IUsuario[] = [
    { id: 1, nombre: "Usuario 1" },
    { id: 2, nombre: "Usuario 2" },
    { id: 3, nombre: "Usuario 3" },
  ];

  function seleccionarUsuario(usuario: IUsuario) {
    setUsuarioSeleccionado(usuario);
  }

  return (
    <div className="app-container">
      <h1>Plataforma de Bienvenida</h1>

      <div className="buttons-row">
        {usuarios.map((u) => (
          <BotonUsuario key={u.id} usuario={u} seleccionar={seleccionarUsuario} />
        ))}
      </div>

      {usuarioSeleccionado && <Bienvenida usuario={usuarioSeleccionado} />}
    </div>
  );
}
