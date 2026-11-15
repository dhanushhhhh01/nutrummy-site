import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useCart, formatINR } from "../context/CartContext";
import { contactInfo, FREE_SHIPPING_AT } from "../constants";
import Icon from "./Icon";
import ProductImage from "./ProductImage";

const inputClass =
  "w-full bg-tertiary py-3 px-4 placeholder:text-muted text-cream rounded-xl outline-none border border-ink/15 focus:border-gold font-medium text-[14px] transition-colors";

const emptyDetails = { name: "", phone: "", email: "", address: "", pincode: "" };

const QtyStepper = ({ qty, onChange, label }) => (
  <div className='inline-flex items-center rounded-full border border-ink/15 bg-tertiary'>
    <button
      type='button'
      onClick={() => onChange(qty - 1)}
      aria-label={`Decrease ${label}`}
      className='w-8 h-8 flex items-center justify-center text-cream hover:text-gold'
    >
      <Icon name='minus' className='w-4 h-4' strokeWidth={2.25} />
    </button>
    <span className='w-7 text-center text-[14px] font-semibold text-cream' aria-live='polite'>
      {qty}
    </span>
    <button
      type='button'
      onClick={() => onChange(qty + 1)}
      aria-label={`Increase ${label}`}
      className='w-8 h-8 flex items-center justify-center text-cream hover:text-gold'
    >
      <Icon name='plus' className='w-4 h-4' strokeWidth={2.25} />
    </button>
  </div>
);

