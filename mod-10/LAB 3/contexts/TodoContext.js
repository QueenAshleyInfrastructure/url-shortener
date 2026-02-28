/* TodoContext: todos array, actions addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted. Persisted to localStorage. */
const TodoContext = React.createContext(null);

const STORAGE_KEY = 'lab3-todos';

function getInitialTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

const actions = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  SET: 'SET',
};

function todoReducer(state, action) {
  switch (action.type) {
    case actions.SET:
      return action.payload;
    case actions.ADD:
      return [
        ...state,
        {
          id: typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now() + '-' + Math.random().toString(36).slice(2),
          text: action.payload,
          completed: false,
        },
      ];
    case actions.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case actions.DELETE:
      return state.filter((t) => t.id !== action.payload);
    case actions.EDIT:
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
    case actions.CLEAR_COMPLETED:
      return state.filter((t) => !t.completed);
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [todos, dispatch] = React.useReducer(todoReducer, [], () => getInitialTodos());

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (_) {}
  }, [todos]);

  const addTodo = React.useCallback((text) => {
    const trimmed = typeof text === 'string' ? text.trim() : '';
    if (trimmed) dispatch({ type: actions.ADD, payload: trimmed });
  }, []);

  const toggleTodo = React.useCallback((id) => {
    dispatch({ type: actions.TOGGLE, payload: id });
  }, []);

  const deleteTodo = React.useCallback((id) => {
    dispatch({ type: actions.DELETE, payload: id });
  }, []);

  const editTodo = React.useCallback((id, newText) => {
    const trimmed = typeof newText === 'string' ? newText.trim() : '';
    if (trimmed) dispatch({ type: actions.EDIT, payload: { id, text: trimmed } });
  }, []);

  const clearCompleted = React.useCallback(() => {
    dispatch({ type: actions.CLEAR_COMPLETED });
  }, []);

  const value = React.useMemo(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    }),
    [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]
  );

  return React.createElement(TodoContext.Provider, { value }, children);
}

window.TodoContext = TodoContext;
window.TodoProvider = TodoProvider;
