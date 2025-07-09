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
    if (datosGuardados) {
      setRegistros(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
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

  return (
    <div>
      <h1>Gestión Comunitaria</h1>
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
