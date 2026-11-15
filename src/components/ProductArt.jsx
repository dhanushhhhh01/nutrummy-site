import React from "react";

// Flat SVG product pouch, coloured per SKU. Replace with real packshots when available.
const ProductArt = ({ short, protein, body, accent, id }) => (
  <svg viewBox='0 0 200 240' className='h-[190px] w-auto drop-shadow-[0_22px_28px_rgba(0,0,0,0.55)]' role='img' aria-label={`${short.join(" ")} pouch`}>
    <defs>
      <linearGradient id={`b-${id}`} x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor={body} />
        <stop offset='1' stopColor='#120a05' />
      </linearGradient>
      <linearGradient id={`s-${id}`} x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0' stopColor='#fff' stopOpacity='0' />
        <stop offset='0.5' stopColor='#fff' stopOpacity='0.10' />
        <stop offset='1' stopColor='#fff' stopOpacity='0' />
      </linearGradient>
    </defs>
    <path d='M30 22h140l8 196a10 10 0 0 1-10 10H32a10 10 0 0 1-10-10z' fill={`url(#b-${id})`} />
    <rect x='28' y='10' width='144' height='18' rx='2' fill='#F5B82E' />
    {[...Array(12)].map((_, i) => (
      <rect key={i} x={34 + i * 11.5} y='10' width='2' height='18' fill='#d9940f' />
    ))}
    <text x='100' y='52' textAnchor='middle' fill='#F5B82E' fontFamily='Plus Jakarta Sans, system-ui, sans-serif' fontWeight='700' fontSize='15' letterSpacing='1'>
      NUTRUMMY
    </text>
    <line x1='70' y1='60' x2='130' y2='60' stroke={accent} strokeOpacity='0.4' />
    <text x='100' y='100' textAnchor='middle' fill='#FFF4E0' fontFamily='Plus Jakarta Sans, system-ui, sans-serif' fontWeight='700' fontSize='30'>
      {short[0]}
    </text>
    <text x='100' y='128' textAnchor='middle' fill={accent} fontFamily='Plus Jakarta Sans, system-ui, sans-serif' fontWeight='700' fontSize='17' letterSpacing='2'>
      {short[1]}
    </text>
    <circle cx='100' cy='176' r='26' fill='none' stroke={accent} strokeOpacity='0.55' strokeWidth='1.5' />
    <text x='100' y='178' textAnchor='middle' fill='#FFF4E0' fontFamily='Plus Jakarta Sans, system-ui, sans-serif' fontWeight='700' fontSize='17'>
      {protein}
    </text>
    <text x='100' y='191' textAnchor='middle' fill={accent} fontFamily='Plus Jakarta Sans, system-ui, sans-serif' fontWeight='600' fontSize='7' letterSpacing='1.5'>
      PROTEIN
    </text>
    <path d='M30 22h140l8 196a10 10 0 0 1-10 10H32a10 10 0 0 1-10-10z' fill={`url(#s-${id})`} />
  </svg>
);

export default ProductArt;
