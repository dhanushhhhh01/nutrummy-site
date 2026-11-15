import React, { useState } from "react";

import ProductArt from "./ProductArt";

/*
 * Shows the real product photo from public/products/<id>.png when it exists,
 * and falls back to the drawn SVG pouch otherwise. To add or replace a photo,
 * drop a PNG named after the product id (lupicrunch, oats, pancake, cookie)
 * into public/products/. A transparent background looks best.
 */
const ProductImage = ({ product, size = "card", className = "" }) => {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}products/${product.id}.png`;

  if (failed) {
    if (size === "thumb")
      return (
        <div
          className={`rounded-md flex flex-col items-center justify-center text-center ${className}`}
          style={{ background: product.body }}
          aria-hidden
        >
          <span className='text-[9px] font-bold text-[#FFF4E0] leading-none'>{product.short[0]}</span>
          <span className='text-[7px] font-bold tracking-wider mt-0.5' style={{ color: product.accent }}>
            {product.short[1]}
          </span>
        </div>
      );
    return (
      <ProductArt id={product.id} short={product.short} protein={product.protein} body={product.body} accent={product.accent} />
    );
  }

  return (
    <img
      src={src}
      alt={size === "thumb" ? "" : `${product.name} pack`}
      loading='lazy'
      onError={() => setFailed(true)}
      className={
        size === "thumb"
          ? `object-contain ${className}`
          : `h-[200px] w-auto max-w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.25)] ${className}`
      }
    />
  );
};

export default ProductImage;
