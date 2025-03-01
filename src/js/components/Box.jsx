import React, { useState,useEffect } from "react";
import "../../styles/index.css";

const Box = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputValue !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const deleteItem = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };
  const obtenerTareas= async ()=>{
    try {
        const response= await fetch("https://playground.4geeks.com/todo/users/juanmanuel")
        console.log(response.status)
        if(response.status==404){
            await crearUsuario()
            return
        }
        const data=await response.json()
        console.log(data.todos)
        setItems(data.todos)

    } catch (error) {
        console.log(error)
    }

  }
  const crearUsuario=async()=>{
    try {
        const response=await fetch("https://playground.4geeks.com/todo/users/juanmanuel")
    } catch (error) {
        console.log(error)
        
    }
  }
  useEffect(()=>{
    obtenerTareas()

  },[])


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
            if (e.key === "Enter") {
              addItem();
            }
          }}
        />

       
        {items.length === 0 ? (
          <p className="no-tasks">No hay tareas, añada una</p>
        ) : (
          <>
            <ul className="todo-list">
              {items.map((task, index) => (
                <li key={index} className="todo-item">
                  {task.label}
                  <span className="delete" onClick={() => deleteItem(index)}>
                    X
                  </span>
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
