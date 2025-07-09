const ListaRegistros = ({ registros, onEditar, onEliminar }) => {
  return (
    <div>
      <h2>Registros</h2>
      {registros.length === 0 ? (
        <p>No hay registros aún.</p>
      ) : (
        <ul>
          {registros.map((reg, idx) => (
            <li key={idx}>
              <strong>{reg.nombre}</strong> | {reg.tipo} | {reg.fecha}
              <br />
              Participantes: {reg.participantes} <br />
              {reg.descripcion && <em>{reg.descripcion}</em>} <br />
              <button onClick={() => onEditar(idx)}>Editar</button>
              <button onClick={() => onEliminar(idx)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaRegistros;
