import React from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";

const Footer = () => (
  <footer className='border-t border-white/5 bg-black-200'>
    <div className={`max-w-7xl mx-auto ${styles.paddingX} py-14`}>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-10'>
        <div className='max-w-md'>
          <p className='font-display text-cream font-semibold text-[40px] sm:text-[52px] leading-[1]'>
            Eat <span className='text-gold'>real</span> food.
          </p>
          <p className='mt-4 text-secondary text-[15px] leading-[26px]'>
            No shortcuts. No synthetic isolates. Just ancient Sweet Lupin, golden multigrains and
            honest farming you can feel good about every morning.
          </p>
        </div>
        <ul className='flex flex-wrap gap-x-8 gap-y-3'>
          {navLinks.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className='text-secondary hover:text-gold text-[14px]'>
                {n.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-secondary'>
        <p>© {new Date().getFullYear()} Lupi Foods Pvt Ltd · NUTRUMMY</p>
        <p>"Good food should be simple, honest, and delicious."</p>
      </div>
    </div>
  </footer>
);

export default Footer;
