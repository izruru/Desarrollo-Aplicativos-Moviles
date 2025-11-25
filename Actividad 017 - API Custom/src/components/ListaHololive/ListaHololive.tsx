import "./ListaHololive.css";

import { useState, useEffect } from "react";
import { TarjetaTalent } from "../TarjetaTalent/TarjetaTalent";
import { Loading } from "../loading/loading";
import { Error } from "../error/error";

interface Talent {
    name: string;
    img: string;
    group: string;
    debut: string;
}

export function ListaHololive() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [talents, setTalents] = useState<Talent[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const talentsPorPagina = 6;

    async function cargarTalentos() {
        try {
            setLoading(true);
            setError(null);

            const respuesta = await fetch("https://corsproxy.io/?https://raw.githubusercontent.com/HoloRes/hologra-api/master/v1/talents.json");

            if (!respuesta.ok) {
                setError("Error al cargar talentos");
                return;
            }

            const datos = await respuesta.json();
            setTalents(datos);

        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los talentos");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarTalentos();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error mensaje={error} />;

    // 🔎 FILTRO
    const filtrados = talents.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 📃 PAGINACIÓN
    const indexUltimo = paginaActual * talentsPorPagina;
    const indexPrimero = indexUltimo - talentsPorPagina;
    const paginados = filtrados.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(filtrados.length / talentsPorPagina);

    return (
        <div className="ListaHololive-container">

            <button onClick={cargarTalentos}>Recargar</button>

            <h1>Hololive Talents</h1>

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

            <div className="talents-grid">
                {paginados.map(t => (
                    <TarjetaTalent
                        key={t.name}
                        name={t.name}
                        img={t.img}
                        group={t.group}
                        debut={t.debut}
                    />
                ))}
            </div>

        </div>
    );
}
