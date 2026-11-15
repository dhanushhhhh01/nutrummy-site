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
import { styles } from "../styles";

const JournalTeaser = () => (
  <section className={`${styles.padding} max-w-7xl mx-auto`}>
    <div className='flex flex-wrap items-end justify-between gap-4'>
      <div>
        <p className={styles.sectionSubText}>The NUTRUMMY journal</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          Food innovation & <span className='text-gold'>everyday nutrition.</span>
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
    <About />
    <Works />
    <Values />
    <Reviews />
    <Experience />
    <Tech />
    <Compare />
    <Recipes />
    <JournalTeaser />
    <Partners />
    <div className='relative z-0'>
      <Contact />
      <GrainsCanvas />
    </div>
  </>
);

export default Home;
