import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { ingredients } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

// Ingredient explorer (from the reference site): pick an ingredient to see why it earned its place.
const Tech = () => {
  const [active, setActive] = useState(0);
  const ing = ingredients[active];

  return (
    <>
      <motion.div variants={textVariant()} className='text-center'>
        <p className={styles.sectionSubText}>Honest sourcing</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Every ingredient <span className='marker'>has a purpose.</span>
        </h2>
        <p className={`${styles.body} mt-4 max-w-2xl mx-auto`}>
          No fillers. No hidden sugars. Tap any ingredient to explore why it earned its place inside the
          NUTRUMMY pouch.
        </p>
      </motion.div>

      <div role='tablist' aria-label='Ingredients' className='mt-12 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 justify-items-center gap-x-4 gap-y-8'>
        {ingredients.map((x, i) => (
          <motion.div key={x.name} variants={fadeIn("up", "spring", i * 0.1, 0.75)} className='flex flex-col items-center w-32'>
            <div
              className={`w-28 h-28 rounded-full transition-shadow ${i === active ? "ring-4 ring-lupin ring-offset-4 ring-offset-primary" : ""}`}
              onPointerUp={() => setActive(i)}
            >
              <BallCanvas symbol={x.symbol} stat={x.stat} color={x.color} />
            </div>
            <button
              type='button'
              role='tab'
              aria-selected={i === active}
              aria-controls='ingredient-panel'
              onClick={() => setActive(i)}
              className={`mt-4 text-center text-[14px] font-bold leading-tight px-2 py-1 rounded-lg ${
                i === active ? "text-gold" : "text-cream hover:text-gold"
              }`}
            >
              {x.name}
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={ing.name}
          id='ingredient-panel'
          role='tabpanel'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className='mt-12 grid md:grid-cols-[0.8fr_1.2fr] rounded-3xl overflow-hidden border-2 border-ink shadow-pop'
        >
          <div className='bg-ink text-[#F5F1E8] p-8 sm:p-10 flex flex-col justify-center'>
            <span className='self-start text-[11px] font-bold uppercase tracking-[0.18em] bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn px-3 py-1 rounded-full'>
              {ing.badge}
            </span>
            <p className='mt-5 font-display font-extrabold text-[30px] sm:text-[36px] leading-tight tracking-[-0.02em]'>{ing.name}</p>
            <p className='mt-2 text-mango text-[13px] font-bold uppercase tracking-[0.2em]'>{ing.kicker}</p>
          </div>
          <div className='bg-tertiary p-8 sm:p-10'>
            <p className={styles.sectionSubText}>Nutritional superpower</p>
            <h3 className='mt-2 font-display text-cream text-[22px] sm:text-[26px] font-extrabold leading-tight'>{ing.headline}</h3>
            <p className='mt-3 text-secondary text-[15px] leading-[25px]'>{ing.text}</p>
            <ul className='mt-5 grid sm:grid-cols-3 gap-2'>
              {ing.points.map((pt) => (
                <li key={pt} className='flex items-start gap-2 text-cream text-[14px] font-semibold'>
                  <Icon name='check' className='w-4 h-4 mt-0.5 text-gold shrink-0' strokeWidth={2.5} /> {pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Tech, "ingredients");
