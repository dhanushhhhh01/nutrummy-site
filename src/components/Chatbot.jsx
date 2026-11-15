import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { products, contactInfo, FREE_SHIPPING_AT, recipes } from "../constants";
import { useCart, formatINR } from "../context/CartContext";
import Icon from "./Icon";
import ProductImage from "./ProductImage";

/*
 * NutriBot: a client-side assistant that answers common questions from the site's own
 * product data. No server or API key needed, so it works on any static host.
 * To upgrade to an LLM later, replace `reply()` with a call to your own backend.
 */

const QUICK = ["Recommend a product", "What is lupin?", "Shipping & offers", "Bulk / corporate orders"];

const byId = (id) => products.find((p) => p.id === id);
const has = (text, words) => words.some((w) => text.includes(w));

const reply = (raw) => {
  const q = raw.toLowerCase();

  if (has(q, ["hi", "hello", "hey", "namaste"]) && q.length < 12)
    return { text: "Hi! I'm NutriBot. Ask me about our products, protein, lupin, shipping or bulk orders.", quick: QUICK };

  if (has(q, ["muscle", "gym", "workout", "strength", "athlete", "bulk up"]))
    return {
      text: "For muscle and recovery, go for our 35g-protein picks. Oats stirred into yogurt after a workout are a favourite, and LupiCrunch makes a great pre-gym bowl.",
      products: ["oats", "lupicrunch"],
    };

  if (has(q, ["weight", "lose", "diet", "full", "satiat", "lean", "calorie"]))
    return {
      text: "High protein plus 22g prebiotic fibre per 100g keeps you full for longer, and there's no refined sugar. High Protein Oats are the most filling option.",
      products: ["oats", "lupicrunch"],
    };

  if (has(q, ["kid", "child", "children", "family", "son", "daughter"]))
    return {
      text: "Kids love the Pancake & Waffle Mix (ready in 3 minutes) and the Cookie Premix: proper protein, no maida, no artificial colours.",
      products: ["pancake", "cookie"],
    };

  if (has(q, ["recommend", "suggest", "which", "best", "start", "first"]))
    return {
      text: "What's your main goal? Pick one and I'll point you to the right pack.",
      quick: ["Muscle & strength", "Weight management", "Quick breakfast", "For kids"],
    };

  if (has(q, ["quick", "busy", "fast", "morning", "breakfast", "office", "snack"]))
    return {
      text: "LupiCrunch is pour-and-go with milk, or straight from the pouch as a desk snack. Our bestseller.",
      products: ["lupicrunch"],
    };

  if (has(q, ["gluten"]))
    return {
      text: "Lupin itself is naturally gluten-free. Whether a finished product can be called gluten-free depends on its full recipe, processing environment and regulations, so please check the pack label. For details, email the team.",
      contact: true,
    };

  if (has(q, ["career", "job", "hiring", "work with", "join"]))
    return { text: "We're a small, growing team and always happy to hear from people who care about honest food. See our Careers page.", link: { to: "/career", label: "Open Careers" } };

  if (has(q, ["blog", "article", "read", "learn"]))
    return { text: "Read 'Discover Lupin' and 'Protein, Every Day' in our journal.", link: { to: "/blog", label: "Open the journal" } };

  if (has(q, ["allerg", "peanut", "nut free", "safe"]))
    return {
      text: "Lupin is a legume, and people with a peanut allergy can also react to lupin. Our muesli contains almonds. Please check the pack label and talk to your doctor if you have food allergies. For ingredient specifics, email us.",
      contact: true,
    };

  if (has(q, ["lupin", "legume", "what is"]))
    return {
      text: "Sweet Lupin is an ancient golden legume with one of the highest natural protein densities: about 3× the protein of quinoa, high prebiotic fibre and an ultra-low glycemic index, so you get steady energy without sugar spikes.",
    };

  if (has(q, ["sugar", "sweet", "monk", "diabet", "maida", "flour", "preserv", "ingredient"]))
    return {
      text: "No refined sugar (we sweeten with monk fruit), zero maida, and no artificial colours, flavours or preservatives. Every ingredient earns its place.",
    };

  if (has(q, ["protein", "how much", "grams"]))
    return {
      text: "Protein per 100g: Muesli 35g · Oats 35g · Cookie Premix 21g · Pancake & Waffle 17g. A 40g bowl of LupiCrunch gives you 14g+.",
    };

  if (has(q, ["price", "cost", "how much is", "₹", "rs", "rupee", "pack", "size"]))
    return {
      text: products
        .map((p) => `${p.name}: ${p.packs.map((k) => `${k.label} ${formatINR(k.price)}`).join(", ")}`)
        .join("\n"),
    };

  if (has(q, ["ship", "deliver", "offer", "coupon", "discount", "code", "promo"]))
    return {
      text: `Free shipping on orders over ${formatINR(FREE_SHIPPING_AT)}. Use code SEVEN15 at checkout for 15% off. We confirm payment and delivery by email after you place an order.`,
    };

  if (has(q, ["bulk", "corporate", "gift", "retail", "stockist", "distribut", "wholesale", "office"]))
    return {
      text: "We'd love to work with you! We supply stores, offices and corporate gifting orders. Use the Partner section or contact form and pick your enquiry type.",
      contact: true,
    };

  if (has(q, ["recipe", "cook", "bake", "make"]))
    return { text: recipes.map((r) => `${r.title}: ${r.time}, ${r.protein} protein`).join("\n") };

  if (has(q, ["contact", "email", "phone", "call", "talk", "human", "support", "order status"]))
    return { text: `You can reach the team at ${contactInfo.email} or ${contactInfo.phone} (${contactInfo.hours}).`, contact: true };

  return {
    text: "I'm not sure about that one yet. Try one of these, or contact the team and they'll help.",
    quick: QUICK,
    contact: true,
  };
};

