import React from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks, contactInfo } from "../constants";

// Navy footer: explicit light text colours because theme tokens assume a light page.
const Footer = () => (
  <footer className='bg-ink text-[#F5F1E8]'>
    <div className='relative h-[140px] sm:h-[200px] overflow-hidden'>
      <img
        src={`${import.meta.env.BASE_URL}images/farm-banner.jpg`}
        alt='Fields where our grains and lupin are grown'
        loading='lazy'
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#003B4A]' />
    </div>
    <div className={`max-w-7xl mx-auto ${styles.paddingX} py-14`}>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-10'>
        <div className='max-w-md'>
          <p className='font-display font-extrabold text-[40px] sm:text-[52px] leading-[1] tracking-[-0.03em]'>
            Simple. Honest. <span className='text-mango'>Yum.</span>
          </p>
          <p className='mt-4 text-[#C9DDE2] text-[15px] leading-[26px]'>
            No shortcuts. No synthetic isolates. Just ancient Sweet Lupin, golden multigrains and
            honest farming you can feel good about every morning.
          </p>
        </div>
        <ul className='flex flex-wrap gap-x-8 gap-y-3'>
          {navLinks.map((n) => (
            <li key={n.title}>
              <Link
                to={n.hash ? { pathname: n.to, hash: `#${n.hash}` } : n.to}
                className='text-[#C9DDE2] hover:text-mango text-[14px]'
              >
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-12 pt-6 border-t border-[#F5F1E8]/15 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-[#C9DDE2]'>
        <p>
          © {new Date().getFullYear()} {contactInfo.company} · NUTRUMMY
        </p>
        <a href={`mailto:${contactInfo.email}`} className='hover:text-mango'>
          {contactInfo.email}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
