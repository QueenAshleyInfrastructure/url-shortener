function TodoItem({ todo }) {
  const [editing, setEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo } = React.useContext(TodoContext);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      editTodo(todo.id, trimmed);
    } else if (!trimmed) {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {editing ? (
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit todo"
        />
      ) : (
        <span
          className="todo-text read-only"
          onDoubleClick={() => setEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <button
        type="button"
        className="btn btn-icon"
        onClick={() => toggleTodo(todo.id)}
        title="Toggle"
      >
        {todo.completed ? '↩' : '✓'}
      </button>
      <button
        type="button"
        className="btn btn-icon danger"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
window.TodoItem = TodoItem;
