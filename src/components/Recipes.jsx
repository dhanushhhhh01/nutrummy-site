import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { recipes } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

const RecipeCard = ({ index, title, time, protein, text, highlights }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.2, 0.75)}
    className='bg-black-200 p-7 rounded-2xl border border-white/[0.07] flex flex-col h-full'
  >
    <div className='flex items-center justify-between text-[13px]'>
      <span className='inline-flex items-center gap-1.5 text-secondary'>
        <Icon name='clock' className='w-4 h-4 text-gold' /> {time}
      </span>
      <span className='text-cream font-semibold'>
        {protein} <span className='text-secondary font-normal'>protein</span>
      </span>
    </div>
    <h3 className='mt-5 font-display text-cream font-semibold text-[20px] leading-tight'>{title}</h3>
    <p className='mt-3 text-secondary text-[14px] leading-[22px] flex-1'>{text}</p>
    <div className='mt-5 flex flex-wrap gap-1.5'>
      {highlights.map((h) => (
        <span key={h} className='text-[12px] text-cream bg-white/[0.05] border border-white/10 rounded-md px-2 py-0.5'>
          {h}
        </span>
      ))}
    </div>
  </motion.div>
);

const Recipes = () => (
  <div className='bg-black-100 rounded-3xl'>
    <div className={`bg-tertiary rounded-3xl ${styles.padding} min-h-[300px]`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Recipe ideas</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Ready in <span className='text-gold'>minutes.</span>
        </h2>
      </motion.div>
    </div>
    <div className={`-mt-24 pb-14 ${styles.paddingX} grid sm:grid-cols-2 lg:grid-cols-4 gap-5`}>
      {recipes.map((r, index) => (
        <RecipeCard key={r.title} index={index} {...r} />
      ))}
    </div>
  </div>
);

export default SectionWrapper(Recipes, "recipes");
