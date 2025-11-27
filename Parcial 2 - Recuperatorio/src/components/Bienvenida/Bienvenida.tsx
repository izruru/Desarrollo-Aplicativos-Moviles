import "./Bienvenida.css";

interface Bienvenida {
  usuario: {
    id: number;
    nombre: string;
  };
}


export function Bienvenida({ usuario }: Bienvenida) {
  return (
    <div className="tarjeta-bienvenida">
      <h2>¡Bienvenido/a, {usuario.nombre}!</h2>
      <p>Gracias por ingresar a la plataforma.</p>
    </div>
  );
}
