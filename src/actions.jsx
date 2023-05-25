export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  payload: id,
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: id,
});

export const editTodo = (todo) => ({
  type: "EDIT_TODO",
  payload: todo,
});

export const filterActive = () => ({
  type: "FILTER_ACTIVE",
});

export const filterCompleted = () => ({
  type: "FILTER_COMPLETED",
});

export const filterAll = () => ({
  type: "FILTER_ALL",
});
