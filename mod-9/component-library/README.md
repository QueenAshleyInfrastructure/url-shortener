# Component Library — React Fundamentals Lab

This repository contains three TypeScript React components created for the React Fundamentals lab:

- `AlertBox` — simple alert panel with optional close handler.
- `UserProfileCard` — user profile display with optional email/role and an edit handler.
- `ProductDisplay` — product card with configurable display options and an add-to-cart handler.

This project also includes a small demo app under `src/App.tsx` showing example usage and composition.

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to view the demo.

## Build

To compile TypeScript and build production assets:

```bash
npm run build
```

## Usage (as a library)

You can import components directly from the package `src` entrypoint provided here:

```tsx
import { AlertBox, UserProfileCard, ProductDisplay } from "./src";
import type { User, Product } from "./src/types";

// Example: AlertBox
<AlertBox type="success" message="Saved!" onClose={() => {}}>
  ...
</AlertBox>;

// Example: UserProfileCard
const user: User = {
  id: "1",
  name: "Jane",
  email: "jane@example.com",
  role: "Designer",
  avatarUrl: "",
};
<UserProfileCard user={user} showEmail showRole onEdit={(id) => {}}>
  ...
</UserProfileCard>;

// Example: ProductDisplay
const product: Product = {
  id: "1",
  name: "Widget",
  price: 9.99,
  description: "",
  imageUrl: "",
  inStock: true,
};
<ProductDisplay product={product} onAddToCart={(id) => {}}>
  ...
</ProductDisplay>;
```

## Notes

- The project uses Tailwind CSS. If styles look missing in your environment ensure Tailwind is configured (`tailwind.config.js` and `postcss.config.js`).
- Type-only imports are used in components to satisfy the TypeScript config.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
