# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

### Networking / backend URL

To connect the frontend to a backend running on another machine or on your network, you can set the API URL via a Vite environment variable.

1. Create a file named `.env.local` in the project root (it's gitignored by default):

```bash
VITE_API_BASE=http://192.168.1.33:8000
```

2. The React code uses `import.meta.env.VITE_API_BASE` (see `src/constants.js`), with a fallback to a hard‑coded address.

3. Update `vite.config.js` so the dev server listens on the network (`host: true`), allowing other devices on the same Wi‑Fi to access `http://<your-ip>:5173`.

4. Ensure your backend allows CORS and listens on `0.0.0.0`.

Now you can open the app from another device using your computer’s IP (e.g. `http://192.168.1.33:5173`).
