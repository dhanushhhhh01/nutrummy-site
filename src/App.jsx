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
  GrainsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='hero-glow grain relative'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Compare />
        <Recipes />
        <Partners />
        <div className='relative z-0'>
          <Contact />
          <GrainsCanvas />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
