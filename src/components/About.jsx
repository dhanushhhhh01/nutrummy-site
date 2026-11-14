import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { benefits } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

const BenefitCard = ({ index, title, icon, text }) => (
  <Tilt options={{ max: 12, scale: 1, speed: 450 }} className='w-full h-full'>
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className={`${styles.card} relative overflow-hidden p-7 h-full min-h-[240px] flex flex-col justify-between`}
    >
      <div className='absolute top-0 left-7 right-7 h-[2px] bg-gold/70' />
      <div className='w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold'>
        <Icon name={icon} className='w-6 h-6' />
      </div>
      <div className='mt-8'>
        <h3 className='font-display text-cream text-[22px] font-semibold leading-tight'>{title}</h3>
        <p className='mt-2.5 text-secondary text-[14px] leading-[22px]'>{text}</p>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => (
  <>
    <div className='grid lg:grid-cols-[1fr_1.1fr] gap-x-16 gap-y-6 items-end'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Our story</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Clean nutrition. <span className='text-gold'>Zero gimmicks.</span>
        </h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className={styles.body}>
        Healthy food got complicated: long labels, long words, long lists of "why is that in
        there?" We replaced empty wheat flour and excess sugar with{" "}
        <span className='text-cream'>Sweet Lupin</span>, an ancient golden legume with 3× more
        protein than oats and 2× more fibre than quinoa.
      </motion.p>
    </div>

    <div className='mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
      {benefits.map((b, index) => (
        <BenefitCard key={b.title} index={index} {...b} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "story");
