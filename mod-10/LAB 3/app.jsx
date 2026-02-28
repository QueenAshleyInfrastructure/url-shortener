function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <FilterProvider>
        <TodoProvider>{children}</TodoProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}

function ClearCompletedButton() {
  const { todos, clearCompleted } = React.useContext(TodoContext);
  const completedCount = todos.filter((t) => t.completed).length;
  if (completedCount === 0) return null;
  return (
    <div className="clear-completed">
      <button type="button" className="btn small" onClick={clearCompleted}>
        Clear completed ({completedCount})
      </button>
    </div>
  );
}

function TodoApp() {
  return (
    <div className="todo-app">
      <div className="header-row">
        <h1>Todo App (Context API)</h1>
        <ThemeToggleButton />
      </div>
      <div className="card">
        <TodoInput />
        <FilterButtons />
        <TodoList />
        <ClearCompletedButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProviders>
      <TodoApp />
    </AppProviders>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