const BotProduct = ({ id }) => {
  const p = byId(id);
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);
  if (!p) return null;
  return (
    <div className='mt-2 flex items-center gap-3 bg-primary rounded-xl p-2.5 border border-ink/10'>
      <div className='w-10 h-12 shrink-0 rounded-md bg-primary flex items-center justify-center overflow-hidden'>
              <ProductImage product={p} size='thumb' className='w-full h-full' />
            </div>
      <div className='flex-1 min-w-0'>
        <p className='text-[13px] font-semibold text-cream leading-tight'>{p.name}</p>
        <p className='text-[12px] text-secondary'>
          {p.protein} protein · from {formatINR(p.packs[0].price)}
        </p>
      </div>
      <button
        type='button'
        onClick={() => {
          if (added) return open();
          add(p.id, p.packs[0].id);
          setAdded(true);
        }}
        className={`text-[12px] font-bold px-3 py-1.5 rounded-full shrink-0 ${added ? "bg-cream text-primary" : "bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn"}`}
      >
        {added ? "View cart" : "Add"}
      </button>
    </div>
  );
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm NutriBot. Ask me anything about NUTRUMMY: products, protein, lupin, shipping or bulk orders.", quick: QUICK },
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "bot", ...reply(t) }]), 350);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role='dialog'
            aria-label='NutriBot chat'
            className='fixed z-40 bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-[380px] h-[min(560px,calc(100svh-8rem))] bg-tertiary rounded-2xl shadow-2xl border border-ink/10 flex flex-col overflow-hidden'
          >
            <header className='bg-ink text-[#F5F1E8] px-5 py-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img src={`${import.meta.env.BASE_URL}logo.svg`} alt='' className='w-9 h-9' />
                <div>
                  <p className='font-bold text-[15px] leading-tight'>NutriBot</p>
                  <p className='text-[12px] text-[#C9DDE2]'>Instant answers about NUTRUMMY</p>
                </div>
              </div>
              <button type='button' onClick={() => setOpen(false)} aria-label='Close chat' className='p-1.5 hover:text-mango'>
                <Icon name='close' className='w-5 h-5' />
              </button>
            </header>

            <div className='flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-primary/60' aria-live='polite'>
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "flex justify-end" : ""}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-[21px] whitespace-pre-line ${
                      m.from === "user" ? "bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn rounded-br-md" : "bg-tertiary text-cream border border-ink/10 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                    {m.products?.map((id) => (
                      <BotProduct key={id} id={id} />
                    ))}
                    {m.link && (
                      <Link
                        to={m.link.to}
                        onClick={() => setOpen(false)}
                        className='mt-2 mr-3 inline-flex items-center gap-1 text-gold font-semibold text-[13px]'
                      >
                        {m.link.label} <Icon name='arrow' className='w-3.5 h-3.5' strokeWidth={2.25} />
                      </Link>
                    )}
                    {m.contact && (
                      <Link
                        to={{ pathname: "/", hash: "#contact" }}
                        onClick={() => setOpen(false)}
                        className='mt-2 inline-flex items-center gap-1 text-gold font-semibold text-[13px]'
                      >
                        Contact the team <Icon name='arrow' className='w-3.5 h-3.5' strokeWidth={2.25} />
                      </Link>
                    )}
                  </div>
                  {m.quick && i === messages.length - 1 && (
                    <div className='mt-2 flex flex-wrap gap-1.5'>
                      {m.quick.map((qr) => (
                        <button
                          key={qr}
                          type='button'
                          onClick={() => send(qr)}
                          className='text-[12px] font-semibold text-cream bg-tertiary border border-ink/20 rounded-full px-3 py-1.5 hover:border-gold hover:text-gold'
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className='border-t border-ink/10 p-3 flex gap-2 bg-tertiary'
            >
              <label htmlFor='nutribot-input' className='sr-only'>
                Ask NutriBot
              </label>
              <input
                id='nutribot-input'
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Ask about protein, lupin, shipping…'
                className='flex-1 bg-primary rounded-full px-4 py-2.5 text-[14px] text-cream placeholder:text-muted outline-none border border-ink/10 focus:border-gold'
              />
              <button
                type='submit'
                aria-label='Send'
                className='w-10 h-10 rounded-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn flex items-center justify-center hover:bg-ink hover:text-primary shrink-0'
              >
                <Icon name='arrow' className='w-4 h-4' strokeWidth={2.5} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close NutriBot" : "Open NutriBot chat"}
        aria-expanded={open}
        className='fixed z-40 bottom-5 right-4 sm:right-6 h-14 w-14 sm:w-auto justify-center sm:justify-start sm:pl-3 sm:pr-5 rounded-full bg-ink text-[#F5F1E8] shadow-2xl flex items-center gap-2.5 hover:bg-lupin hover:text-onaccent transition-colors'
      >
        <span className='w-9 h-9 rounded-full bg-[#F5F1E8]/10 flex items-center justify-center'>
          <Icon name={open ? "close" : "chat"} className='w-5 h-5' />
        </span>
        <span className='hidden sm:inline text-[14px] font-bold'>{open ? "Close" : "Ask NutriBot"}</span>
      </button>
    </>
  );
};

export default Chatbot;
