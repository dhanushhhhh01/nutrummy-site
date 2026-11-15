import React from "react";
import { Link } from "react-router-dom";

import {
  About,
  Compare,
  Contact,
  Experience,
  Hero,
  Tech,
  Works,
  Recipes,
  Partners,
  Values,
  Reviews,
  GrainsCanvas,
} from "../components";
import BlogCards from "../components/BlogCards";
import Calculator from "../components/Calculator";
import Band from "../components/Band";
import { styles } from "../styles";

const JournalTeaser = () => (
  <section className={`${styles.padding} max-w-7xl mx-auto`}>
    <div className='flex flex-wrap items-end justify-between gap-4'>
      <div>
        <p className={styles.sectionSubText}>The NUTRUMMY journal</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Food innovation & <span className='marker'>everyday nutrition.</span>
        </h2>
      </div>
      <Link to='/blog' className='text-gold font-bold text-[14px] hover:underline'>
        All articles →
      </Link>
    </div>
    <div className='mt-10'>
      <BlogCards />
    </div>
  </section>
);

const Home = () => (
  <>
    <div className='hero-glow grain relative'>
      <Hero />
    </div>
    <Band color='#FFF1C2'>
      <About />
    </Band>
    <div className='relative'>
      <Band color='#FF8A3D' innerClassName='fire-band'>
        <Works />
      </Band>
    </div>
    <Band color='#DCEEFF'>
      <Values />
    </Band>
    <Band color='#ECE5FF'>
      <Reviews />
    </Band>
    <Experience />
    <Band color='#D9F2D6'>
      <Tech />
    </Band>
    <Compare />
    <Band color='#FFE0CC'>
      <Calculator />
    </Band>
    <Recipes />
    <Band color='#FFF1C2'>
      <JournalTeaser />
    </Band>
    <Band color='#DCEEFF'>
      <Partners />
    </Band>
    <div className='relative z-0'>
      <Contact />
      <GrainsCanvas />
    </div>
  </>
);

export default Home;
