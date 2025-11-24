import "./ListaUsuarios.css";

import {Error} from "../error/error"
import {Loading} from "../loading/loading"
import { TarjetaUsuario } from "../TarjetaUsuario/TarjetaUsuario";

import { useState } from "react";


interface Usuario {
    id: number,
    name: string,
    email: string
}

export function ListaUsuarios() {

    const [loading,setLoading] = useState(true);
    const [usuarios,setUsuarios] = useState<Usuario[]>([]);

    async function llamarUsuarios(){
        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!respuesta.ok){
                return(
                    <Error mensaje="Error en la carga de usuarios" />
                );
            }
            const datos = await respuesta.json();
            setUsuarios(datos); 

        } catch(err) {
            console.error(err);
            return (
                <Error mensaje="No se pudieron cargar los usuarios"/>
            )
        } finally {
            setLoading(false);
        }
    }

    llamarUsuarios();

    if (loading) {
        return (
            <Loading/>
        )
    }
    
    return (
        <>
            <h1>Lista de Usuarios</h1>

            {usuarios.map(u =>(
                <TarjetaUsuario 
                    id={u.id}
                    name={u.name}
                    email={u.email}
                />
            ))}

            
        </>
    )

}