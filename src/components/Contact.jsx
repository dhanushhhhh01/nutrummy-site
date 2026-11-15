import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { PouchCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { contactInfo, enquiryTypes } from "../constants";

const env = import.meta.env;
const hasEmailJs =
  env.VITE_APP_EMAILJS_SERVICE_ID && env.VITE_APP_EMAILJS_TEMPLATE_ID && env.VITE_APP_EMAILJS_PUBLIC_KEY;

const inputClass =
  "bg-tertiary py-3.5 px-5 placeholder:text-muted text-cream rounded-xl outline-none border border-ink/5 focus:border-gold/60 font-medium transition-colors";

const emptyForm = { name: "", email: "", topic: enquiryTypes[0], message: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  useEffect(() => {
    const onTopic = (e) => setForm((f) => ({ ...f, topic: e.detail }));
    window.addEventListener("nutrummy:topic", onTopic);
    return () => window.removeEventListener("nutrummy:topic", onTopic);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: "error", text: "Please fill in your name, email and message." });
      return;
    }

    // Without EmailJS keys configured, hand the message to the visitor's mail app.
    if (!hasEmailJs) {
      const subject = encodeURIComponent(`[${form.topic}] Message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      setStatus({ state: "success", text: "Opening your email app…" });
      return;
    }

    setStatus({ state: "loading", text: "" });
    emailjs
      .send(
        env.VITE_APP_EMAILJS_SERVICE_ID,
        env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: "NUTRUMMY",
          to_email: contactInfo.email,
          topic: form.topic,
          message: form.message,
        },
        env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus({ state: "success", text: "Thank you! We'll get back to you soon." });
          setForm(emptyForm);
        },
        (error) => {
          console.error(error);
          setStatus({ state: "error", text: "Something went wrong. Please email us directly." });
        }
      );
  };

  return (
    <div className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.8] bg-black-100 p-8 sm:p-10 rounded-3xl border border-ink/5'
      >
        <p className={styles.sectionSubText}>Connect with NUTRUMMY</p>
        <h3 className={styles.sectionHeadText}>
          Let's <span className='text-gold'>talk.</span>
        </h3>
        <p className='mt-3 text-secondary text-[15px] leading-[26px]'>
          Questions, feedback, bulk orders or just want to say hi? We would love to hear from you.
        </p>
        <div className='mt-6 grid sm:grid-cols-2 gap-3'>
          <div className='rounded-xl bg-primary border border-ink/10 p-4'>
            <p className='text-cream font-bold text-[15px]'>Got a question?</p>
            <p className='text-secondary text-[14px] mt-1'>From ingredients to orders, we are here to help.</p>
          </div>
          <div className='rounded-xl bg-primary border border-ink/10 p-4'>
            <p className='text-cream font-bold text-[15px]'>Bulk & corporate gifting</p>
            <p className='text-secondary text-[14px] mt-1'>Let's build something for your team, event or store.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-5' noValidate>
          <div className='grid sm:grid-cols-2 gap-5'>
            <label className='flex flex-col'>
              <span className='text-cream text-[14px] font-medium mb-2'>Your name</span>
              <input type='text' name='name' value={form.name} onChange={handleChange} placeholder='Asha Rao' className={inputClass} />
            </label>
            <label className='flex flex-col'>
              <span className='text-cream text-[14px] font-medium mb-2'>Email</span>
              <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='you@email.com' className={inputClass} />
            </label>
          </div>
          <label className='flex flex-col'>
            <span className='text-cream text-[14px] font-medium mb-2'>What can we help with?</span>
            <select name='topic' value={form.topic} onChange={handleChange} className={inputClass}>
              {enquiryTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className='flex flex-col'>
            <span className='text-cream text-[14px] font-medium mb-2'>Message</span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Tell us what you have in mind…'
              className={inputClass}
            />
          </label>

          <div className='flex flex-wrap items-center gap-4'>
            <button
              type='submit'
              disabled={status.state === "loading"}
              className='bg-lupin text-onaccent py-3.5 px-8 rounded-full font-semibold hover:bg-ink hover:text-primary transition-colors disabled:opacity-60'
            >
              {status.state === "loading" ? "Sending…" : "Send message"}
            </button>
            {status.text && (
              <p role='status' className={`text-[14px] ${status.state === "error" ? "berry-text" : "text-gold"}`}>
                {status.text}
              </p>
            )}
          </div>
        </form>

        <div className='mt-10 pt-8 border-t border-ink/10 grid sm:grid-cols-2 gap-5 text-[14px]'>
          <div>
            <p className='text-gold text-[11px] uppercase tracking-[0.2em] font-semibold'>Headquarters</p>
            <p className='text-cream mt-2'>{contactInfo.company}</p>
            <p className='text-secondary'>{contactInfo.address}</p>
          </div>
          <div>
            <p className='text-gold text-[11px] uppercase tracking-[0.2em] font-semibold'>Reach us</p>
            <a href={`mailto:${contactInfo.email}`} className='block text-cream mt-2 hover:text-gold'>
              {contactInfo.email}
            </a>
            <p className='text-secondary'>{contactInfo.phone}</p>
            <p className='text-secondary'>{contactInfo.hours}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[560px] h-[380px]'>
        <PouchCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
