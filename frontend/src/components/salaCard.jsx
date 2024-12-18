import React, { useState } from 'react';

function SalaCard({ sala, onDelete, onEdit, salas }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        nombre: sala.nombre,
        capacidad: sala.capacidad,
        estado: sala.estado,
        ubicacion: sala.ubicacion,
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const validateForm = () => {
        if (
            !editedData.nombre.trim() ||
            !editedData.capacidad ||
            !editedData.estado.trim() ||
            !editedData.ubicacion.trim()
        ) {
            setError('Todos los campos son obligatorios y no pueden contener solo espacios en blanco.');
            return false;
        }

        const nombreDuplicado = salas.some(
            (otraSala) => otraSala.nombre.toLowerCase() === editedData.nombre.toLowerCase() && otraSala.id !== sala.id
        );
        if (nombreDuplicado) {
            setError('El nombre de la sala no puede ser igual al de otra sala ya guardada.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            onEdit(editedData);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({
            nombre: sala.nombre,
            capacidad: sala.capacidad,
            estado: sala.estado,
            ubicacion: sala.ubicacion,
        });
        setError(''); // Reinicia el mensaje de error
    };

    return (
        <div className="sala-card">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="nombre"
                        value={editedData.nombre}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="capacidad"
                        value={editedData.capacidad}
                        onChange={handleInputChange}
                    />
                    <select
                        name="estado"
                        value={editedData.estado}
                        onChange={handleInputChange}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Ocupado">Ocupado</option>
                    </select>
                    <input
                        type="text"
                        name="ubicacion"
                        value={editedData.ubicacion}
                        onChange={handleInputChange}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <h3>{sala.nombre}</h3>
                    <p>Capacidad: {sala.capacidad}</p>
                    <p>Estado: {sala.estado}</p>
                    <p>Ubicación: {sala.ubicacion}</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={onDelete}>Eliminar</button>
                </div>
            )}
        </div>
    );
}

export default SalaCard;


