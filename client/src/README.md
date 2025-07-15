# 📁 /src Directory

The `/src` directory contains all source code and logic for the application. This structure is designed to keep the codebase clean, modular, scalable, and easy to navigate — especially for multi-developer teams and large feature sets.

---

## 📂 Folder Overview

### 🔹 `assets/`
**Purpose:**  
Stores static files such as images, icons, fonts, and other media assets that do not require transformation or compilation.

**Typical contents:**
- `/images`: Logos, banners, backgrounds
- `/icons`: SVG or PNG assets
- `/fonts`: Custom web fonts

**Best Practices:**
- Reference assets using import or public path
- Group by type (e.g., `/icons/ui`, `/images/team`)
- Optimize files for web performance

---

### 🔹 `components/`
**Purpose:**  
Contains all reusable, presentational UI components. Each component is typically stateless and focused on rendering data passed via props.

**Examples:**
- `Button.jsx`
- `Modal.jsx`
- `Table.jsx`
- `Navbar/` → Subfolder for grouped component logic (JSX + styles)

**Best Practices:**
- Use PascalCase for component names
- Co-locate styles and tests (e.g., `Card.jsx`, `Card.module.css`)
- Split into subfolders by domain if needed (`/dashboard`, `/auth`)

---

### 🔹 `constants/`
**Purpose:**  
Holds unchanging values used throughout the application — such as enums, mappings, configuration objects, system codes, and labels.

**Examples:**
- `routes.js` → Named route paths
- `roles.js` → User role enums
- `activityLogMetaMap.js` → Mapped metadata for logs
- `appConfig.js` → Project title, API endpoints, version

**Best Practices:**
- Use `UPPER_SNAKE_CASE` for single values (e.g., `STATUS.APPROVED`)
- Avoid hardcoding strings in components directly
- Group constants by domain if growing large

---

### 🔹 `context/`
**Purpose:**  
Handles shared application state using the React Context API. Useful for global data like authentication, themes, notifications, or user preferences.

**Structure:**
- `AuthContext.js` → Holds user login state
- `ThemeContext.js` → Tracks light/dark mode
- `ActivityContext.js` → Global activity logs

**Best Practices:**
- Export custom hooks (e.g., `useAuth()`) for cleaner usage
- Wrap all contexts in a single `AppProviders.jsx` file if needed
- Avoid putting heavy logic directly into context files

---

### 🔹 `hooks/`
**Purpose:**  
Contains custom React hooks that encapsulate reusable logic (e.g., state, effects, behaviors) independent of UI.

**Examples:**
- `useToggle.js` → Boolean toggler
- `useDebounce.js` → Debounced value for input fields
- `useOutsideClick.js` → Detect clicks outside a ref

**Best Practices:**
- Always start hook names with `use`
- Keep hooks small and single-purpose
- Don’t use hooks conditionally (must follow React rules)

---

### 🔹 `layouts/`
**Purpose:**  
Provides structural templates or wrappers that define the layout skeleton for specific groups of pages (e.g., dashboards, public views, admin panels).

**Examples:**
- `MainLayout.jsx` → Header + Footer
- `AdminLayout.jsx` → Sidebar + Topbar
- `AuthLayout.jsx` → Centered login/register screen

**Best Practices:**
- Compose layouts using reusable components
- Combine with route-based rendering (`<Route element={<AdminLayout />}>`)
- Use to avoid repeating structural code on every page

---

### 🔹 `pages/`
**Purpose:**  
Contains top-level, route-specific components representing full screens. These are typically connected to the router and may include nested subpages.

**Examples:**
- `Home.jsx`
- `Login.jsx`
- `Dashboard/` → May contain `Index.jsx`, `Reports.jsx`, etc.

**Best Practices:**
- One folder per route group (e.g., `/dashboard`, `/admin`)
- Keep pages thin — move logic/UI into `components/`
- Name files using PascalCase

---

### 🔹 `routes/`
**Purpose:**  
Centralizes all route definitions, route guards, and layout bindings for React Router (or equivalent). Keeps routing logic maintainable and declarative.

