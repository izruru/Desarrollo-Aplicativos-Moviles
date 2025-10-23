import './EventCard.css'; 

export interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  category: 'music' | 'sports' | 'tech' | 'food';
}


export function EventCard({ title, date, location, attendees, category }: EventCardProps) {

    let categoriaTexto: string;
    let categoryEmoji: string = '❓';

    switch (category) {
        case 'music':
            categoriaTexto = 'Música';
            categoryEmoji = '🎵';
            break;
        case 'sports':
            categoriaTexto = 'Deportes';
            categoryEmoji = '⚽';
            break;
        case 'tech':
            categoriaTexto = 'Tecnología';
            categoryEmoji = '💻';
            break;
        case 'food':
            categoriaTexto = 'Comida';
            categoryEmoji = '🍔';
            break;
    }
    
    const combinedClassName = `event-card ${category}`;

    return (
        <div className="contenedor">
            <div className={combinedClassName}> 
                <h3>{categoryEmoji} {categoriaTexto}</h3>
                <h1>{title}</h1>
                <p>Fecha: {date}</p>
                <p> Lugar: {location}</p>
                <div className="attendees-info">
                    <span>👥</span> 
                    <p>Participantes: {attendees.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}