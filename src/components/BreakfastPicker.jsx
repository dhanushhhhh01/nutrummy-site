import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { products } from "../constants";
import { useCart, formatINR } from "../context/CartContext";
import ProductImage from "./ProductImage";
import Icon from "./Icon";

// "Choose your breakfast style" from the reference site: pick a category, see its pack, quick add.
const BreakfastPicker = () => {
  const [id, setId] = useState(products[0].id);
  const [added, setAdded] = useState(false);
  const { add, open } = useCart();
  const p = products.find((x) => x.id === id);

  return (
    <div className='mt-9 max-w-[520px]'>
      <p className='text-[12px] font-bold uppercase tracking-[0.2em] text-secondary'>Choose your breakfast style</p>
      <div role='radiogroup' aria-label='Breakfast style' className='mt-3 flex flex-wrap gap-2'>
        {products.map((x) => (
          <button
            key={x.id}
            type='button'
            role='radio'
            aria-checked={x.id === id}
            onClick={() => {
              setId(x.id);
              setAdded(false);
            }}
            className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
              x.id === id ? "bg-ink text-primary border-ink" : "bg-tertiary/70 text-cream border-ink/15 hover:border-ink/40"
            }`}
          >
            {x.chip} <span className={x.id === id ? "text-mango" : "text-gold"}>· {x.protein}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className='mt-4 flex items-center gap-4 bg-tertiary/90 backdrop-blur border border-ink/10 rounded-2xl p-3 pr-4 shadow-pop'
        >
          <div className='w-14 h-16 shrink-0 rounded-lg bg-primary flex items-center justify-center overflow-hidden'>
            <ProductImage product={p} size='thumb' className='w-full h-full' />
          </div>
          <Link to={{ pathname: "/", hash: `#product-${p.id}` }} className='flex-1 min-w-0 group'>
            <p className='text-[11px] font-bold uppercase tracking-wider text-gold'>{p.badge}</p>
            <p className='text-cream font-bold text-[15px] leading-tight group-hover:text-gold truncate'>{p.name}</p>
            <p className='text-secondary text-[12px]'>
              {p.protein} protein · {p.packs[0].label}
            </p>
          </Link>
          <button
            type='button'
            onClick={() => {
              if (added) return open();
              add(p.id, p.packs[0].id);
              setAdded(true);
            }}
            className={`shrink-0 inline-flex items-center gap-1.5 text-[13px] font-bold px-4 py-2.5 rounded-full transition-colors ${
              added ? "bg-ink text-primary" : "bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn hover:bg-ink hover:text-primary"
            }`}
          >
            {added ? (
              <>
                <Icon name='check' className='w-4 h-4' strokeWidth={2.5} /> View cart
              </>
            ) : (
              <>
                <span className='xs:hidden'>Add · </span>
                <span className='hidden xs:inline'>Quick add · </span>
                {formatINR(p.packs[0].price)}
              </>
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BreakfastPicker;
