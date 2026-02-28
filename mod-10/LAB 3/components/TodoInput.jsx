function TodoInput() {
  const [value, setValue] = React.useState('');
  const { addTodo } = React.useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="New todo"
      />
      <button type="submit" className="btn primary">
        Add Todo
      </button>
    </form>
  );
}
window.TodoInput = TodoInput;
