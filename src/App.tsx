import "./App.css";

function App() {
  return (
    <div className="card-container">
      <div className="card">
        <img
          src="/src/assets/lucas.png"
          alt="Foto Lucas Martínez"
          className="profile-img"
        />
        <h1>Lucas Martínez</h1>
        <h2>Estudiante de Desarrollo de Software</h2>
        <p>
          Me gusta aprender nuevas tecnologías, especialmente React y el
          desarrollo web. Este proyecto es una práctica de componentes en React
          usando TypeScript y Vite
        </p>
        <button onClick={() => alert("Hola Soy Lucas")}>Saludar</button>
      </div>
    </div>
  );
}

export default App;
