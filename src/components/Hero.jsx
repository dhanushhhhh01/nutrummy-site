import { motion } from "framer-motion";

import { styles } from "../styles";
import { claims, heroStats } from "../constants";
import { BowlCanvas } from "./canvas";
import Icon from "./Icon";

const Hero = () => {
  return (
    <section className='relative w-full min-h-[100svh] lg:h-screen mx-auto overflow-hidden'>
      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} pt-[140px] lg:pt-[170px] flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className='hidden sm:flex flex-col justify-center items-center mt-3'>
          <div className='w-3.5 h-3.5 rounded-full bg-gold' />
          <div className='w-[2px] sm:h-80 h-40 gold-gradient rotate-180' />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='lg:max-w-[540px] pointer-events-auto'
        >
          <div className='inline-flex items-center gap-2 text-[13px] text-cream bg-ink/[0.04] border border-ink/10 rounded-full pl-2 pr-4 py-1.5 mb-7'>
            <span className='flex text-lupin'>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name='star' filled className='w-3.5 h-3.5' strokeWidth={0} />
              ))}
            </span>
            <span className='font-medium'>4.9 / 5</span>
            <span className='text-secondary'>· 1,200+ bowls loved</span>
          </div>

          <h1 className={styles.heroHeadText}>
            Make your <span className='text-gold'>mornings</span> matter.
          </h1>

          <p className={`${styles.heroSubText} mt-6 max-w-[480px]`}>
            High-protein breakfasts and bakes made with ancient{" "}
            <span className='text-cream font-medium'>Sweet Lupin</span>. 35g plant protein,
            prebiotic fibre, 0g refined sugar and zero maida.
          </p>

          <div className='mt-9 flex flex-wrap gap-3'>
            <a
              href='#products'
              className='inline-flex items-center gap-2 bg-lupin text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
            >
              Explore products <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
            </a>
            <a
              href='#partners'
              className='border border-cream/25 text-cream font-medium px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-colors'
            >
              Partner with us
            </a>
          </div>

          <dl className='mt-12 hidden xs:grid grid-cols-3 gap-6 max-w-[480px] border-t border-ink/10 pt-6 [@media(max-height:780px)]:hidden'>
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className='sr-only'>{s.label}</dt>
                <dd className='font-display text-[30px] font-bold text-cream leading-none'>{s.value}</dd>
                <dd className='text-[12px] text-secondary mt-2 leading-snug'>{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* 3D bowl scene: below the copy on phones, beside it on desktop */}
      <div className='relative w-full h-[340px] sm:h-[420px] mb-14 lg:mb-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] lg:h-full'>
        <BowlCanvas />
      </div>

      {/* Claims strip */}
      <div className='absolute bottom-0 inset-x-0 bg-ink py-3.5 overflow-hidden'>
        <div className='marquee'>
          {[...claims, ...claims, ...claims, ...claims].map((c, i) => (
            <span key={i} className='flex items-center text-[12px] font-semibold uppercase tracking-[0.18em] text-primary whitespace-nowrap'>
              <span className='w-1.5 h-1.5 rounded-full bg-lupin mx-7' />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
