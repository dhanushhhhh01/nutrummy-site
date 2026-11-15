import React from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks, contactInfo } from "../constants";

// Navy footer: explicit light text colours because theme tokens assume a light page.
const Footer = () => (
  <footer className='bg-ink text-[#FFF3E6]'>
    <div className={`max-w-7xl mx-auto ${styles.paddingX} py-14`}>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-10'>
        <div className='max-w-md'>
          <p className='font-display font-extrabold text-[40px] sm:text-[52px] leading-[1] tracking-[-0.03em]'>
            Simple. Honest. <span className='text-lupin'>Yum.</span>
          </p>
          <p className='mt-4 text-[#E3D3E8] text-[15px] leading-[26px]'>
            No shortcuts. No synthetic isolates. Just ancient Sweet Lupin, golden multigrains and
            honest farming you can feel good about every morning.
          </p>
        </div>
        <ul className='flex flex-wrap gap-x-8 gap-y-3'>
          {navLinks.map((n) => (
            <li key={n.title}>
              <Link
                to={n.hash ? { pathname: n.to, hash: `#${n.hash}` } : n.to}
                className='text-[#E3D3E8] hover:text-lupin text-[14px]'
              >
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-12 pt-6 border-t border-[#FFF3E6]/15 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-[#E3D3E8]'>
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
