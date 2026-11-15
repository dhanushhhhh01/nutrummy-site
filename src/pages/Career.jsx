import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { careers, contactInfo } from "../constants";
import Icon from "../components/Icon";

const inputClass =
  "w-full bg-tertiary py-3 px-4 placeholder:text-muted text-cream rounded-xl outline-none border border-ink/15 focus:border-gold font-medium text-[15px]";

const empty = { name: "", email: "", phone: "", role: careers.roles[0], link: "", why: "" };

// No applicant system yet: the form opens a pre-filled email to the team.
const Career = () => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    document.title = "Careers | NUTRUMMY";
    return () => {
      document.title = "NUTRUMMY | Lupin Superfood Breakfasts";
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.why.trim()) return setStatus({ type: "error", text: "Please add your name and a few lines on why NUTRUMMY." });
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setStatus({ type: "error", text: "Please enter a valid email address." });
    const subject = encodeURIComponent(`Application: ${form.role} (${form.name})`);
    const body = encodeURIComponent(
      [`Role: ${form.role}`, `Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || "-"}`, `LinkedIn / portfolio: ${form.link || "-"}`, "", "Why NUTRUMMY:", form.why].join("\n")
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setStatus({ type: "ok", text: "Your email app has opened with your introduction. Hit send and we'll be in touch." });
    setForm(empty);
  };

  return (
    <main className='pt-[130px]'>
      <section className='bg-ink text-[#F5F1E8]'>
        <div className={`${styles.paddingX} max-w-7xl mx-auto py-20`}>
          <p className='text-[12px] font-bold uppercase tracking-[0.25em] text-mango'>Join our mission</p>
          <h1 className='mt-3 font-display font-extrabold text-[40px] sm:text-[60px] leading-[1.02] tracking-[-0.03em] max-w-3xl'>
            {careers.title}
          </h1>
          <p className='mt-5 text-[#C9DDE2] text-[18px] leading-[30px] max-w-2xl'>{careers.intro}</p>
        </div>
      </section>

      <section className={`${styles.padding} max-w-7xl mx-auto`}>
        <p className={styles.sectionSubText}>Why NUTRUMMY</p>
        <div className='mt-8 grid md:grid-cols-3 gap-5'>
          {careers.reasons.map((r) => (
            <div key={r.title} className={`${styles.card} p-7`}>
              <div className='w-11 h-11 rounded-xl bg-lupin/20 flex items-center justify-center text-gold'>
                <Icon name={r.icon} className='w-5 h-5' />
              </div>
              <h2 className='mt-5 font-display text-cream text-[20px] font-extrabold'>{r.title}</h2>
              <p className='mt-2 text-secondary text-[15px] leading-[24px]'>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.paddingX} max-w-7xl mx-auto pb-24 grid lg:grid-cols-[1fr_1.2fr] gap-12`}>
        <div>
          <h2 className={styles.sectionHeadText}>
            Think you would <span className='marker'>fit in?</span>
          </h2>
          <p className={`${styles.body} mt-4`}>{careers.closing}</p>
          <p className={`${styles.body} mt-4`}>Even if your exact role isn't listed, drop us a line.</p>
          <ul className='mt-6 space-y-2'>
            {careers.roles.slice(0, -1).map((r) => (
              <li key={r} className='flex items-center gap-2.5 text-cream font-medium'>
                <Icon name='check' className='w-4 h-4 text-gold' strokeWidth={2.5} /> {r}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} noValidate className={`${styles.card} p-7 sm:p-9 space-y-4`}>
          <h3 className='font-display text-cream text-[22px] font-extrabold'>Say hello to the team</h3>
          <div className='grid sm:grid-cols-2 gap-4'>
            <label className='block'>
              <span className='text-cream text-[13px] font-medium'>Your name *</span>
              <input autoComplete='name' value={form.name} onChange={set("name")} className={`${inputClass} mt-1.5`} />
            </label>
            <label className='block'>
              <span className='text-cream text-[13px] font-medium'>Email *</span>
              <input type='email' autoComplete='email' value={form.email} onChange={set("email")} className={`${inputClass} mt-1.5`} />
            </label>
            <label className='block'>
              <span className='text-cream text-[13px] font-medium'>Phone</span>
              <input type='tel' autoComplete='tel' value={form.phone} onChange={set("phone")} className={`${inputClass} mt-1.5`} />
            </label>
            <label className='block'>
              <span className='text-cream text-[13px] font-medium'>Role of interest</span>
              <select value={form.role} onChange={set("role")} className={`${inputClass} mt-1.5`}>
                {careers.roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
          </div>
          <label className='block'>
            <span className='text-cream text-[13px] font-medium'>LinkedIn / portfolio URL</span>
            <input type='url' value={form.link} onChange={set("link")} placeholder='https://' className={`${inputClass} mt-1.5`} />
          </label>
          <label className='block'>
            <span className='text-cream text-[13px] font-medium'>Why NUTRUMMY? (a few lines) *</span>
            <textarea rows={4} value={form.why} onChange={set("why")} className={`${inputClass} mt-1.5`} />
          </label>
          {status.text && (
            <p role='status' className={`text-[14px] font-medium ${status.type === "error" ? "berry-text" : "text-gold"}`}>
              {status.text}
            </p>
          )}
          <button type='submit' className='w-full bg-lupin text-onaccent border-2 border-ink shadow-pop-sm pop-btn font-bold uppercase tracking-wider text-[13px] py-3.5 rounded-full hover:bg-ink hover:text-primary transition-colors'>
            Send introduction
          </button>
        </form>
      </section>
    </main>
  );
};

export default Career;
