import React, { useState, useEffect, useContext } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ThemeContext } from "./context/ThemeContext";
import "./App.css";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);

  return (
    <div className={`app ${theme}`}>
      <h1>Todo List App</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      {allCompleted && <p className="completed-msg">You’ve completed all tasks!</p>}
    </div>
  );
}
