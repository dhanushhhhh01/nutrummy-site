import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Navbar, Footer, Newsletter, CartDrawer, Chatbot } from "./components";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Career from "./pages/Career";

// On navigation: scroll to the #section in the URL (retrying while the page renders), or to the top.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    let tries = 0;
    const id = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 20) {
        clearInterval(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearInterval(id);
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <CartProvider>
      <ScrollManager />
      <div className='relative z-0 min-h-screen'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/career' element={<Career />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Newsletter />
        <Footer />
      </div>
      <CartDrawer />
      <Chatbot />
    </CartProvider>
  </BrowserRouter>
);

export default App;
