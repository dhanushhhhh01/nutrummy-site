import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { partners } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

// Lets a partner card pre-select the enquiry topic in the contact form.
const selectTopic = (topic) => {
  window.dispatchEvent(new CustomEvent("nutrummy:topic", { detail: topic }));
};

const Partners = () => (
  <>
    <div className='grid lg:grid-cols-[1fr_1.1fr] gap-x-16 gap-y-6 items-end'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>For business</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Partner with <span className='text-gold'>NUTRUMMY.</span>
        </h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className={styles.body}>
        From neighbourhood stores to corporate pantries, we supply clean, high-protein breakfasts
        at scale, with dedicated support from first order to repeat delivery.
      </motion.p>
    </div>

    <div className='mt-12 grid md:grid-cols-3 gap-5'>
      {partners.map((p, i) => (
        <motion.div
          key={p.title}
          variants={fadeIn("up", "spring", i * 0.2, 0.75)}
          className={`${styles.card} p-7 flex flex-col group hover:border-gold/40 transition-colors`}
        >
          <div className='w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold'>
            <Icon name={p.icon} />
          </div>
          <h3 className='mt-6 font-display text-cream text-[22px] font-semibold'>{p.title}</h3>
          <p className='mt-2.5 text-secondary text-[14px] leading-[22px] flex-1'>{p.text}</p>
          <a
            href='#contact'
            onClick={() => selectTopic(p.topic)}
            className='mt-6 inline-flex items-center gap-1.5 text-gold text-[14px] font-semibold group-hover:gap-2.5 transition-all'
          >
            {p.cta} <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
          </a>
        </motion.div>
      ))}
    </div>
  </>
);

export default SectionWrapper(Partners, "partners");
