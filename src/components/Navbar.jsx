import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks, FREE_SHIPPING_AT } from "../constants";
import { useCart } from "../context/CartContext";
import Icon from "./Icon";

const CartButton = () => {
  const { count, open, lastAdded } = useCart();
  return (
    <button
      type='button'
      onClick={open}
      aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`}
      className='relative w-11 h-11 rounded-full bg-tertiary border border-ink/10 shadow-card flex items-center justify-center text-cream hover:text-gold transition-colors'
    >
      <Icon name='cart' className='w-5 h-5' />
      {count > 0 && (
        <motion.span
          key={lastAdded?.at || "badge"}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className='absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-lupin text-ink text-[11px] font-bold flex items-center justify-center'
        >
          {count}
        </motion.span>
      )}
    </button>
  );
};

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
    <header className='fixed top-0 inset-x-0 z-30'>
    <p className='bg-ink text-[#F5F1E8] text-center text-[12px] sm:text-[13px] font-semibold tracking-wide py-2 px-4'>
      Free shipping over ₹{FREE_SHIPPING_AT} · Use code <span className='text-lupin font-bold'>SEVEN15</span> for 15% off
    </p>
    <nav
      className={`${styles.paddingX} w-full flex items-center py-3.5 transition-colors duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto gap-4'>
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
            <p className='font-display text-cream text-[21px] font-extrabold tracking-tight'>NUTRUMMY</p>
            <p className='text-gold text-[10px] font-bold tracking-[0.25em] mt-1'>LUPIN SUPERFOOD</p>
          </div>
        </Link>

        <ul className='list-none hidden lg:flex flex-row items-center gap-8'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-cream" : "text-secondary"
              } hover:text-cream text-[15px] font-semibold cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-3'>
          <a
            href='#products'
            className='hidden sm:inline-flex bg-lupin text-ink text-[14px] font-semibold px-5 py-2.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
          >
            Shop now
          </a>
          <CartButton />
          <div className='lg:hidden relative'>
            <button
              type='button'
              aria-label={toggle ? "Close menu" : "Open menu"}
              aria-expanded={toggle}
              onClick={() => setToggle(!toggle)}
              className='w-11 h-11 flex items-center justify-center text-cream'
            >
              <Icon name={toggle ? "close" : "menu"} className='w-6 h-6' />
            </button>

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-tertiary border border-ink/10 absolute top-14 right-0 min-w-[200px] z-10 rounded-2xl shadow-card`}
            >
              <ul className='list-none flex items-start flex-1 flex-col gap-4'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-semibold cursor-pointer text-[16px] ${
                      active === nav.title ? "text-gold" : "text-cream"
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
      </div>
    </nav>
    </header>
  );
};

export default Navbar;
