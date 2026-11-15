import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { reviews, contactInfo } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

// "Straight from Happy Tummies". Shows real reviews from constants; until there are some,
// it invites customers to share theirs instead of showing placeholder testimonials.
const ReviewCard = ({ index, name, city, product, text }) => (
  <motion.figure variants={fadeIn("up", "spring", index * 0.15, 0.75)} className={`${styles.card} p-7 flex flex-col`}>
    <div className='flex text-lupin' aria-hidden>
      {[...Array(5)].map((_, i) => (
        <Icon key={i} name='star' filled strokeWidth={0} className='w-4 h-4' />
      ))}
    </div>
    <blockquote className='mt-4 text-cream text-[15px] leading-[25px] flex-1'>{text}</blockquote>
    <figcaption className='mt-5 pt-4 border-t border-ink/10 text-[13px]'>
      <span className='font-bold text-cream'>{name}</span>
      {city && <span className='text-secondary'> · {city}</span>}
      {product && <p className='text-gold font-semibold mt-0.5'>{product}</p>}
    </figcaption>
  </motion.figure>
);

const Reviews = () => (
  <>
    <motion.div variants={textVariant()} className='text-center'>
      <p className={styles.sectionSubText}>Straight from happy tummies</p>
      <h2 className={`${styles.sectionHeadText} mt-3`}>
        Tried, tasted, <span className='text-gold'>trusted.</span>
      </h2>
      <p className={`${styles.body} mt-3`}>What our customers say. Every review unedited, in their own words.</p>
    </motion.div>

    {reviews.length > 0 ? (
      <div className='mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {reviews.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} index={i} {...r} />
        ))}
      </div>
    ) : (
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className={`${styles.card} mt-12 max-w-2xl mx-auto p-10 text-center`}
      >
        <div className='mx-auto w-14 h-14 rounded-full bg-lupin/20 text-gold flex items-center justify-center'>
          <Icon name='chat' className='w-6 h-6' />
        </div>
        <p className='mt-5 font-display text-cream text-[22px] font-extrabold'>Tried NUTRUMMY? Tell us how it went.</p>
        <p className='mt-2 text-secondary text-[15px] leading-[24px]'>
          We're collecting our first customer reviews. Share yours and it may appear here, word for word.
        </p>
        <a
          href={`mailto:${contactInfo.email}?subject=${encodeURIComponent("My NUTRUMMY review")}`}
          className='mt-6 inline-flex items-center gap-2 bg-lupin text-ink text-[13px] font-bold uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
        >
          Share your review <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
        </a>
      </motion.div>
    )}
  </>
);

export default SectionWrapper(Reviews, "reviews");
