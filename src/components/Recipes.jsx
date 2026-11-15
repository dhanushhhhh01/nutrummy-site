import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { recipes, recipeCategories, products } from "../constants";
import { textVariant } from "../utils/motion";
import { useCart } from "../context/CartContext";
import Icon from "./Icon";

const RecipeCard = ({ title, time, protein, text, highlights, category, productId }) => {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === productId);
  return (
    <div className='bg-tertiary p-7 rounded-2xl border-2 border-ink shadow-pop flex flex-col h-full'>
      <div className='flex items-center justify-between text-[13px]'>
        <span className='text-[11px] font-bold uppercase tracking-[0.16em] text-gold'>{category}</span>
        <span className='inline-flex items-center gap-1.5 text-secondary'>
          <Icon name='clock' className='w-4 h-4 text-gold' /> {time}
        </span>
      </div>
      <h3 className='mt-4 font-display text-cream font-extrabold text-[20px] leading-tight'>{title}</h3>
      <p className='mt-3 text-secondary text-[14px] leading-[22px] flex-1'>{text}</p>
      <div className='mt-4 flex flex-wrap gap-1.5'>
        {highlights.map((h) => (
          <span key={h} className='text-[12px] text-cream bg-ink/[0.05] border border-ink/10 rounded-md px-2 py-0.5'>
            {h}
          </span>
        ))}
      </div>
      <div className='mt-5 pt-4 border-t border-ink/10 flex items-center justify-between gap-3'>
        <p className='text-cream font-extrabold text-[18px] leading-none'>
          {protein} <span className='text-secondary font-medium text-[12px]'>protein</span>
        </p>
        {product && (
          <button
            type='button'
            onClick={() => {
              if (added) return open();
              add(product.id, product.packs[0].id);
              setAdded(true);
            }}
            aria-label={added ? "View cart" : `Get ${product.name} for this recipe`}
            className={`inline-flex items-center gap-1 text-[13px] font-bold px-3.5 py-2 rounded-full transition-colors ${
              added ? "bg-ink text-primary" : "bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn hover:bg-ink hover:text-primary"
            }`}
          >
            {added ? "View cart" : "Get mix"} <Icon name='arrow' className='w-3.5 h-3.5' strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

const Recipes = () => {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? recipes : recipes.filter((r) => r.category === cat);
  return (
    <div className='bg-black-200 rounded-3xl border border-ink/10'>
      <div className={`${styles.padding}`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Morning kitchen inspo</p>
          <h2 className={`${styles.sectionHeadText} mt-3`}>
            Breakfast inspiration <span className='marker'>& recipes.</span>
          </h2>
          <p className={`${styles.body} mt-3 max-w-2xl`}>
            Quick, effortless morning bowls and weekend bakes, designed to make high-protein eating feel like an
            everyday indulgence.
          </p>
        </motion.div>

        <div role='tablist' aria-label='Recipe types' className='mt-8 flex flex-wrap gap-2'>
          {recipeCategories.map((c) => (
            <button
              key={c}
              role='tab'
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold border transition-colors ${
                cat === c ? "bg-ink text-primary border-ink" : "bg-tertiary text-cream border-ink/15 hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className='mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {shown.map((r) => (
            <RecipeCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Recipes, "recipes");
