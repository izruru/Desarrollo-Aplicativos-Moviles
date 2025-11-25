import "./TarjetaTalent.css";

interface Talent {
    name: string;
    img: string;
    group: string;
    debut: string;
}

export function TarjetaTalent({ name, img, group, debut }: Talent) {

    return (
        <div className="tarjeta-talent">
            <img src={img} alt={name} className="talent-img"/>

            <h2>{name}</h2>
            <p>Grupo: {group}</p>
            <p>Debut: {debut}</p>
        </div>
    );
}
