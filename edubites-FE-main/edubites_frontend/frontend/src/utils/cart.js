const CART_STORAGE_KEY = "cart";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getCart() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  const parsed = safeParse(raw ?? "[]", []);
  return Array.isArray(parsed) ? parsed : [];
}

export function setCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(Array.isArray(items) ? items : []));
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function addToCart(item, qty = 1) {
  if (!item || typeof item.id === "undefined") return;
  const addQty = typeof qty === "number" && qty > 0 ? qty : 1;

  const cart = getCart();
  const idx = cart.findIndex((x) => x?.id === item.id);

  if (idx >= 0) {
    const existing = cart[idx];
    const nextQty = (existing?.qty || 1) + addQty;
    const updated = { ...existing, ...item, qty: nextQty };
    const next = [...cart];
    next[idx] = updated;
    setCart(next);
    return;
  }

  setCart([...cart, { ...item, qty: addQty }]);
}

export function updateCartQty(itemId, qty) {
  const nextQty = typeof qty === "number" ? qty : Number(qty);
  if (!Number.isFinite(nextQty)) return;

  const cart = getCart();
  const next = cart
    .map((x) => (x?.id === itemId ? { ...x, qty: Math.max(1, nextQty) } : x))
    .filter(Boolean);
  setCart(next);
}

export function removeFromCart(itemId) {
  const cart = getCart();
  setCart(cart.filter((x) => x?.id !== itemId));
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item?.qty || 1), 0);
}

