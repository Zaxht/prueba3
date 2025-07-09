import { useState, useEffect } from "react";

const Formulario = ({ onGuardar, registroActual, modoEdicion }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    participantes: "",
    tipo: "",
    descripcion: "",
    fecha: ""
  });

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
      alert("Completa los campos requeridos.");
      return;
    }
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
    <form onSubmit={handleSubmit}>
      <h2>{modoEdicion ? "Editar registro" : "Nuevo registro"}</h2>

      <label>Nombre (texto):</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

      <label>Participantes (número):</label>
      <input type="number" name="participantes" value={formData.participantes} onChange={handleChange} />

      <label>Tipo (select):</label>
      <select name="tipo" value={formData.tipo} onChange={handleChange} required>
        <option value="">-- Selecciona una opción --</option>
        <option value="evento">Evento</option>
        <option value="taller">Taller</option>
        <option value="donación">Donación</option>
      </select>

      <label>Descripción (textarea):</label>
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />

      <label>Fecha (date):</label>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

      <button type="submit">{modoEdicion ? "Guardar cambios" : "Crear registro"}</button>
    </form>
  );
};

export default Formulario;