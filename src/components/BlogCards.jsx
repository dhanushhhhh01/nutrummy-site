import React from "react";
import { Link } from "react-router-dom";

import { blogPosts } from "../constants/blog";
import Icon from "./Icon";

// Article cards, used on the Blog page and the home-page teaser.
const BlogCards = ({ exclude }) => (
  <div className='grid md:grid-cols-2 gap-5'>
    {blogPosts
      .filter((b) => b.slug !== exclude)
      .map((b, i) => (
        <Link
          key={b.slug}
          to={`/blog/${b.slug}`}
          className='group bg-tertiary rounded-2xl border border-ink/10 shadow-card overflow-hidden flex flex-col hover:border-gold/50 transition-colors'
        >
          <div className={`h-40 flex items-end p-6 ${i % 2 ? "bg-ink" : "bg-lupin"}`}>
            <p className={`font-display font-extrabold text-[30px] leading-none tracking-[-0.02em] ${i % 2 ? "text-[#F5F1E8]" : "text-ink"}`}>
              {b.title}
            </p>
          </div>
          <div className='p-6 flex-1 flex flex-col'>
            <p className='text-[12px] font-bold uppercase tracking-[0.18em] text-gold'>
              {b.tag} · {b.readTime}
            </p>
            <p className='mt-2 text-cream font-bold text-[17px]'>{b.subtitle}</p>
            <p className='mt-2 text-secondary text-[14px] leading-[22px] flex-1'>{b.excerpt}</p>
            <span className='mt-5 inline-flex items-center gap-1.5 text-gold text-[14px] font-bold group-hover:gap-2.5 transition-all'>
              Read article <Icon name='arrow' className='w-4 h-4' strokeWidth={2.25} />
            </span>
          </div>
        </Link>
      ))}
  </div>
);

export default BlogCards;
