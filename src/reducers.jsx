import { combineReducers } from "redux";

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_TODO":
      return state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo));
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo));
    default:
      return state;
  }
};

const visibilityFilter = (state = "ALL", action) => {
  switch (action.type) {
    case "FILTER_ACTIVE":
      return "ACTIVE";
    case "FILTER_COMPLETED":
      return "COMPLETED";
    case "FILTER_ALL":
      return "ALL";
    default:
      return state;
  }
};

export default combineReducers({
  todos,
  visibilityFilter,
});