const buildOrderEmail = ({ items, subtotal, discount, coupon, total }, details) => {
  const lines = items.map((i) => `• ${i.product.name} (${i.pack.label}) × ${i.qty} = ${formatINR(i.lineTotal)}`);
  const body = [
    "New order from the NUTRUMMY website",
    "",
    ...lines,
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    ...(discount ? [`Discount (${coupon}): -${formatINR(discount)}`] : []),
    subtotal >= FREE_SHIPPING_AT ? "Shipping: Free" : "Shipping: to be confirmed",
    `Total: ${formatINR(total)}`,
    "",
    "Deliver to:",
    details.name,
    details.phone,
    details.email,
    details.address,
    `PIN ${details.pincode}`,
  ].join("\n");
  const subject = `Order: ${items.length} item${items.length > 1 ? "s" : ""}, ${formatINR(total)} (${details.name})`;
  return `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const CartDrawer = () => {
  const cart = useCart();
  const { items, count, subtotal, discount, total, coupon, setQty, remove, clear, isOpen, close, applyCoupon, removeCoupon } = cart;
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [step, setStep] = useState("cart"); // cart | details | done
  const [details, setDetails] = useState(emptyDetails);
  const [error, setError] = useState("");
  const panelRef = useRef(null);

  // Escape closes; focus moves into the panel when it opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen && step === "done") setStep("cart");
  }, [isOpen, step]);

  const toFree = Math.max(0, FREE_SHIPPING_AT - subtotal);

  const placeOrder = (e) => {
    e.preventDefault();
    const { name, phone, email, address, pincode } = details;
    if (!name.trim() || !address.trim()) return setError("Please add your name and delivery address.");
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) return setError("Please enter a valid 10-digit mobile number.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
    if (!/^\d{6}$/.test(pincode)) return setError("Please enter a 6-digit PIN code.");
    setError("");
    window.location.href = buildOrderEmail(cart, details);
    clear();
    setDetails(emptyDetails);
    setStep("done");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key='scrim'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className='fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]'
          />
          <motion.aside
            key='panel'
            ref={panelRef}
            tabIndex={-1}
            role='dialog'
            aria-modal='true'
            aria-label='Shopping cart'
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className='fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-primary shadow-2xl flex flex-col outline-none'
          >
            <header className='flex items-center justify-between px-6 py-5 border-b border-ink/10'>
              <div>
                <h2 className='font-display text-cream text-[24px] font-bold'>
                  {step === "details" ? "Delivery details" : "Your Breakfast Cart"}
                </h2>
                {step === "cart" && <p className='text-secondary text-[13px]'>{count} item{count === 1 ? "" : "s"}</p>}
              </div>
              <button type='button' onClick={close} aria-label='Close cart' className='p-2 -mr-2 text-cream hover:text-gold'>
                <Icon name='close' className='w-6 h-6' />
              </button>
            </header>

            {step === "done" && (
              <div className='flex-1 flex flex-col items-center justify-center text-center px-8'>
                <div className='w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center'>
                  <Icon name='check' className='w-7 h-7' strokeWidth={2.5} />
                </div>
                <h3 className='mt-5 font-display text-cream text-[22px] font-bold'>Order ready to send</h3>
                <p className='mt-2 text-secondary text-[14px] leading-[22px]'>
                  Your email app has opened with the order filled in. Send it, and we'll confirm
                  payment and delivery within one working day.
                </p>
                <button type='button' onClick={close} className='mt-6 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold px-6 py-3 rounded-full hover:bg-ink hover:text-primary'>
                  Continue browsing
                </button>
              </div>
            )}

            {step !== "done" && items.length === 0 && (
              <div className='flex-1 flex flex-col items-center justify-center text-center px-8'>
                <Icon name='cart' className='w-12 h-12 text-secondary' />
                <p className='mt-4 text-cream font-semibold'>Your cart is empty</p>
                <p className='mt-1 text-secondary text-[14px]'>Add a high-protein breakfast to get started.</p>
                <Link to={{ pathname: "/", hash: "#products" }} onClick={close} className='mt-6 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold px-6 py-3 rounded-full hover:bg-ink hover:text-primary'>
                  Browse products
                </Link>
              </div>
            )}

            {step === "cart" && items.length > 0 && (
              <>
                <div className='px-6 pt-4'>
                  <p className='text-[13px] text-secondary'>
                    {toFree > 0 ? (
                      <>
                        Add <span className='font-semibold text-cream'>{formatINR(toFree)}</span> more for free shipping
                      </>
                    ) : (
                      <span className='font-semibold text-gold'>You've unlocked free shipping</span>
                    )}
                  </p>
                  <div className='mt-2 h-1.5 rounded-full bg-ink/10 overflow-hidden'>
                    <div
                      className='h-full bg-lupin rounded-full transition-all duration-500'
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)}%` }}
                    />
                  </div>
                </div>

                <ul className='flex-1 overflow-y-auto px-6 py-4 space-y-3'>
                  {items.map((i) => (
                    <li key={i.key} className='bg-tertiary rounded-2xl border border-ink/10 p-4 flex gap-4'>
                      <div className='w-16 h-20 shrink-0 rounded-lg bg-primary flex items-center justify-center overflow-hidden'>
                        <ProductImage product={i.product} size='thumb' className='w-full h-full' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex justify-between gap-2'>
                          <p className='text-cream font-semibold text-[14px] leading-snug'>{i.product.name}</p>
                          <button
                            type='button'
                            onClick={() => remove(i.key)}
                            aria-label={`Remove ${i.product.name}`}
                            className='text-secondary hover:text-gold shrink-0'
                          >
                            <Icon name='trash' className='w-4 h-4' />
                          </button>
                        </div>
                        <p className='text-secondary text-[12px] mt-0.5'>
                          {i.pack.label} · {formatINR(i.pack.price)} each
                        </p>
                        <div className='mt-3 flex items-center justify-between'>
                          <QtyStepper qty={i.qty} onChange={(q) => setQty(i.key, q)} label={i.product.name} />
                          <span className='font-semibold text-cream text-[15px]'>{formatINR(i.lineTotal)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {step === "details" && items.length > 0 && (
              <form id='checkout-form' onSubmit={placeOrder} noValidate className='flex-1 overflow-y-auto px-6 py-5 space-y-4'>
                {[
                  ["name", "Full name", "text", "name"],
                  ["phone", "Mobile number", "tel", "tel"],
                  ["email", "Email", "email", "email"],
                ].map(([key, label, type, auto]) => (
                  <label key={key} className='block'>
                    <span className='text-cream text-[13px] font-medium'>{label}</span>
                    <input
                      type={type}
                      autoComplete={auto}
                      value={details[key]}
                      onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>
                ))}
                <label className='block'>
                  <span className='text-cream text-[13px] font-medium'>Delivery address</span>
                  <textarea
                    rows={3}
                    autoComplete='street-address'
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                    className={`${inputClass} mt-1.5`}
                  />
                </label>
                <label className='block'>
                  <span className='text-cream text-[13px] font-medium'>PIN code</span>
                  <input
                    inputMode='numeric'
                    autoComplete='postal-code'
                    maxLength={6}
                    value={details.pincode}
                    onChange={(e) => setDetails({ ...details, pincode: e.target.value.replace(/\D/g, "") })}
                    className={`${inputClass} mt-1.5`}
                  />
                </label>
                {error && (
                  <p role='alert' className='berry-text text-[13px] font-medium'>
                    {error}
                  </p>
                )}
              </form>
            )}

            {step !== "done" && items.length > 0 && (
              <footer className='border-t border-ink/10 px-6 py-5 bg-tertiary'>
                {step === "cart" && (
                  <div className='mb-4'>
                    {coupon ? (
                      <div className='flex items-center justify-between text-[13px] bg-gold/10 text-gold rounded-xl px-3 py-2.5'>
                        <span className='font-semibold'>
                          {coupon} applied · {Math.round((discount / subtotal) * 100)}% off
                        </span>
                        <button type='button' onClick={removeCoupon} className='underline font-medium'>
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form
                        className='flex gap-2'
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (applyCoupon(code)) {
                            setCode("");
                            setCodeMsg("");
                          } else setCodeMsg("That code isn't valid.");
                        }}
                      >
                        <label className='sr-only' htmlFor='coupon'>Coupon code</label>
                        <input
                          id='coupon'
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder='Coupon code (try SEVEN15)'
                          className={`${inputClass} py-2.5`}
                        />
                        <button type='submit' className='px-4 rounded-xl border border-ink/20 text-cream text-[14px] font-semibold hover:border-gold hover:text-gold'>
                          Apply
                        </button>
                      </form>
                    )}
                    {codeMsg && <p className='berry-text text-[12px] mt-1.5'>{codeMsg}</p>}
                  </div>
                )}
                <div className='flex justify-between text-[14px]'>
                  <span className='text-secondary'>Subtotal</span>
                  <span className='text-cream font-semibold'>{formatINR(subtotal)}</span>
                </div>
                <div className='flex justify-between text-[14px] mt-1'>
                  <span className='text-secondary'>Shipping</span>
                  <span className={toFree === 0 ? "text-gold font-semibold" : "text-cream"}>
                    {toFree === 0 ? "Free" : "Confirmed with your order"}
                  </span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between text-[14px] mt-1'>
                    <span className='text-secondary'>Discount ({coupon})</span>
                    <span className='text-gold font-semibold'>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className='flex justify-between text-[16px] mt-3 pt-3 border-t border-ink/10'>
                  <span className='text-cream font-bold'>Estimated total</span>
                  <span className='text-cream font-bold'>{formatINR(total)}</span>
                </div>
                {step === "cart" ? (
                  <button
                    type='button'
                    onClick={() => setStep("details")}
                    className='mt-4 w-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
                  >
                    Checkout · {formatINR(total)}
                  </button>
                ) : (
                  <div className='mt-4 flex gap-3'>
                    <button
                      type='button'
                      onClick={() => setStep("cart")}
                      className='px-5 py-3.5 rounded-full border border-ink/20 text-cream font-medium hover:border-gold hover:text-gold'
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      form='checkout-form'
                      className='flex-1 bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-semibold py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'
                    >
                      Place order
                    </button>
                  </div>
                )}
                <p className='mt-3 text-[11px] text-secondary text-center'>
                  No payment taken online. We confirm your order, payment and delivery by email.
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
