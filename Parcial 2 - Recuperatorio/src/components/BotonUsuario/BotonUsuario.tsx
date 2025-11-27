import "./BotonUsuario.css";

interface PropsBotonUsuario {
  usuario: {
    id: number;
    nombre: string;
  };
  seleccionar: (usuario: { 
                id: number; 
                nombre: string 
               }) => void;
}


export function BotonUsuario({ usuario, seleccionar }: PropsBotonUsuario) {

  return (
    <button

      className="boton-usuario"
      onClick={() => seleccionar(usuario)}

    >
      {usuario.nombre}
    </button>
  );
  
}
