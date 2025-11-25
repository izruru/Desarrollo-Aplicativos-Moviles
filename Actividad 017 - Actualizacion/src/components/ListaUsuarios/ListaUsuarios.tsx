import "./ListaUsuarios.css";

import { Error } from "../error/error";
import { Loading } from "../loading/loading";
import { TarjetaUsuario } from "../TarjetaUsuario/TarjetaUsuario";

import { useState, useEffect } from "react";

interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: { name: string };
    address: { street: string; city: string };
}

export function ListaUsuarios() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 5;

    async function llamarUsuarios() {
        try {
            setLoading(true);
            setError(null);

            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!respuesta.ok) {
                setError("Error en la carga de usuarios");
                return;
            }

            const datos = await respuesta.json();
            setUsuarios(datos);

        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los usuarios");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        llamarUsuarios();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error mensaje={error} />;

    //filtrado (Recordar)
    const usuariosFiltrados = usuarios.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //paginacion (Recordar)
    const indexUltimo = paginaActual * usuariosPorPagina;
    const indexPrimero = indexUltimo - usuariosPorPagina;

    const usuariosPaginados = usuariosFiltrados.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

    return (
        <div className="ListaUsuarios-container">
            
            <button onClick={llamarUsuarios}>Recargar</button>

            <h1>Lista de Usuarios</h1>

            <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => {
                    setPaginaActual(1);
                    setSearchTerm(e.target.value);
                }}
            />

            <div className="paginacion-container">
                <button 
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>

                <span>Página {paginaActual} de {totalPaginas}</span>

                <button 
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </button>
            </div>

            {usuariosPaginados.map(u => (
                <TarjetaUsuario
                    key={u.id}
                    id={u.id}
                    name={u.name}
                    email={u.email}
                    phone={u.phone}
                    company={u.company}
                    address={u.address}
                />
            ))}

        </div>
    );

}
