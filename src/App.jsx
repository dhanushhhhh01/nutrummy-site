import { BrowserRouter } from "react-router-dom";

import {
  About,
  Compare,
  Contact,
  Experience,
  Footer,
  Hero,
  Navbar,
  Tech,
  Works,
  Recipes,
  Partners,
  Values,
  Newsletter,
  CartDrawer,
  Chatbot,
  GrainsCanvas,
} from "./components";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <div className='relative z-0 bg-primary'>
          <div className='hero-glow grain relative'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Works />
          <Values />
          <Experience />
          <Tech />
          <Compare />
          <Recipes />
          <Partners />
          <div className='relative z-0'>
            <Contact />
            <GrainsCanvas />
          </div>
          <Newsletter />
          <Footer />
        </div>
        <CartDrawer />
        <Chatbot />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
