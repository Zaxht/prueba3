import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListaRegistros from "./components/ListaRegistros";
import './App.css'; 

function App() {
  const [registros, setRegistros] = useState([]);
  const [registroActual, setRegistroActual] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("registros");
      console.log("🔁 Leyendo localStorage:", datosGuardados);
    if (datosGuardados) {
      try {
        const parsed = JSON.parse(datosGuardados);
        if (Array.isArray(parsed)) {
          setRegistros(parsed);
        } else {
          console.warn("Se esperaba un array en localStorage, pero no lo es.");
        }
      } catch (e) {
        console.error("Error al parsear datos desde localStorage", e);
      }
    }
  }, []);

useEffect(() => {
  // Solo guarda si registros NO es vacío
  if (registros.length > 0) {
    localStorage.setItem("registros", JSON.stringify(registros));
  }
}, [registros]);

  const guardarRegistro = (nuevo) => {
    if (modoEdicion) {
      const nuevosRegistros = registros.map((r, i) =>
        i === registroActual.index ? nuevo : r
      );
      setRegistros(nuevosRegistros);
      setModoEdicion(false);
      setRegistroActual(null);
    } else {
      setRegistros([...registros, nuevo]);
    }
  };

  const editarRegistro = (index) => {
    setRegistroActual({ ...registros[index], index });
    setModoEdicion(true);
  };

  const eliminarRegistro = (index) => {
    const nuevos = registros.filter((_, i) => i !== index);
    setRegistros(nuevos);
  };
 console.log("📦 Estado registros al render:", registros);

  return (
    <div className="container">
      <h1>Gestión Organización Comunitaria</h1>
      <Formulario
        onGuardar={guardarRegistro}
        registroActual={registroActual}
        modoEdicion={modoEdicion}
      />
      <ListaRegistros
        registros={registros}
        onEditar={editarRegistro}
        onEliminar={eliminarRegistro}
      />
    </div>
  );
}

export default App;
