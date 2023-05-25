import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo, setFilter } from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App = ({ todos, filter, addTodo, toggleTodo, deleteTodo, editTodo, setFilter }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleToggle = (id) => {
    toggleTodo(id);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleEdit = (id, text) => {
    const newTodoText = prompt("Edit Todo", text);
    if (newTodoText !== null) {
      editTodo(id, newTodoText);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = filter === "all" ? todos : filter === "active" ? todos.filter((todo) => !todo.completed) : todos.filter((todo) => todo.completed);

  return (
    <div class="d-flex justify-content-center" className="Todo">
      <h1>What's the plan for today?</h1>
      <form className="input-todo" onSubmit={handleSubmit}>
        <input type="text" placeholder="What to do" value={newTodo} onChange={handleInputChange} />
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
      <div className="filter">
        <select onChange={handleFilter}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="output">
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <input className="checkbox" type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
              <span style={todo.completed ? { textDecoration: "line-through" } : {}}>{todo.text}</span>
              <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    // <div>
    //   <h1>Todo List</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" placeholder="New Todo" value={newTodo} onChange={handleInputChange} />
    //     <button type="submit">Add</button>
    //   </form>
    // <div>
    //   <h2>Todos</h2>
    //   <select onChange={handleFilter}>
    //     <option value="all">All</option>
    //     <option value="active">Active</option>
    //     <option value="completed">Completed</option>
    //   </select>
    //   <ul>
    //     {filteredTodos.map((todo) => (
    //       <li key={todo.id}>
    //         <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
    //         <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
    //         <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
    //         <button onClick={() => handleDelete(todo.id)}>Delete</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  filter: state.filter,
});

const mapDispatchToProps = {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
