import "./TarjetaUsuario.css";

interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: { name: string };
    address: { street: string; city: string };
}

export function TarjetaUsuario({ id, name, email, phone, company, address }: Usuario) {

    return (
        <div className="tarjeta-usuario">
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Teléfono: {phone}</p>
            <p>Compañía: {company.name}</p>
            <p>Dirección: {address.street}, {address.city}</p>
            <p>ID: {id}</p>
        </div>
    );
}
