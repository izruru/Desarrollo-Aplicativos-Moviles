import './App.css'; 
import { EventCard } from './EventCard'; 

function App() {
  return (
    <div className="App"> 
      <h1>Eventos Disponibles:</h1>
      
      <div className="tarjetas-contenedor">
        <EventCard
          title="Buenos Aires Rock Fest"
          date="2025-04-12"
          location="Parque Roca"
          attendees={60000}
          category="music"
        />
        <EventCard
          title="Maratón Internacional de Buenos Aires"
          date="2025-10-05"
          location="Av. Figueroa Alcorta"
          attendees={30000}
          category="sports"
        />
        <EventCard
          title="Expo Innovación Tecnológica 2025"
          date="2025-07-20"
          location="La Rural"
          attendees={2500}
          category="tech"
        />
        <EventCard
          title="Feria del Chocolate y Dulces Artesanales"
          date="2025-11-08"
          location="Plaza San Martín"
          attendees={4500}
          category="food"
        />       
      </div>
    </div>
  );
}

export default App;