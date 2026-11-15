import React, { useState } from "react";

import { styles } from "../styles";
import { faqs } from "../constants/blog";
import Icon from "./Icon";

const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby='faq-heading'>
      <p className={styles.sectionSubText}>FAQ</p>
      <h2 id='faq-heading' className={`${styles.sectionHeadText} mt-3`}>
        Lupin, <span className='marker'>answered.</span>
      </h2>
      <div className='mt-8 divide-y divide-ink/10 border-y border-ink/10'>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  type='button'
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className='w-full flex items-center justify-between gap-4 py-5 text-left text-cream font-bold text-[16px] hover:text-gold'
                >
                  {f.q}
                  <Icon
                    name='chevron'
                    className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-gold" : ""}`}
                    strokeWidth={2.25}
                  />
                </button>
              </h3>
              <div id={`faq-${i}`} hidden={!isOpen} className='pb-5 pr-10 text-secondary text-[15px] leading-[25px]'>
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
