// Safe localStorage helpers. Storage can be unavailable (private mode, quota, disabled),
// so every read/write is wrapped and falls back gracefully.
export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: the app keeps working for this session */
  }
}
