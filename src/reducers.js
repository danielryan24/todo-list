// reducers.js
const initialState = {
  todos: [],
  filter: "all",
};

const todoReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: new Date().getTime(),
          text: action.payload.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "EDIT_TODO":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
          };
        }
        return todo;
      });
    default:
      return state;
  }
};

const filterReducer = (state = initialState.filter, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload.filter;
    default:
      return state;
  }
};

const rootReducer = (state = initialState, action) => ({
  todos: todoReducer(state.todos, action),
  filter: filterReducer(state.filter, action),
});

export default rootReducer;
