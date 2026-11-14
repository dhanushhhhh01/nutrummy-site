import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-3'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src='/logo.svg' alt='' className='w-10 h-10' />
          <div className='leading-none'>
            <p className='font-display text-cream text-[22px] font-bold tracking-tight'>NUTRUMMY</p>
            <p className='text-gold text-[10px] font-semibold tracking-[0.25em] mt-1'>LUPIN SUPERFOOD</p>
          </div>
        </Link>

        <ul className='list-none hidden md:flex flex-row items-center gap-9'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-cream" : "text-secondary"
              } hover:text-cream text-[15px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li>
            <a
              href='#products'
              className='bg-gold text-primary text-[14px] font-semibold px-5 py-2.5 rounded-full hover:bg-cream transition-colors'
            >
              Shop now
            </a>
          </li>
        </ul>

        <div className='md:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={toggle ? "Close menu" : "Open menu"}
            onClick={() => setToggle(!toggle)}
            className='p-1'
          >
            <img src={toggle ? close : menu} alt='' className='w-[26px] h-[26px] object-contain' />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-tertiary border border-gold/20 absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-2xl shadow-card`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-cream" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
