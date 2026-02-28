function TodoList() {
  const { todos } = React.useContext(TodoContext);
  const { filter } = React.useContext(FilterContext);

  const filteredTodos = React.useMemo(() => {
    if (filter === 'all') return todos;
    if (filter === 'active') return todos.filter((t) => !t.completed);
    return todos.filter((t) => t.completed);
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <p className="empty-state">
        {todos.length === 0
          ? 'No todos yet! Add one above.'
          : filter === 'active'
          ? 'No active todos.'
          : filter === 'completed'
          ? 'No completed todos.'
          : 'No todos match the filter.'}
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
window.TodoList = TodoList;