**Examples:**
- `appRoutes.js` → All route paths and their matching pages
- `RouteGuard.js` → Middleware for protected routes
- `PrivateRoute.jsx` → Wrapper for authenticated access

**Best Practices:**
- Store path constants in `constants/routes.js`
- Keep route configuration flat or nested depending on app complexity
- Consider lazy loading pages for better performance

---

### 🔹 `services/`
**Purpose:**  
Holds all API interaction logic or external service wrappers. This keeps your components clean from networking logic and supports better testing and abstraction.

**Examples:**
- `authService.js` → login, logout, register
- `equipmentService.js` → fetch equipment list, update item
- `axiosInstance.js` → configured `axios` base client

**Best Practices:**
- Group by domain (e.g., `userService`, `logService`)
- Abstract all external HTTP calls into this layer
- Return data in a clean, predictable format

---

### 🔹 `store/` (optional)
**Purpose:**  
Used when integrating third-party global state libraries like Redux, Zustand, Recoil, or Jotai.

**Examples (Redux):**
- `store/index.js` → store setup
- `authSlice.js` → login/logout reducer
- `userSlice.js` → user data reducer

**Best Practices:**
- Organize by feature slice (`auth`, `user`, `ui`)
- Normalize state shape
- Use Redux Toolkit or Zustand for minimal boilerplate

---

### 🔹 `styles/`
**Purpose:**  
Holds global styles, shared theme variables, and configuration for styling libraries like Tailwind, Sass, or styled-components.

**Examples:**
- `global.css` → Base resets
- `tailwind.config.js` → Tailwind customization
- `theme.js` → Chakra UI or MUI theme overrides

**Best Practices:**
- Use CSS Modules or scoped styles for components
- Centralize variables in `:root` or JS theme files
- Avoid inline styles unless dynamic

---

### 🔹 `utils/`
**Purpose:**  
Contains pure, reusable helper functions for formatting, transforming data, or abstracting logic not tied to React.

**Examples:**
- `timeAgo.js` → converts date to "2 hours ago"
- `getStatusIconStyle.js` → returns icons/colors for statuses
- `slugify.js`, `debounce.js`, `formatNumber.js`

**Best Practices:**
- Keep functions pure (no side effects)
- Group by domain if scaling (e.g., `dateUtils/`, `stringUtils/`)
- Write unit tests if logic is non-trivial

---

### 🔹 `types/` (optional)
**Purpose:**  
Contains reusable types and interfaces. Primarily useful in TypeScript projects or when using JSDoc in JavaScript to provide IntelliSense.

**Examples:**
- `userTypes.js`
- `equipmentTypes.js`

**Best Practices:**
- Prefer `@typedef` with JSDoc for JS projects
- Co-locate types near usage if very specific
- Centralize shared domain types

---

### 🔹 `config/` (optional)
**Purpose:**  
Stores environment-based configuration or project-level setup such as API base URLs, theme toggles, and deployment targets.

**Examples:**
- `axiosConfig.js` → base URL, interceptors
- `env.js` → mode-based config
- `featureFlags.js` → conditional UI logic

**Best Practices:**
- Import config from one place
- Use `import.meta.env` (Vite) or `process.env` carefully
- Avoid exposing secrets in frontend config

---

## 🧠 File Naming Conventions

| Purpose             | Convention            | Example              |
|---------------------|-----------------------|----------------------|
| Components          | `PascalCase`          | `Sidebar.jsx`        |
| Hooks               | `camelCase` with `use`| `useAuth.js`         |
| Utils / Constants   | `camelCase`           | `formatDate.js`      |
| Pages               | `PascalCase`          | `Dashboard.jsx`      |
| Styles              | `.css` / `.module.css`| `Card.module.css`    |
| Context             | `PascalCaseContext.js`| `ThemeContext.js`    |
| Layouts             | `PascalCaseLayout.js` | `DashboardLayout.jsx`|

---

## 📦 Import Alias Setup (`@/` → `/src`)

Set up `@` to simplify import paths.

### ✅ `vite.config.js`
```js
import path from "path";
export default {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
