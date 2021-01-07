import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Set Up
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  // Svae to local
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

return (
  <div className="App">
    <header>
      <h1>Daphne's To Do List</h1>
    </header>
    <Form
      todos={todos}
      setTodos={setTodos}
      inputText={inputText}
      setInputText={setInputText}
      setStatus={setStatus}
    />
    <TodoList
      todos={todos}
      setTodos={setTodos}
      inputText={inputText}
      filteredTodos={filteredTodos}
    />
  </div>
);
}

export default App;
