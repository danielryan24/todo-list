import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo, filterActive, filterCompleted, filterAll } from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./styles.css";
const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const visibilityFilter = useSelector((state) => state.visibilityFilter);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      })
    );
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, newText) => {
    dispatch(
      editTodo({
        id: id,
        text: newText,
      })
    );
  };

  const handleFilterActive = () => {
    dispatch(filterActive());
  };

  const handleFilterCompleted = () => {
    dispatch(filterCompleted());
  };

  const handleFilterAll = () => {
    dispatch(filterAll());
  };

  const filteredTodos = () => {
    switch (visibilityFilter) {
      case "ACTIVE":
        return todos.filter((todo) => !todo.completed);
      case "COMPLETED":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div class="d-flex justify-content-center" className="Todo">
      <h2>What's the plan for today?</h2>
      <div className="input-todo">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Button variant="primary" onClick={handleAddTodo} className="add-btn">
          Add
        </Button>
      </div>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-secondary">
              All
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary">
              Active
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary">
              Completed
            </button>
          </div>
        </div>
      </div>
      <div>
        {filteredTodos().map((todo) => (
          <ul class="list-group">
            <li>
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
              <input type="text" value={todo.text} onChange={(e) => handleEditTodo(todo.id, e.target.value)} />
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          </ul>
        ))}
      </div>
    </div>
    // <div>
    //   <h2>What's the plan for today?</h2>
    //   <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
    //   <button onClick={handleAddTodo}>Add</button>
    //   <br />
    //   <button onClick={handleFilterAll}>All</button>
    //   <button onClick={handleFilterActive}>Active</button>
    //   <button onClick={handleFilterCompleted}>Completed</button>
    // <ul>
    //   {filteredTodos().map((todo) => (
    //     <li key={todo.id}>
    // <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
    // <input type="text" value={todo.text} onChange={(e) => handleEditTodo(todo.id, e.target.value)} />
    // <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    //     </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default TodoList;
