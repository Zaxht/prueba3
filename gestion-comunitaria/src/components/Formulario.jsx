import { useState, useEffect } from "react";

const Formulario = ({ onGuardar, registroActual, modoEdicion }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    participantes: "",
    tipo: "",
    descripcion: "",
    fecha: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (modoEdicion && registroActual) {
      setFormData(registroActual);
    }
  }, [registroActual, modoEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.tipo || !formData.fecha) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    setError("");
    onGuardar(formData);
    setFormData({
      nombre: "",
      participantes: "",
      tipo: "",
      descripcion: "",
      fecha: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{modoEdicion ? "Editar registro" : "Nuevo registro"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>Nombre: *</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label>Participantes:</label>
      <input
        type="number"
        name="participantes"
        value={formData.participantes}
        onChange={handleChange}
      />

      <label>Tipo: *</label>
      <select
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecciona una opción --</option>
        <option value="evento">Evento</option>
        <option value="taller">Taller</option>
        <option value="donación">Donación</option>
      </select>

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <label>Fecha: *</label>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {modoEdicion ? "Guardar cambios" : "Crear registro"}
      </button>
    </form>
  );
};

export default Formulario;
