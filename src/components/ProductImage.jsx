import React, { useState } from "react";

import ProductArt from "./ProductArt";

/*
 * Real product photo from public/products/<id>.jpg (taken from the NUTRUMMY reference site).
 * Pack shots (product.imageFit === "contain") are shown whole on white; styled scenes fill the frame.
 * Falls back to the drawn SVG pouch if a photo is missing.
 */
const ProductImage = ({ product, size = "card", className = "" }) => {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}products/${product.id}.jpg`;
  const contain = product.imageFit === "contain";

  if (failed) {
    if (size === "thumb")
      return (
        <div
          className={`rounded-md flex flex-col items-center justify-center text-center ${className}`}
          style={{ background: product.body }}
          aria-hidden
        >
          <span className='text-[9px] font-bold text-[#FFF4E0] leading-none'>{product.short[0]}</span>
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
      className={`w-full h-full ${contain ? "object-contain bg-[#F4F4F4]" : "object-cover"} ${className}`}
    />
  );
};

export default ProductImage;
