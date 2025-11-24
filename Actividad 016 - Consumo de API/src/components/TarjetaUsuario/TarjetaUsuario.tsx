import "./TarjetaUsuario.css"


interface Usuario {
    id: number,
    name: string,
    email: string
}


export function TarjetaUsuario({id, name, email}:Usuario) {

    return (
        <>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>ID: {id} </p>

        </>
    )

}