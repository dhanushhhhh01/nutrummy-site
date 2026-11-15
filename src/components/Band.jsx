import React from "react";

// Full-width coloured background band with wavy top and bottom edges.
// `color` is a hex; `prev` / `next` are the neighbouring band colours so the waves blend.
const Wave = ({ fill, flip = false }) => (
  <svg
    viewBox='0 0 1440 60'
    preserveAspectRatio='none'
    className={`block w-full h-[36px] sm:h-[56px] ${flip ? "rotate-180" : ""}`}
    aria-hidden='true'
  >
    <path
      d='M0,32 C120,8 240,8 360,28 C480,48 600,56 720,40 C840,24 960,4 1080,12 C1200,20 1320,44 1440,36 L1440,60 L0,60 Z'
      fill={fill}
    />
  </svg>
);

const Band = ({ color, waveTop = true, waveBottom = true, className = "", innerClassName = "", children }) => (
  <div className={`relative ${className}`}>
    {waveTop && <Wave fill={color} />}
    <div style={{ backgroundColor: color }} className={`-my-px ${innerClassName}`}>
      {children}
    </div>
    {waveBottom && <Wave fill={color} flip />}
  </div>
);

export default Band;
