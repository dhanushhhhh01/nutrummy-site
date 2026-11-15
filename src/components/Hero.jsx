import { motion } from "framer-motion";

import { styles } from "../styles";
import { claims } from "../constants";
import BreakfastPicker from "./BreakfastPicker";
import { BowlCanvas } from "./canvas";
import Icon from "./Icon";

const Hero = () => {
  return (
    <section className='relative w-full min-h-[100svh] mx-auto overflow-hidden lg:pb-32'>
      {/* Breakfast-table photo from the reference site, faded on the text side for readability */}
      <img
        src={`${import.meta.env.BASE_URL}images/hero-table.jpg`}
        alt=''
        fetchpriority='high'
        className='hidden lg:block absolute inset-0 w-full h-full object-cover object-[100%_center]'
      />
      <div className='hidden lg:block absolute inset-0 lg:bg-[linear-gradient(90deg,#F5F1E8_0%,#F5F1E8_40%,rgba(245,241,232,0.7)_52%,rgba(245,241,232,0)_70%)]' />

      {/* Colour blobs */}
      <div className='blob w-[420px] h-[420px] bg-sun -top-20 -left-24 opacity-40' />
      <div className='blob w-[300px] h-[300px] bg-tangerine bottom-10 left-[30%] opacity-25' />

      {/* Stickers */}
      <div className='hidden lg:block absolute z-10 right-[6%] top-[150px] pointer-events-none'>
        <div className='sticker wobble bg-sun text-ink w-[118px] h-[118px]'>
          <span className='text-[34px]'>35g</span>
          <span className='text-[11px] tracking-wider mt-1'>PROTEIN</span>
        </div>
      </div>
      <div className='hidden lg:block absolute z-10 right-[44%] bottom-[150px] pointer-events-none'>
        <div className='sticker bg-leaf text-ink w-[104px] h-[104px] rotate-[10deg]'>
          <span className='text-[15px]'>ZERO</span>
          <span className='text-[20px] mt-0.5'>MAIDA</span>
        </div>
      </div>
      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} pt-[140px] lg:pt-[150px] flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className='hidden sm:flex flex-col justify-center items-center mt-3'>
          <div className='w-3.5 h-3.5 rounded-full bg-gold' />
          <div className='w-[2px] sm:h-80 h-40 gold-gradient rotate-180' />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='min-w-0 flex-1 lg:flex-none lg:max-w-[540px] pointer-events-auto'
        >
          <div className='inline-flex items-center gap-2 text-[13px] text-cream bg-tertiary border-2 border-ink shadow-pop-sm rounded-full pl-2 pr-4 py-1.5 mb-7'>
            <span className='flex text-mango'>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name='star' filled className='w-3.5 h-3.5' strokeWidth={0} />
              ))}
            </span>
            <span className='font-medium'>4.9 / 5</span>
            <span className='text-secondary'>· 1,200+ bowls loved</span>
          </div>

          <h1 className={styles.heroHeadText}>
            Make your <span className='marker'>mornings</span> matter.
          </h1>

          <p className={`${styles.heroSubText} mt-6 max-w-[480px]`}>
            High-protein breakfasts and bakes made with ancient{" "}
            <span className='text-cream font-medium'>Sweet Lupin</span>. 35g plant protein,
            prebiotic fibre, 0g refined sugar and zero maida.
          </p>

          <div className='mt-9 flex flex-wrap gap-3'>
            <a
              href='#products'
              className='inline-flex items-center gap-2 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold px-7 py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
            >
              Explore products <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
            </a>
            <a
              href='#partners'
              className='bg-tertiary border-2 border-ink shadow-pop-sm pop-btn text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-sky'
            >
              Partner with us
            </a>
          </div>

          <BreakfastPicker />
        </motion.div>
      </div>

      {/* 3D bowl scene: below the copy on phones, beside it on desktop */}
      <div className='relative mx-6 sm:mx-16 h-[260px] sm:h-[420px] mt-10 mb-36 rounded-3xl overflow-hidden border-2 border-ink shadow-pop lg:m-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] lg:h-full lg:rounded-none lg:border-0 lg:shadow-none lg:overflow-visible'>
        {/* Phones: the photo at natural proportions in a framed card */}
        <img
          src={`${import.meta.env.BASE_URL}images/hero-table.jpg`}
          alt='A bowl of NUTRUMMY cereal with milk being poured, fresh berries and a cereal pack on a breakfast table'
          className='lg:hidden absolute inset-0 w-full h-full object-cover'
        />
        <BowlCanvas particlesOnly />
      </div>

      {/* Tilted two-colour claims marquee */}
      <div className='absolute bottom-6 inset-x-[-4%] -rotate-[1.5deg] pointer-events-none'>
        <div className='bg-ink border-y-2 border-ink py-3 overflow-hidden'>
          <div className='marquee'>
            {[...claims, ...claims, ...claims, ...claims].map((c, i) => (
              <span key={i} className='flex items-center text-[13px] font-extrabold uppercase tracking-[0.16em] text-sun whitespace-nowrap'>
                <span className='mx-6 text-[16px]' aria-hidden>✦</span>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className='bg-sun border-y-2 border-ink py-2 overflow-hidden rotate-[3deg] -mt-1'>
          <div className='marquee marquee-reverse'>
            {[...claims, ...claims, ...claims, ...claims].map((c, i) => (
              <span key={i} className='flex items-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-ink whitespace-nowrap'>
                <span className='mx-6' aria-hidden>●</span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
