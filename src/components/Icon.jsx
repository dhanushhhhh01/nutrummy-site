import React from "react";

// Minimal line-icon set (24×24, stroke-based) so the site needs no emoji or icon font.
const paths = {
  zap: <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />,
  sprout: (
    <>
      <path d='M7 20h10' />
      <path d='M10 20c5.5-2.5.8-6.4 3-10' />
      <path d='M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z' />
      <path d='M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z' />
    </>
  ),
  leaf: (
    <>
      <path d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' />
      <path d='M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' />
    </>
  ),
  shield: (
    <>
      <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      <path d='m9 12 2 2 4-4' />
    </>
  ),
  sunrise: (
    <>
      <path d='M12 2v8' />
      <path d='m4.93 10.93 1.41 1.41' />
      <path d='M2 18h2' />
      <path d='M20 18h2' />
      <path d='m19.07 10.93-1.41 1.41' />
      <path d='M22 22H2' />
      <path d='m8 6 4-4 4 4' />
      <path d='M16 18a4 4 0 0 0-8 0' />
    </>
  ),
  laptop: (
    <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
  ),
  dumbbell: (
    <>
      <path d='m6.5 6.5 11 11' />
      <path d='m21 21-1-1' />
      <path d='m3 3 1 1' />
      <path d='m18 22 4-4' />
      <path d='m2 6 4-4' />
      <path d='m3 10 7-7' />
      <path d='m14 21 7-7' />
    </>
  ),
  moon: <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />,
  clock: (
    <>
      <circle cx='12' cy='12' r='10' />
      <path d='M12 6v6l4 2' />
    </>
  ),
  star: <polygon points='12 2 15.09 8.26 22 9.27 17 14.02 18.18 21.02 12 17.77 5.82 21.02 7 14.02 2 9.27 8.91 8.26 12 2' />,
  check: <path d='M20 6 9 17l-5-5' />,
  arrow: (
    <>
      <path d='M5 12h14' />
      <path d='m12 5 7 7-7 7' />
    </>
  ),
  mail: (
    <>
      <rect x='2' y='4' width='20' height='16' rx='2' />
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </>
  ),
  phone: (
    <path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z' />
  ),
  pin: (
    <>
      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
      <circle cx='12' cy='10' r='3' />
    </>
  ),
  store: (
    <>
      <path d='M3 9 4.5 4h15L21 9' />
      <path d='M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0' />
      <path d='M5 12v8h14v-8' />
      <path d='M10 20v-5h4v5' />
    </>
  ),
  gift: (
    <>
      <rect x='3' y='8' width='18' height='4' rx='1' />
      <path d='M12 8v13' />
      <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
      <path d='M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5' />
    </>
  ),
  truck: (
    <>
      <path d='M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' />
      <path d='M15 18H9' />
      <path d='M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14' />
      <circle cx='17' cy='18' r='2' />
      <circle cx='7' cy='18' r='2' />
    </>
  ),
};

paths.menu = (
  <>
    <path d='M4 7h16' />
    <path d='M4 12h16' />
    <path d='M4 17h16' />
  </>
);
paths.close = (
  <>
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </>
);
paths.cart = (
  <>
    <circle cx='8' cy='21' r='1' />
    <circle cx='19' cy='21' r='1' />
    <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
  </>
);
paths.plus = (
  <>
    <path d='M5 12h14' />
    <path d='M12 5v14' />
  </>
);
paths.chat = <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />;
paths.minus = <path d='M5 12h14' />;
paths.trash = (
  <>
    <path d='M3 6h18' />
    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' />
    <path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
  </>
);

const Icon = ({ name, className = "w-6 h-6", filled = false, strokeWidth = 1.75 }) => (
  <svg
    viewBox='0 0 24 24'
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {paths[name]}
  </svg>
);

export default Icon;
