import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks, products, FREE_SHIPPING_AT } from "../constants";
import { useCart } from "../context/CartContext";
import { LoginDialog, SearchDialog, TrackDialog } from "./HeaderDialogs";
import Icon from "./Icon";

const linkTo = (item) => (item.hash ? { pathname: item.to, hash: `#${item.hash}` } : item.to);

const iconBtn =
  "relative w-10 h-10 rounded-full flex items-center justify-center text-cream hover:text-gold hover:bg-ink/[0.05] transition-colors";

const CartButton = () => {
  const { count, open, lastAdded } = useCart();
  return (
    <button type='button' onClick={open} aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`} className={iconBtn}>
      <Icon name='cart' className='w-5 h-5' />
      {count > 0 && (
        <motion.span
          key={lastAdded?.at || "badge"}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className='absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn text-[10px] font-bold flex items-center justify-center'
        >
          {count}
        </motion.span>
      )}
    </button>
  );
};

const ShopMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);
  return (
    <li ref={ref} className='relative' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='true'
        onClick={() => setOpen((o) => !o)}
        className='flex items-center gap-1 text-[14px] font-semibold text-secondary hover:text-cream'
      >
        Shop <Icon name='chevron' className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.25} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className='absolute left-0 top-full pt-3 z-20'
          >
            <ul className='w-[260px] bg-tertiary border border-ink/10 rounded-2xl shadow-pop p-2'>
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    to={{ pathname: "/", hash: `#product-${p.id}` }}
                    onClick={() => setOpen(false)}
                    className='flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-primary'
                  >
                    <span className='text-[14px] font-semibold text-cream'>{p.name.replace("LupiCrunch ", "")}</span>
                    <span className='text-[12px] text-secondary'>{p.protein}</span>
                  </Link>
                </li>
              ))}
              <li className='border-t border-ink/10 mt-1 pt-1'>
                <Link
                  to={{ pathname: "/", hash: "#products" }}
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[14px] font-bold text-gold hover:bg-primary'
                >
                  Shop all <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dialog, setDialog] = useState(null); // "search" | "login" | "track" | null
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (item) =>
    item.hash ? location.pathname === "/" && location.hash === `#${item.hash}` : location.pathname === item.to && !location.hash;

  return (
    <>
      <header className='fixed top-0 inset-x-0 z-30'>
        <p className='bg-ink text-[#F5F1E8] text-center text-[12px] sm:text-[13px] font-semibold tracking-wide py-2 px-4'>
          Free shipping over ₹{FREE_SHIPPING_AT} · Use code <span className='text-mango font-bold'>SEVEN15</span> for 15% off
        </p>
        <nav
          className={`${styles.paddingX} py-3 transition-colors duration-300 ${
            scrolled || location.pathname !== "/" ? "bg-primary/95 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
          }`}
        >
          {/* Three columns: links | centred logo | icons */}
          <div className='max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
            <div className='flex items-center'>
              <button
                type='button'
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className={`${iconBtn} xl:hidden -ml-2`}
              >
                <Icon name={menuOpen ? "close" : "menu"} className='w-6 h-6' />
              </button>
              <ul className='hidden xl:flex items-center gap-6'>
                {navLinks.map((item) =>
                  item.children ? (
                    <ShopMenu key={item.title} />
                  ) : (
                    <li key={item.title}>
                      <NavLink
                        to={linkTo(item)}
                        className={`text-[14px] font-semibold transition-colors ${
                          isActive(item) ? "text-cream" : "text-secondary hover:text-cream"
                        }`}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <Link to='/' onClick={() => window.scrollTo(0, 0)} className='flex items-center' aria-label='Nutrummy home'>
              <img
                src={`${import.meta.env.BASE_URL}images/logo.jpg`}
                alt='Nutrummy: Your tummy needs yummy'
                className='h-11 sm:h-14 w-auto mix-blend-multiply'
              />
            </Link>

            <div className='flex items-center justify-end gap-0.5 sm:gap-1'>
              <button type='button' onClick={() => setDialog("search")} aria-label='Search' className={iconBtn}>
                <Icon name='search' className='w-5 h-5' />
              </button>
              <button type='button' onClick={() => setDialog("login")} aria-label='Login' className={`${iconBtn} hidden sm:flex`}>
                <Icon name='user' className='w-5 h-5' />
              </button>
              <button type='button' onClick={() => setDialog("track")} aria-label='Track order' className={`${iconBtn} hidden sm:flex`}>
                <Icon name='package' className='w-5 h-5' />
              </button>
              <CartButton />
            </div>
          </div>

          {/* Mobile / tablet menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className='xl:hidden max-w-7xl mx-auto mt-3 bg-tertiary border border-ink/10 rounded-2xl shadow-pop p-5 max-h-[70vh] overflow-y-auto'
              >
                <ul className='grid gap-1'>
                  {navLinks.map((item) => (
                    <li key={item.title}>
                      <Link to={linkTo(item)} className='block py-2 text-[16px] font-bold text-cream hover:text-gold'>
                        {item.title}
                      </Link>
                      {item.children && (
                        <ul className='ml-3 mb-2 border-l border-ink/10 pl-3 grid gap-1'>
                          {products.map((p) => (
                            <li key={p.id}>
                              <Link to={{ pathname: "/", hash: `#product-${p.id}` }} className='block py-1.5 text-[14px] text-secondary hover:text-gold'>
                                {p.name.replace("LupiCrunch ", "")}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <div className='mt-4 pt-4 border-t border-ink/10 flex gap-2 sm:hidden'>
                  <button type='button' onClick={() => setDialog("login")} className='flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-ink/15 text-cream text-[14px] font-semibold'>
                    <Icon name='user' className='w-4 h-4' /> Login
                  </button>
                  <button type='button' onClick={() => setDialog("track")} className='flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-ink/15 text-cream text-[14px] font-semibold'>
                    <Icon name='package' className='w-4 h-4' /> Track
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <SearchDialog open={dialog === "search"} onClose={() => setDialog(null)} />
      <LoginDialog open={dialog === "login"} onClose={() => setDialog(null)} />
      <TrackDialog open={dialog === "track"} onClose={() => setDialog(null)} />
    </>
  );
};

export default Navbar;
