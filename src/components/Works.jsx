import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { products, productCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useCart, formatINR } from "../context/CartContext";
import ProductImage from "./ProductImage";
import Icon from "./Icon";

const ProductCard = ({ product }) => {
  const { id, name, short, category, badge, tagline, description, protein, packs, body, accent, tags } = product;
  const { add, open } = useCart();
  const [packId, setPackId] = useState(packs[0].id);
  const [justAdded, setJustAdded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const n = product.nutrition;
  const pack = packs.find((p) => p.id === packId);
  const fromPrice = Math.min(...packs.map((p) => p.price));

  useEffect(() => {
    if (!justAdded) return undefined;
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  return (
    <div id={`product-${id}`} className='h-full scroll-mt-36 rounded-2xl target:ring-4 target:ring-lupin/60'>
    <Tilt options={{ max: 6, scale: 1, speed: 450 }} className={`${styles.card} p-4 h-full flex flex-col`}>
      <div className='relative w-full h-[230px] rounded-xl overflow-hidden' style={{ perspective: 1000 }}>
        <AnimatePresence initial={false} mode='wait'>
          {showPanel ? (
            <motion.dl
              key='panel'
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className='absolute inset-0 bg-ink text-[#FFF3E6] p-4 text-[12.5px] overflow-y-auto'
              aria-label={`${name} nutrition panel`}
            >
              <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-lupin'>Nutrition panel</p>
              {[
                ["Lupin protein", n.protein],
                ["Added sugar", n.addedSugar],
                ["Maida", n.maida],
                ["Plant powered", n.plantPowered],
                ["Flavour", n.flavour],
              ].map(([k, v]) => (
                <div key={k} className='flex justify-between gap-3 py-1.5 border-b border-[#FFF3E6]/15'>
                  <dt className='text-[#E3D3E8]'>{k}</dt>
                  <dd className='font-semibold text-right'>{v}</dd>
                </div>
              ))}
              <dt className='mt-2 text-[#E3D3E8]'>Key ingredients</dt>
              <dd className='font-medium'>{n.keyIngredients}</dd>
              <dt className='mt-2 text-[#E3D3E8]'>How to serve</dt>
              <dd className='font-medium'>{n.howToServe}</dd>
            </motion.dl>
          ) : (
            <motion.div
              key='photo'
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className='absolute inset-0 flex items-center justify-center'
              style={{ background: "radial-gradient(circle at 50% 42%, #FFFFFF 0%, #FFE4CC 80%)" }}
            >
              <ProductImage product={product} />
              <span className='absolute top-3 left-3 bg-cream text-primary text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full'>
                {badge}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type='button'
          onClick={() => setShowPanel((s) => !s)}
          aria-pressed={showPanel}
          className={`absolute bottom-3 right-3 z-10 text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition-colors ${
            showPanel ? "bg-lupin text-ink border-lupin" : "bg-tertiary/90 text-cream border-ink/15 hover:border-ink/40"
          }`}
        >
          {showPanel ? "Show pack ↺" : "Nutrition panel ↺"}
        </button>
      </div>

      <div className='mt-5 px-1 flex-1'>
        <p className='text-gold text-[12px] uppercase tracking-[0.18em] font-bold'>{category}</p>
        <h3 className='font-display text-cream font-extrabold text-[19px] leading-tight mt-1.5'>{name}</h3>
        <div className='mt-1 flex items-center justify-between gap-2 text-[13px]'>
          <p className='text-cream'>
            From <span className='font-bold'>{formatINR(fromPrice)}</span>
          </p>
          <p className='flex items-center gap-1 text-secondary' aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}>
            <Icon name='star' filled strokeWidth={0} className='w-3.5 h-3.5 text-mango' />
            <span className='font-semibold text-cream'>{product.rating}</span> ({product.reviewCount})
          </p>
        </div>
        <p className='mt-3 text-secondary text-[13.5px] leading-[21px]'>
          <span className='text-cream font-medium'>{tagline}.</span> {description}
        </p>
        <ul className='mt-3 flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <li key={tag} className='text-[12px] text-cream bg-ink/[0.05] border border-ink/10 rounded-md px-2 py-0.5'>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <fieldset className='mt-4 px-1'>
        <legend className='text-[12px] font-semibold text-secondary mb-2'>Pack size</legend>
        <div className='grid grid-cols-2 gap-2'>
          {packs.map((p) => (
            <label
              key={p.id}
              className={`cursor-pointer rounded-xl border px-2 py-2 text-center transition-colors ${
                p.id === packId ? "border-gold bg-gold/[0.06] text-cream" : "border-ink/15 text-secondary hover:border-ink/30"
              }`}
            >
              <input
                type='radio'
                name={`pack-${id}`}
                value={p.id}
                checked={p.id === packId}
                onChange={() => setPackId(p.id)}
                className='sr-only'
              />
              <span className='block text-[13px] font-semibold'>{p.label}</span>
              <span className='block text-[12px]'>{formatINR(p.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className='mt-4 pt-4 px-1 border-t border-ink/10 flex items-center justify-between gap-3'>
        <p className='font-display text-cream font-extrabold text-[24px] leading-none'>{formatINR(pack.price)}</p>
        {justAdded ? (
          <button
            type='button'
            onClick={open}
            className='inline-flex items-center gap-1.5 bg-cream text-primary text-[13px] font-bold uppercase tracking-wide px-4 py-2.5 rounded-full'
          >
            <Icon name='check' className='w-4 h-4' strokeWidth={2.5} /> View cart
          </button>
        ) : (
          <button
            type='button'
            onClick={() => {
              add(id, packId);
              setJustAdded(true);
            }}
            aria-label={`Add ${name}, ${pack.label}, to cart`}
            className='inline-flex items-center gap-1.5 bg-lupin text-ink text-[13px] font-bold uppercase tracking-wide px-4 py-2.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
          >
            <Icon name='cart' className='w-4 h-4' strokeWidth={2} /> Add to cart
          </button>
        )}
      </div>
    </Tilt>
    </div>
  );
};

const Works = () => {
  const [category, setCategory] = useState("All");
  const shown = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <motion.div variants={textVariant()} className='text-center'>
        <p className={styles.sectionSubText}>Our high-protein pantry</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Welcome back to the <span className='text-gold'>breakfast table.</span>
        </h2>
        <p className={`${styles.body} mt-4 max-w-2xl mx-auto`}>
          Every recipe is made with Sweet Lupin: up to 35g of protein per 100g, zero maida and nothing
          artificial.
        </p>
      </motion.div>

      <div role='tablist' aria-label='Filter products' className='mt-10 flex flex-wrap justify-center gap-2'>
        {productCategories.map((c) => {
          const n = c === "All" ? products.length : products.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              role='tab'
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider border transition-colors ${
                category === c ? "bg-cream text-primary border-cream" : "bg-tertiary text-cream border-ink/15 hover:border-ink/40"
              }`}
            >
              {c} <span className='opacity-70 font-semibold'>({n})</span>
            </button>
          );
        })}
      </div>

      {/* No per-card reveal animation, so every product is always visible regardless of screen height. */}
      <div className='mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "products");
