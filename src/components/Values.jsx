import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Icon from "./Icon";

// Alternating "NUTRUMMY is…" brand-promise blocks.
const blocks = [
  {
    eyebrow: "NUTRUMMY is",
    title: "Unapologetically real.",
    text: "Breakfasts and bakes made from ingredients you can actually name. No maida, no artificial colours, flavours or preservatives. Ever.",
    points: ["Zero maida", "No refined sugar", "No synthetic isolates"],
    cta: { label: "Shop real food", href: "#products" },
    stat: { value: "100%", label: "real food" },
    tone: "bg-ink text-[#F5F1E8]",
  },
  {
    eyebrow: "NUTRUMMY is",
    title: "Lupin powered.",
    text: "Sweet Lupin is an ancient golden legume with about 3× the protein of quinoa and an ultra-low glycemic index, for steady energy instead of a sugar crash.",
    points: ["Complete amino acids", "22g fibre / 100g", "Ultra-low GI"],
    cta: { label: "See the nutrition", href: "#compare" },
    stat: { value: "35g", label: "protein per 100g" },
    tone: "bg-tangerine text-ink",
  },
];

const Values = () => (
  <div className='space-y-6'>
    {blocks.map((b, i) => (
      <motion.div
        key={b.title}
        variants={fadeIn(i % 2 ? "left" : "right", "spring", 0.1, 0.8)}
        className={`grid md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-ink shadow-pop-lg ${i % 2 ? "md:[direction:rtl]" : ""}`}
      >
        <div className={`${b.tone} p-10 sm:p-14 flex flex-col justify-center items-start [direction:ltr]`}>
          <p className='font-display font-extrabold text-[88px] sm:text-[112px] leading-none tracking-[-0.04em]'>{b.stat.value}</p>
          <p className='mt-2 text-[14px] font-bold uppercase tracking-[0.2em] opacity-90'>{b.stat.label}</p>
        </div>
        <div className='bg-tertiary p-10 sm:p-14 [direction:ltr]'>
          <p className={styles.sectionSubText}>{b.eyebrow}</p>
          <h3 className={`${styles.sectionHeadText} mt-2`}>{b.title}</h3>
          <p className={`${styles.body} mt-4`}>{b.text}</p>
          <ul className='mt-5 space-y-2'>
            {b.points.map((p) => (
              <li key={p} className='flex items-center gap-2.5 text-cream text-[15px] font-medium'>
                <Icon name='check' className='w-4 h-4 text-gold' strokeWidth={2.5} /> {p}
              </li>
            ))}
          </ul>
          <a
            href={b.cta.href}
            className='mt-8 inline-flex items-center gap-2 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn text-[13px] font-bold uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
          >
            {b.cta.label} <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
          </a>
        </div>
      </motion.div>
    ))}
  </div>
);

export default SectionWrapper(Values, "values");
