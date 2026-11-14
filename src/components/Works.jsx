import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { products } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ProductArt from "./ProductArt";
import Icon from "./Icon";

const ProductCard = ({ index, name, short, category, badge, tagline, description, protein, price, packs, body, accent, tags }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)} className='h-full'>
    <Tilt options={{ max: 10, scale: 1.01, speed: 450 }} className={`${styles.card} p-4 h-full flex flex-col`}>
      <div
        className='relative w-full h-[230px] rounded-xl overflow-hidden flex items-center justify-center'
        style={{ background: `radial-gradient(circle at 50% 45%, ${body} 0%, #140b06 78%)` }}
      >
        <ProductArt id={index} short={short} protein={protein} body={body} accent={accent} />
        <span className='absolute top-3 left-3 bg-cream text-primary text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full'>
          {badge}
        </span>
      </div>

      <div className='mt-5 px-1 flex-1'>
        <p className='text-gold text-[12px] uppercase tracking-[0.18em] font-semibold'>{category}</p>
        <h3 className='font-display text-cream font-semibold text-[21px] leading-tight mt-1.5'>{name}</h3>
        <p className='text-cream/80 text-[14px] mt-1'>{tagline}</p>
        <p className='mt-3 text-secondary text-[14px] leading-[22px]'>{description}</p>
        <ul className='mt-4 flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <li key={tag} className='text-[12px] text-cream bg-white/[0.05] border border-white/10 rounded-md px-2 py-0.5'>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-5 pt-4 px-1 border-t border-white/10 flex items-end justify-between'>
        <div>
          <p className='font-display text-cream font-semibold text-[24px] leading-none'>{price}</p>
          <p className='text-secondary text-[12px] mt-1.5'>{packs}</p>
        </div>
        <a
          href='#contact'
          aria-label={`Enquire about ${name}`}
          className='inline-flex items-center gap-1.5 text-gold text-[14px] font-semibold hover:text-cream transition-colors'
        >
          Enquire <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
        </a>
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => (
  <>
    <div className='grid lg:grid-cols-[1fr_1.1fr] gap-x-16 gap-y-6 items-end'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Product range</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          A high-protein <span className='text-gold'>pantry.</span>
        </h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className={styles.body}>
        Four core categories crafted with Sweet Lupin, clean multigrains and honest nutrition. Up
        to 35g of protein per 100g, with no maida and no sugar crash.
      </motion.p>
    </div>

    <div className='mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
      {products.map((p, index) => (
        <ProductCard key={p.name} index={index} {...p} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, "products");
