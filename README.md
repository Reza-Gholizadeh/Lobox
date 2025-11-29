# Lobox Assignment - Multi-Select Component

This project is a **React + Vite + TypeScript** application implementing a **custom multi-select component**.  
It demonstrates advanced React patterns, including hooks, reducers, custom utilities, SCSS, testing, and pre-commit automation.

---

## Features

- **Multi-select component** with:

  - Selecting multiple items
  - Adding new items by typing and pressing Enter
  - Removing items via chips
  - Keyboard navigation (Arrow keys, Enter, Backspace, Escape)
  - Dropdown closing when clicking outside

- **State management** using `useReducer` and custom hooks
- **Debounced input handling** with `useDebounce` hook
- **Utilities**:
  - `filterItems` for dynamic filtering
  - Keyboard handler helpers for cleaner code
- **Styling** using SCSS with mixins and namespaced variables
- **Testing** with Vitest and React Testing Library
- **Pre-commit checks** with Husky & lint-staged:
  - TypeScript type checking
  - ESLint + Prettier formatting
  - Running tests

---
## Getting Started

### 1. Install dependencies

```bash
yarn install
2. Run development server
bash
Copy code
yarn dev
Open http://localhost:5173 to view the app.

3. Run tests
bash
Copy code
yarn test
4. Build for production
bash
Copy code
yarn build
Docker
Build and run the project with Docker:

bash
Copy code
docker build -t lobox-assignment .
docker run -p 5173:80 lobox-assignment
Uses nginx to serve the production build.

Pre-commit Hooks
Husky and lint-staged are configured to run automatically on commit:

TypeScript type checking

ESLint + Prettier on staged files

Vitest test suite

Utilities & Hooks
filterItems(items, selected, inputValue) – filters dropdown options based on selected items and input

useDebounce(value, delay) – debounces input values

useMultiSelect() – handles state and interactions of the multi-select component

License
This project is created for Lobox Frontend Assignment purposes.

```
