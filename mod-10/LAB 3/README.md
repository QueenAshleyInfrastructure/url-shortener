# Lab 3 — Context API Implementation (Todo App)

## How to run

1. Open `index.html` in the LAB 3 folder in your browser.
2. Or run a simple server:
   ```bash
   cd "mod-10/LAB 3"
   python3 -m http.server 5175
   ```
   Then open http://localhost:5175

## What is implemented

### Contexts (in `contexts/`)

- **TodoContext** (`TodoContext.js`)
  - State: array of todos `{ id, text, completed }`
  - Actions: `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`, `editTodo(id, newText)`, `clearCompleted()`
  - Uses `useReducer` for state; persisted to `localStorage` (`lab3-todos`)

- **FilterContext** (`FilterContext.js`)
  - State: `filter` — `'all' | 'active' | 'completed'`
  - Action: `setFilter(filter)`

- **ThemeContext** (`ThemeContext.js`)
  - State: `theme` — `'light' | 'dark'`
  - Action: `toggleTheme()`
  - Persisted to `localStorage` (`lab3-theme`); applied via `data-theme` on `<body>`

### Components (in `components/`)

- **TodoInput** — input + “Add Todo” button; submits new todo
- **TodoList** — displays todos filtered by FilterContext (All / Active / Completed)
- **TodoItem** — checkbox, text (double-click to edit), toggle, delete
- **FilterButtons** — All, Active, Completed
- **ThemeToggleButton** — switches light/dark theme

### App structure

- **AppProviders** — wraps app with `ThemeProvider` → `FilterProvider` → `TodoProvider`
- **TodoApp** — header (title + theme toggle), card with input, filters, list, and “Clear completed” when applicable

### Persistence & optimization

- Todos and theme are saved to `localStorage` and rehydrated on load.
- Context values are memoized with `useMemo` / `useCallback` in providers to reduce re-renders.
