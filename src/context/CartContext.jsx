import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { products, COUPONS } from "../constants";

const STORAGE_KEY = "nutrummy-cart-v2";
const MAX_QTY = 20;

const CartContext = createContext(null);

// Cart lines are keyed "productId:packId".
const lineKey = (productId, packId) => `${productId}:${packId}`;
const findLine = (key) => {
  const [pid, packId] = key.split(":");
  const product = products.find((p) => p.id === pid);
  const pack = product?.packs.find((k) => k.id === packId);
  return product && pack ? { product, pack } : null;
};

// Storage can be unavailable (private mode, blocked site data), so never let it break the page.
const loadState = () => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    const quantities = Object.fromEntries(
      Object.entries(parsed.quantities || {}).filter(
        ([key, qty]) => findLine(key) && Number.isInteger(qty) && qty > 0
      )
    );
    const coupon = COUPONS[parsed.coupon] ? parsed.coupon : null;
    return { quantities, coupon };
  } catch {
    return { quantities: {}, coupon: null };
  }
};

export const formatINR = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export const CartProvider = ({ children }) => {
  const [initial] = useState(loadState);
  const [quantities, setQuantities] = useState(initial.quantities);
  const [coupon, setCoupon] = useState(initial.coupon);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ quantities, coupon }));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [quantities, coupon]);

  const setQty = useCallback((key, qty) => {
    setQuantities((q) => {
      const next = { ...q };
      const clamped = Math.max(0, Math.min(MAX_QTY, qty));
      if (clamped === 0) delete next[key];
      else next[key] = clamped;
      return next;
    });
  }, []);

  const add = useCallback((productId, packId, qty = 1) => {
    const key = lineKey(productId, packId);
    setQuantities((q) => ({ ...q, [key]: Math.min(MAX_QTY, (q[key] || 0) + qty) }));
    setLastAdded({ key, at: Date.now() });
  }, []);

  /** Returns true when the code is valid. */
  const applyCoupon = useCallback((code) => {
    const normalized = code.trim().toUpperCase();
    if (!COUPONS[normalized]) return false;
    setCoupon(normalized);
    return true;
  }, []);

  const clear = useCallback(() => {
    setQuantities({});
    setCoupon(null);
  }, []);

  const value = useMemo(() => {
    const items = Object.entries(quantities)
      .map(([key, qty]) => {
        const line = findLine(key);
        return line && { key, qty, ...line, lineTotal: line.pack.price * qty };
      })
      .filter(Boolean);
    const subtotal = items.reduce((n, i) => n + i.lineTotal, 0);
    const discount = coupon ? Math.round(subtotal * COUPONS[coupon]) : 0;
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal,
      coupon,
      discount,
      total: subtotal - discount,
      add,
      setQty,
      remove: (key) => setQty(key, 0),
      applyCoupon,
      removeCoupon: () => setCoupon(null),
      clear,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      lastAdded,
    };
  }, [quantities, coupon, add, setQty, applyCoupon, clear, isOpen, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
