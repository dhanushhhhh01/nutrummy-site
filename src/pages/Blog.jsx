import React from "react";

import { styles } from "../styles";
import BlogCards from "../components/BlogCards";
import Faq from "../components/Faq";

const Blog = () => (
  <main className={`${styles.paddingX} max-w-7xl mx-auto pt-[150px] pb-20`}>
    <p className={styles.sectionSubText}>The NUTRUMMY journal</p>
    <h1 className={`${styles.sectionHeadText} mt-3 max-w-3xl`}>
      Food innovation & <span className='text-gold'>everyday nutrition.</span>
    </h1>
    <p className={`${styles.body} mt-4 max-w-2xl`}>
      Deep dives into the science of Lupin super legume, India's growing protein conversation, and the art of
      honest eating.
    </p>
    <div className='mt-12'>
      <BlogCards />
    </div>
    <div className='mt-20'>
      <Faq />
    </div>
  </main>
);

export default Blog;
