import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { story } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

const PillarCard = ({ index, label, title, text, icon }) => (
  <Tilt options={{ max: 10, scale: 1, speed: 450 }} className='w-full h-full'>
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className={`${styles.card} relative overflow-hidden p-8 h-full flex flex-col`}
    >
      <div className='absolute top-0 left-8 right-8 h-[3px] bg-lupin' />
      <div className='flex items-center gap-3'>
        <div className='w-11 h-11 rounded-xl bg-lupin/20 flex items-center justify-center text-gold'>
          <Icon name={icon} className='w-5 h-5' />
        </div>
        <p className='text-gold text-[12px] font-bold uppercase tracking-[0.2em]'>{label}</p>
      </div>
      <h3 className='mt-6 font-display text-cream text-[22px] font-extrabold leading-tight'>{title}</h3>
      <p className='mt-3 text-secondary text-[15px] leading-[24px]'>{text}</p>
    </motion.div>
  </Tilt>
);

const About = () => (
  <>
    <div className='grid lg:grid-cols-[1fr_1.15fr] gap-x-16 gap-y-6 items-start'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Our story</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Healthy food got complicated. <span className='text-gold'>We made it simple.</span>
        </h2>
      </motion.div>
      <motion.div variants={fadeIn("", "", 0.1, 1)} className='space-y-4'>
        {story.paragraphs.map((p, i) => (
          <p key={i} className={`${styles.body} ${i === story.paragraphs.length - 1 ? "text-cream font-semibold" : ""}`}>
            {p}
          </p>
        ))}
      </motion.div>
    </div>

    <div className='mt-14 grid md:grid-cols-3 gap-5'>
      {story.pillars.map((p, index) => (
        <PillarCard key={p.label} index={index} {...p} />
      ))}
    </div>

    <motion.p
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className='mt-12 text-center font-display font-extrabold text-cream text-[26px] sm:text-[34px] tracking-[-0.02em]'
    >
      {story.signoff.split(". ").map((w, i, arr) => (
        <span key={w} className={i === arr.length - 1 ? "text-gold" : ""}>
          {w}
          {i < arr.length - 1 ? ". " : ""}
        </span>
      ))}
    </motion.p>
  </>
);

export default SectionWrapper(About, "story");
