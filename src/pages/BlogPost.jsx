import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { styles } from "../styles";
import { blogPosts } from "../constants/blog";
import { products } from "../constants";
import { useCart, formatINR } from "../context/CartContext";
import BlogCards from "../components/BlogCards";
import Faq from "../components/Faq";
import Icon from "../components/Icon";

const Block = ({ block }) => {
  if (block.h) return <h2 className='mt-10 font-display text-cream text-[24px] sm:text-[28px] font-extrabold leading-tight'>{block.h}</h2>;
  if (block.callout)
    return (
      <p className='my-8 border-l-4 border-lupin pl-5 font-display text-cream text-[20px] sm:text-[24px] font-extrabold leading-snug'>
        {block.callout}
      </p>
    );
  if (block.list)
    return (
      <ul className='mt-5 grid sm:grid-cols-2 gap-4'>
        {block.list.map(([title, text]) => (
          <li key={title} className='bg-tertiary border border-ink/10 rounded-2xl p-5'>
            <p className='text-cream font-bold'>{title}</p>
            <p className='mt-1.5 text-secondary text-[15px] leading-[24px]'>{text}</p>
          </li>
        ))}
      </ul>
    );
  return <p className='mt-5 text-secondary text-[17px] leading-[30px]'>{block.p}</p>;
};

const RelatedProducts = ({ ids }) => {
  const { add, open } = useCart();
  return (
    <aside className='mt-12 bg-ink rounded-3xl p-8 text-[#F5F1E8]'>
      <p className='text-[12px] font-bold uppercase tracking-[0.2em] text-mango'>Mentioned in this article</p>
      <div className='mt-5 grid sm:grid-cols-3 gap-3'>
        {ids.map((id) => {
          const p = products.find((x) => x.id === id);
          return (
            <div key={id} className='bg-[#F5F1E8]/[0.07] rounded-2xl p-4 flex flex-col'>
              <p className='font-bold text-[15px] leading-tight'>{p.name}</p>
              <p className='text-[13px] text-[#C9DDE2] mt-1'>
                {p.protein} protein · from {formatINR(p.packs[0].price)}
              </p>
              <button
                type='button'
                onClick={() => {
                  add(p.id, p.packs[0].id);
                  open();
                }}
                className='mt-4 self-start bg-lupin text-onaccent text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-[#F5F1E8]'
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} | NUTRUMMY` : "Article not found | NUTRUMMY";
    return () => {
      document.title = "NUTRUMMY | Lupin Superfood Breakfasts";
    };
  }, [post]);

  if (!post)
    return (
      <main className={`${styles.paddingX} max-w-3xl mx-auto pt-[170px] pb-24 text-center`}>
        <h1 className={styles.sectionHeadText}>Article not found</h1>
        <Link to='/blog' className='mt-6 inline-block text-gold font-bold'>
          ← Back to the journal
        </Link>
      </main>
    );

  return (
    <main className='pt-[130px] pb-20'>
      <header className={`${styles.paddingX} max-w-3xl mx-auto pt-10`}>
        <Link to='/blog' className='inline-flex items-center gap-1.5 text-[14px] font-semibold text-secondary hover:text-gold'>
          <Icon name='arrow' className='w-4 h-4 rotate-180' strokeWidth={2.25} /> All articles
        </Link>
        <p className='mt-8 text-[12px] font-bold uppercase tracking-[0.2em] text-gold'>
          {post.tag} · {post.readTime} · {post.published}
        </p>
        <h1 className='mt-3 font-display text-cream font-extrabold text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.03em]'>
          {post.title}
        </h1>
        <p className='mt-3 text-cream/80 text-[20px] font-semibold'>{post.subtitle}</p>
      </header>

      <article className={`${styles.paddingX} max-w-3xl mx-auto mt-6`}>
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        {post.related && <RelatedProducts ids={post.related} />}
        {post.showFaq && (
          <div className='mt-16'>
            <Faq />
          </div>
        )}
      </article>

      <section className={`${styles.paddingX} max-w-7xl mx-auto mt-20`}>
        <p className={styles.sectionSubText}>Keep reading</p>
        <div className='mt-6'>
          <BlogCards exclude={post.slug} />
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
