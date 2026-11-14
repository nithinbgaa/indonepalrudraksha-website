"use client";

// Small useSyncExternalStore helpers for values that only exist in the browser.
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false during the server render and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Current minute (changes once a minute); 0 on the server. */
function subscribeMinute(cb: () => void) {
  const t = setInterval(cb, 30000);
  return () => clearInterval(t);
}
export function useMinute() {
  return useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60000),
    () => 0,
  );
}

/** A localStorage entry as a string, kept in sync across tabs; "" on the server or if unavailable. */
const local = new Map<string, Set<() => void>>();
export function readLocal(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
export function writeLocal(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
  local.get(key)?.forEach((cb) => cb());
}
export function useLocal(key: string) {
  return useSyncExternalStore(
    (cb) => {
      if (!local.has(key)) local.set(key, new Set());
      local.get(key)!.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) cb();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        local.get(key)!.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    () => readLocal(key),
    () => "",
  );
}

/** window.location.search ("" on the server). */
export function useSearch() {
  return useSyncExternalStore(
    noop,
    () => window.location.search,
    () => "",
  );
}
