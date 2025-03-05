import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Box = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const user = "juanParedes";
  const baseUrl = `https://playground.4geeks.com/todo`;

  // Obtener tareas del usuario
  const obtenerTareas = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${user}`);

      if (response.status === 404) {
        console.log(" Usuario no encontrado, creando usuario...");
        await crearUsuario();
        return;
      }

      const data = await response.json();
      console.log("📥 Tareas obtenidas:", data.todos);
      setItems(data.todos || []);
    } catch (error) {
      console.error(" Error al obtener tareas:", error);
    }
  };

  // Crear usuario en la API
  const crearUsuario = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        console.log(" Usuario creado exitosamente");
        obtenerTareas();
      } else {
        console.error("Error al crear usuario");
      }
    } catch (error) {
      console.error(" Error en la creación de usuario:", error);
    }
  };

  // Agregar tarea usando el método POST
  const agregarTarea = async () => {
    if (inputValue.trim() === "") return;

    const nuevaTarea = { label: inputValue, is_done: false };

    try {
      const response = await fetch(`${baseUrl}/todos/${user}`, {
        method: "POST",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("✅ Tarea agregada correctamente");
        obtenerTareas(); // Recargar tareas desde el servidor
        setInputValue("");
      } else {
        console.error("❌ Error al agregar tarea:", response.status);
      }
    } catch (error) {
      console.error("❌ Error al agregar tarea:", error);
    }
  };

  // Eliminar tarea usando DELETE
  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("🗑️ Tarea eliminada");
        obtenerTareas();
      } else {
        console.error("❌ Error al eliminar tarea:", response.status);
      }
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className="Target">
      <h1 className="Font">todos</h1>
      <div className="Inputs">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") agregarTarea();
          }}
        />

        {items.length === 0 ? (
          <p className="no-tasks">No hay tareas, añada una</p>
        ) : (
          <>
            <ul className="todo-list">
              {items.map((task) => (
                <li key={task.id} className="todo-item">
                  {task.label}
                  <span className="delete" onClick={() => eliminarTarea(task.id)}>X</span>
                </li>
              ))}
            </ul>
            <p className="task-counter">{items.length} items left</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Box;
