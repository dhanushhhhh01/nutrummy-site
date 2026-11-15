import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { comparison } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Bar = ({ value, max, color, delay }) => (
  <div className='h-2.5 w-full rounded-full bg-ink/[0.06] overflow-hidden'>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.max((value / max) * 100, value === 0 ? 1.5 : 0)}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
      className='h-full rounded-full'
      style={{ background: color }}
    />
  </div>
);

const Row = ({ row, index }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.15, 0.75)} className={`${styles.card} p-6 sm:p-7`}>
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <h3 className='text-cream font-semibold text-[16px]'>{row.factor}</h3>
      <span className='text-[12px] font-semibold text-gold border border-gold/40 px-3 py-1 rounded-full'>
        {row.callout}
      </span>
    </div>

    <div className='mt-5 grid grid-cols-[92px_1fr_76px] sm:grid-cols-[112px_1fr_90px] items-center gap-x-4 gap-y-3'>
      <span className='text-cream text-[13px] font-semibold'>NUTRUMMY</span>
      <Bar value={row.us} max={row.max} color='#C7254A' delay={0.1} />
      <span className='font-display text-cream font-semibold text-[20px] text-right'>{row.usLabel}</span>

      <span className='text-secondary text-[13px]'>Typical cereal</span>
      <Bar value={row.them} max={row.max} color='#8892A6' delay={0.25} />
      <span className='text-secondary text-[14px] text-right'>{row.themLabel}</span>
    </div>
  </motion.div>
);

const Compare = () => (
  <>
    <div className='grid lg:grid-cols-[1fr_1.1fr] gap-x-16 gap-y-6 items-end'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Nutrition, compared</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          The numbers <span className='text-gold'>speak for themselves.</span>
        </h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className={styles.body}>
        Many "healthy" supermarket cereals are largely puffed sugar and refined maida. NUTRUMMY was
        formulated to break that cycle. Values per 100g.
      </motion.p>
    </div>

    <div className='mt-12 grid md:grid-cols-2 gap-5'>
      {comparison.map((row, i) => (
        <Row key={row.factor} row={row} index={i} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Compare, "compare");
