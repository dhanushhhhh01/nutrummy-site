import React, { useState } from "react";

import { styles } from "../styles";
import { contactInfo } from "../constants";

// "Sunday Club" sign-up (offer text from the live NUTRUMMY site).
// There is no mailing-list backend yet, so the form opens a pre-filled email to the team.
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg("Please enter a valid email address.");
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      "Sunday Club sign-up"
    )}&body=${encodeURIComponent(`Please add ${email} to the Sunday Club newsletter.`)}`;
    setMsg("Almost there: send the email that just opened to join.");
    setEmail("");
  };

  return (
    <section className='bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn'>
      <div className={`max-w-7xl mx-auto ${styles.paddingX} py-14 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center`}>
        <div>
          <p className='text-[12px] font-bold uppercase tracking-[0.25em] opacity-90'>Never miss a morning</p>
          <h2 className='font-display font-extrabold text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] mt-2'>
            Join the Sunday Club.
          </h2>
          <p className='mt-3 text-[16px] leading-[26px] max-w-lg'>
            High-protein recipes, new product drops and members-only offers. Get 15% off your first
            bowl when you sign up.
          </p>
        </div>
        <form onSubmit={submit} noValidate className='w-full'>
          <div className='flex flex-col sm:flex-row gap-3'>
            <label htmlFor='newsletter-email' className='sr-only'>
              Email address
            </label>
            <input
              id='newsletter-email'
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your email address'
              className='flex-1 bg-[#FFFFFF] text-ink placeholder:text-muted rounded-full px-5 py-3.5 outline-none border-2 border-transparent focus:border-ink font-medium'
            />
            <button
              type='submit'
              className='bg-ink text-[#F5F1E8] font-bold uppercase tracking-wider text-[13px] px-7 py-3.5 rounded-full hover:bg-[#FFFFFF] hover:text-ink transition-colors'
            >
              Join
            </button>
          </div>
          {msg && (
            <p role='status' className='mt-3 text-[14px] font-medium'>
              {msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
