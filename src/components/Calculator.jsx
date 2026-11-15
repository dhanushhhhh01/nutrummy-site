import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { products, recipes } from "../constants";
import { textVariant } from "../utils/motion";
import { useCart, formatINR } from "../context/CartContext";
import Icon from "./Icon";

/*
 * Nutrition & macro calculator (the reference site's "Smart Nutrition" section).
 * Rule-based and transparent: grams of protein per kg of bodyweight by activity level,
 * using commonly cited general ranges (≈0.8 g/kg for adults; higher for regular training).
 * It is general guidance, not medical advice.
 */
const GOALS = [
  { id: "muscle", label: "Muscle & strength", hint: "Maximise protein density and recovery", bonus: 0.2, product: "oats", recipe: "Overnight Raspberry Oats Jar" },
  { id: "morning", label: "Clean morning fuel", hint: "Steady energy without a sugar spike", bonus: 0, product: "lupicrunch", recipe: "Choco-Lupin Acai Superbowl" },
  { id: "stamina", label: "Workday stamina", hint: "Beat afternoon fatigue with fibre and grains", bonus: 0, product: "lupicrunch", recipe: "Choco-Lupin Acai Superbowl" },
  { id: "lean", label: "Lean & satiated", hint: "High fibre to stay full for longer", bonus: 0.1, product: "oats", recipe: "Overnight Raspberry Oats Jar" },
];
const ACTIVITY = [
  { id: "desk", label: "Desk / light", gPerKg: 0.8 },
  { id: "active", label: "Workout 3–4× a week", gPerKg: 1.2 },
  { id: "athlete", label: "Intense athlete", gPerKg: 1.6 },
];
const SERVING_G = 40; // one bowl

const Choice = ({ selected, onClick, children }) => (
  <button
    type='button'
    role='radio'
    aria-checked={selected}
    onClick={onClick}
    className={`text-left rounded-xl border p-3.5 transition-colors ${
      selected ? "border-gold bg-lupin/15" : "border-ink/15 bg-tertiary hover:border-ink/40"
    }`}
  >
    {children}
  </button>
);

const Calculator = () => {
  const [goal, setGoal] = useState(GOALS[0].id);
  const [activity, setActivity] = useState(ACTIVITY[1].id);
  const [weight, setWeight] = useState(68);
  const [added, setAdded] = useState(false);
  const { add, open } = useCart();

  const result = useMemo(() => {
    const g = GOALS.find((x) => x.id === goal);
    const a = ACTIVITY.find((x) => x.id === activity);
    const daily = Math.round(weight * (a.gPerKg + g.bonus));
    const product = products.find((p) => p.id === g.product);
    const per100 = parseInt(product.protein, 10);
    const perServing = Math.round((per100 * SERVING_G) / 100);
    const recipe = recipes.find((r) => r.title === g.recipe);
    return { daily, product, perServing, share: Math.round((perServing / daily) * 100), recipe, g };
  }, [goal, activity, weight]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Smart nutrition</p>
        <h2 className={`${styles.sectionHeadText} mt-3`}>
          How much protein <span className='text-gold'>do you need?</span>
        </h2>
        <p className={`${styles.body} mt-3 max-w-2xl`}>
          Pick your goal, activity and weight to estimate your daily protein, and see how a NUTRUMMY bowl fits in.
        </p>
      </motion.div>

      <div className='mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-6'>
        <div className={`${styles.card} p-6 sm:p-8 space-y-7`}>
          <fieldset>
            <legend className='text-[12px] font-bold uppercase tracking-[0.18em] text-secondary'>Step 1 · Your focus</legend>
            <div role='radiogroup' className='mt-3 grid sm:grid-cols-2 gap-2'>
              {GOALS.map((x) => (
                <Choice key={x.id} selected={goal === x.id} onClick={() => { setGoal(x.id); setAdded(false); }}>
                  <span className='block text-cream font-bold text-[14px]'>{x.label}</span>
                  <span className='block text-secondary text-[12px] mt-0.5'>{x.hint}</span>
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className='text-[12px] font-bold uppercase tracking-[0.18em] text-secondary'>Step 2 · Daily activity</legend>
            <div role='radiogroup' className='mt-3 grid sm:grid-cols-3 gap-2'>
              {ACTIVITY.map((x) => (
                <Choice key={x.id} selected={activity === x.id} onClick={() => setActivity(x.id)}>
                  <span className='block text-cream font-bold text-[14px]'>{x.label}</span>
                </Choice>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor='bodyweight' className='flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.18em] text-secondary'>
              Step 3 · Bodyweight
              <span className='text-cream text-[16px] normal-case tracking-normal font-extrabold'>
                {weight} kg <span className='text-secondary font-medium text-[13px]'>({Math.round(weight * 2.2046)} lbs)</span>
              </span>
            </label>
            <input
              id='bodyweight'
              type='range'
              min={35}
              max={130}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className='mt-4 w-full accent-[#FF6B1A]'
            />
            <div className='flex justify-between text-[12px] text-secondary mt-1'>
              <span>35 kg</span>
              <span>130 kg</span>
            </div>
          </div>
        </div>

        <div className='bg-ink text-[#FFF3E6] rounded-2xl p-6 sm:p-8 flex flex-col' aria-live='polite'>
          <p className='text-[12px] font-bold uppercase tracking-[0.2em] text-lupin'>Your daily protein</p>
          <p className='mt-2 font-display font-extrabold text-[64px] leading-none tracking-[-0.03em]'>
            {result.daily}
            <span className='text-[24px] text-[#E3D3E8]'> g/day</span>
          </p>
          <div className='mt-6 rounded-xl bg-[#FFF3E6]/[0.07] p-4'>
            <p className='text-[13px] text-[#E3D3E8]'>Your NUTRUMMY pick</p>
            <p className='font-bold text-[17px] mt-0.5'>{result.product.name}</p>
            <p className='text-[14px] text-[#E3D3E8] mt-1'>
              One {SERVING_G}g bowl gives <span className='text-lupin font-bold'>{result.perServing}g protein</span>, about{" "}
              {result.share}% of your day.
            </p>
            <button
              type='button'
              onClick={() => {
                if (added) return open();
                add(result.product.id, result.product.packs[0].id);
                setAdded(true);
              }}
              className='mt-4 inline-flex items-center gap-1.5 bg-lupin text-ink text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#FFF3E6]'
            >
              {added ? "View cart" : `Add to cart · ${formatINR(result.product.packs[0].price)}`}
              <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
            </button>
          </div>
          {result.recipe && (
            <p className='mt-4 text-[14px] text-[#E3D3E8]'>
              Try: <span className='text-[#FFF3E6] font-semibold'>{result.recipe.title}</span> ({result.recipe.time},{" "}
              {result.recipe.protein} protein)
            </p>
          )}
          <p className='mt-auto pt-6 text-[11px] text-[#E3D3E8] leading-[17px]'>
            General guidance based on common protein ranges, not medical advice. Pregnant or breastfeeding, managing
            a health condition, or under 18? Check with a doctor or dietitian.
          </p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Calculator, "calculator");
