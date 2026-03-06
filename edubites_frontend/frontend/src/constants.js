// constants.js
// central place for API configuration

// The API base URL can be supplied via a Vite environment variable
// (see `.env.local` or `.env`).
// In development you can still hard‑code the Wi‑Fi IP below, e.g. 192.168.1.33.
// VITE_API_BASE overrides the manual values when defined.

const DEFAULT_API_IP = '192.168.1.33';
const DEFAULT_API_PORT = 8000; // change if your backend runs on a different port
const DEFAULT_API_BASE = `http://${DEFAULT_API_IP}:${DEFAULT_API_PORT}`;

// import.meta.env values are replaced at build time by Vite
export const API_BASE = import.meta.env.VITE_API_BASE || DEFAULT_API_BASE;

export default {
  DEFAULT_API_IP,
  DEFAULT_API_PORT,
  DEFAULT_API_BASE,
  API_BASE,
};
