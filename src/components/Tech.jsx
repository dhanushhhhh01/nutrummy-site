import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { ingredients } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => (
  <>
    <motion.div variants={textVariant()} className='text-center'>
      <p className={styles.sectionSubText}>Honest sourcing</p>
      <h2 className={`${styles.sectionHeadText} mt-3`}>
        Every ingredient <span className='text-gold'>earns its place.</span>
      </h2>
      <p className={`${styles.body} mt-4 max-w-2xl mx-auto`}>
        Six ingredients, no fillers, no hidden sugars, no synthetic isolates. Drag a sphere to
        turn it.
      </p>
    </motion.div>

    <div className='mt-14 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 justify-items-center gap-x-4 gap-y-10'>
      {ingredients.map((ing, i) => (
        <motion.div
          key={ing.name}
          variants={fadeIn("up", "spring", i * 0.12, 0.75)}
          className='flex flex-col items-center w-32'
        >
          <div className='w-28 h-28'>
            <BallCanvas symbol={ing.symbol} stat={ing.stat} color={ing.color} />
          </div>
          <p className='mt-3 text-center text-cream text-[14px] font-medium leading-tight'>{ing.name}</p>
          <p className='text-center text-secondary text-[12px] mt-1'>{ing.stat}</p>
        </motion.div>
      ))}
    </div>
  </>
);

export default SectionWrapper(Tech, "ingredients");
