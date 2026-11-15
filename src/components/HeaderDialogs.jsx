import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { products, contactInfo } from "../constants";
import { blogPosts } from "../constants/blog";
import { useCart, formatINR } from "../context/CartContext";
import Icon from "./Icon";
import ProductImage from "./ProductImage";

const inputClass =
  "w-full bg-tertiary py-3 px-4 placeholder:text-muted text-cream rounded-xl outline-none border border-ink/15 focus:border-gold font-medium text-[15px]";

/** Centred modal with scrim, Escape-to-close and focus on open. */
export const Modal = ({ open, onClose, title, children, wide = false }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.querySelector("input,button")?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className='fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='absolute inset-0 bg-ink/40 backdrop-blur-[2px]'
          />
          <motion.div
            ref={ref}
            role='dialog'
            aria-modal='true'
            aria-label={title}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className={`relative w-full ${wide ? "max-w-[620px]" : "max-w-[440px]"} bg-primary rounded-2xl shadow-2xl border border-ink/10 overflow-hidden`}
          >
            <div className='flex items-center justify-between px-6 pt-5'>
              <h2 className='font-display text-cream text-[20px] font-extrabold'>{title}</h2>
              <button type='button' onClick={onClose} aria-label='Close' className='p-1.5 -mr-1.5 text-cream hover:text-gold'>
                <Icon name='close' className='w-5 h-5' />
              </button>
            </div>
            <div className='px-6 pb-6 pt-4'>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const SearchDialog = ({ open, onClose }) => {
  const [q, setQ] = useState("");
  const { add, open: openCart } = useCart();

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const { productHits, postHits } = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return { productHits: products, postHits: [] };
    const match = (s) => s.toLowerCase().includes(term);
    return {
      productHits: products.filter(
        (p) =>
          match(p.name) ||
          match(p.category) ||
          match(p.description) ||
          p.tags.some(match)
      ),
      postHits: blogPosts.filter((b) => match(b.title) || match(b.excerpt) || match(b.tag)),
    };
  }, [q]);

  return (
    <Modal open={open} onClose={onClose} title='Search' wide>
      <div className='relative'>
        <Icon name='search' className='w-5 h-5 text-secondary absolute left-4 top-1/2 -translate-y-1/2' />
        <label htmlFor='site-search' className='sr-only'>
          Search products and articles
        </label>
        <input
          id='site-search'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search muesli, oats, cookies, lupin…'
          className={`${inputClass} pl-11`}
        />
      </div>

      <div className='mt-4 max-h-[50vh] overflow-y-auto space-y-2' aria-live='polite'>
        {productHits.map((p) => (
          <div key={p.id} className='flex items-center gap-3 bg-tertiary border border-ink/10 rounded-xl p-3'>
            <div className='w-10 h-12 shrink-0 rounded-md bg-primary flex items-center justify-center overflow-hidden'>
              <ProductImage product={p} size='thumb' className='w-full h-full' />
            </div>
            <Link to={{ pathname: "/", hash: `#product-${p.id}` }} onClick={onClose} className='flex-1 min-w-0 group'>
              <p className='text-[14px] font-semibold text-cream group-hover:text-gold leading-tight'>{p.name}</p>
              <p className='text-[12px] text-secondary'>
                {p.category} · {p.protein} protein · from {formatINR(p.packs[0].price)}
              </p>
            </Link>
            <button
              type='button'
              onClick={() => {
                add(p.id, p.packs[0].id);
                onClose();
                openCart();
              }}
              className='text-[12px] font-bold px-3 py-1.5 rounded-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn shrink-0 hover:bg-ink hover:text-primary'
            >
              Add
            </button>
          </div>
        ))}
        {postHits.map((b) => (
          <Link
            key={b.slug}
            to={`/blog/${b.slug}`}
            onClick={onClose}
            className='block bg-tertiary border border-ink/10 rounded-xl p-3 hover:border-gold'
          >
            <p className='text-[11px] font-bold uppercase tracking-wider text-gold'>Article · {b.tag}</p>
            <p className='text-[14px] font-semibold text-cream'>{b.title}</p>
          </Link>
        ))}
        {q && productHits.length === 0 && postHits.length === 0 && (
          <p className='text-secondary text-[14px] py-6 text-center'>No results for "{q}". Try "protein" or "muesli".</p>
        )}
      </div>
    </Modal>
  );
};

// No customer accounts or order system exists yet, so these two dialogs are honest about it
// and route the visitor to the team by email. Replace when a backend is added.
export const LoginDialog = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} title='Login'>
    <div className='text-center py-2'>
      <div className='mx-auto w-14 h-14 rounded-full bg-lupin/20 text-gold flex items-center justify-center'>
        <Icon name='user' className='w-7 h-7' />
      </div>
      <p className='mt-4 text-cream font-semibold'>Customer accounts are coming soon</p>
      <p className='mt-2 text-secondary text-[14px] leading-[22px]'>
        You can order without an account. Your cart is saved on this device, and we confirm every order by
        email.
      </p>
      <button type='button' onClick={onClose} className='mt-5 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold px-6 py-3 rounded-full hover:bg-ink hover:text-primary'>
        Continue shopping
      </button>
    </div>
  </Modal>
);

export const TrackDialog = ({ open, onClose }) => {
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!order.trim()) return setErr("Please enter your order number or the name on the order.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Please enter the email you ordered with.");
    setErr("");
    const subject = encodeURIComponent(`Track my order: ${order.trim()}`);
    const body = encodeURIComponent(`Hi NUTRUMMY team,\n\nCould you share the status of my order ${order.trim()}?\n\nOrdered with: ${email}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title='Track your order'>
      <p className='text-secondary text-[14px] leading-[22px]'>
        Enter your order details and we'll email you the latest status, usually within one working day.
      </p>
      <form onSubmit={submit} noValidate className='mt-4 space-y-3'>
        <label className='block'>
          <span className='text-cream text-[13px] font-medium'>Order number or name on order</span>
          <input value={order} onChange={(e) => setOrder(e.target.value)} className={`${inputClass} mt-1.5`} />
        </label>
        <label className='block'>
          <span className='text-cream text-[13px] font-medium'>Email</span>
          <input type='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-1.5`} />
        </label>
        {err && (
          <p role='alert' className='berry-text text-[13px] font-medium'>
            {err}
          </p>
        )}
        <button type='submit' className='w-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold py-3 rounded-full hover:bg-ink hover:text-primary'>
          Request status
        </button>
      </form>
    </Modal>
  );
};
