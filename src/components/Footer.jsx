import React from "react";

import { styles } from "../styles";
import { navLinks, contactInfo } from "../constants";

// Navy footer: explicit light text colours because theme tokens assume a light page.
const Footer = () => (
  <footer className='bg-ink text-[#F5F1E8]'>
    <div className={`max-w-7xl mx-auto ${styles.paddingX} py-14`}>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-10'>
        <div className='max-w-md'>
          <p className='font-display font-semibold text-[40px] sm:text-[52px] leading-[1]'>
            Eat <span className='text-lupin'>real</span> food.
          </p>
          <p className='mt-4 text-[#C9CFDB] text-[15px] leading-[26px]'>
            No shortcuts. No synthetic isolates. Just ancient Sweet Lupin, golden multigrains and
            honest farming you can feel good about every morning.
          </p>
        </div>
        <ul className='flex flex-wrap gap-x-8 gap-y-3'>
          {navLinks.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className='text-[#C9CFDB] hover:text-lupin text-[14px]'>
                {n.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-12 pt-6 border-t border-[#F5F1E8]/15 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-[#C9CFDB]'>
        <p>
          © {new Date().getFullYear()} {contactInfo.company} · NUTRUMMY
        </p>
        <a href={`mailto:${contactInfo.email}`} className='hover:text-lupin'>
          {contactInfo.email}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
