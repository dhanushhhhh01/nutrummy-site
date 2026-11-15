import * as THREE from "three";

const DISPLAY = '"Plus Jakarta Sans", system-ui, sans-serif';
const SANS = '"Plus Jakarta Sans", system-ui, sans-serif';

/** Draws the NUTRUMMY pouch front label onto a 2D canvas. */
export const drawPouchLabel = (canvas) => {
  const w = 600;
  const h = 840;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Body
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#4a2812");
  bg.addColorStop(1, "#1c0e05");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Gold top band
  const band = ctx.createLinearGradient(0, 0, w, 0);
  band.addColorStop(0, "#ffd56b");
  band.addColorStop(1, "#e09a12");
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, w, 120);

  ctx.textAlign = "center";
  ctx.fillStyle = "#24150b";
  ctx.font = `700 64px ${DISPLAY}`;
  ctx.fillText("NUTRUMMY", w / 2, 82);

  ctx.fillStyle = "#c9b8a6";
  ctx.font = `600 22px ${SANS}`;
  ctx.fillText("LUPIN SUPERFOOD", w / 2, 170);

  // Product name
  ctx.fillStyle = "#fff4e0";
  ctx.font = `700 104px ${DISPLAY}`;
  ctx.fillText("Lupi", w / 2, 290);
  ctx.fillStyle = "#f5b82e";
  ctx.font = `700 96px ${DISPLAY}`;
  ctx.fillText("CRUNCH", w / 2, 385);

  ctx.fillStyle = "#fff4e0";
  ctx.font = `500 28px ${SANS}`;
  ctx.fillText("High Protein Muesli · Chocolate", w / 2, 435);

  // Bowl illustration
  ctx.save();
  ctx.translate(w / 2, 600);
  ctx.fillStyle = "#fff4e0";
  ctx.beginPath();
  ctx.ellipse(0, -20, 150, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  const clusters = ["#8a5a2b", "#c48a3a", "#f5b82e", "#5d3518", "#B82C45"];
  for (let i = 0; i < 46; i++) {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 18 + ((i * 37) % 120);
    ctx.fillStyle = clusters[i % clusters.length];
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r, -26 + Math.sin(a) * r * 0.16, 9 + (i % 4) * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#e7dccd";
  ctx.beginPath();
  ctx.moveTo(-160, -16);
  ctx.quadraticCurveTo(-150, 110, 0, 112);
  ctx.quadraticCurveTo(150, 110, 160, -16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f5b82e";
  ctx.fillRect(-160, 20, 320, 10);
  ctx.restore();

  // Protein badge
  ctx.save();
  ctx.translate(470, 520);
  ctx.rotate(-0.25);
  ctx.fillStyle = "#B82C45";
  ctx.beginPath();
  ctx.arc(0, 0, 78, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff4e0";
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.arc(0, 0, 66, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff4e0";
  ctx.font = `700 58px ${DISPLAY}`;
  ctx.fillText("35g", 0, 12);
  ctx.font = `700 18px ${SANS}`;
  ctx.fillText("PROTEIN", 0, 40);
  ctx.restore();

  // Footer claims
  ctx.fillStyle = "#f5b82e";
  ctx.fillRect(40, 760, w - 80, 2);
  ctx.fillStyle = "#fff4e0";
  ctx.font = `600 24px ${SANS}`;
  ctx.fillText("0g REFINED SUGAR  ·  ZERO MAIDA", w / 2, 805);

  return canvas;
};

/** Plain back label. */
export const drawPouchBack = (canvas) => {
  const w = 600;
  const h = 840;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#3d200d");
  bg.addColorStop(1, "#1c0e05");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#f5b82e";
  ctx.fillRect(0, 0, w, 120);
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff4e0";
  ctx.font = `700 52px ${DISPLAY}`;
  ctx.fillText("Every ingredient", 50, 230);
  ctx.fillStyle = "#f5b82e";
  ctx.fillText("earns its place.", 50, 295);
  ctx.fillStyle = "#c9b8a6";
  ctx.font = `500 26px ${SANS}`;
  [
    "Sweet Lupin super legume",
    "30% ancient multigrains",
    "Roasted California almonds",
    "Rich cocoa solids",
    "Monk fruit sweetness",
  ].forEach((line, i) => {
    ctx.fillStyle = "#f5b82e";
    ctx.fillText("✓", 50, 400 + i * 62);
    ctx.fillStyle = "#fff4e0";
    ctx.fillText(line, 95, 400 + i * 62);
  });
  return canvas;
};

/** "Periodic table" tile decal for the ingredient spheres. */
export const drawElement = (canvas, symbol, stat) => {
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = "rgba(61,26,77,0.94)";
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(28, 28, 200, 200, 26) : ctx.rect(28, 28, 200, 200);
  ctx.fill();
  ctx.strokeStyle = "#F5B82E";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFF4E0";
  ctx.font = `700 110px ${DISPLAY}`;
  ctx.fillText(symbol, 128, 150);
  ctx.fillStyle = "#F5B82E";
  ctx.font = `600 24px ${SANS}`;
  ctx.fillText(stat.toUpperCase(), 128, 200);
  return canvas;
};

export const makeCanvasTexture = (draw, ...args) => {
  const canvas = document.createElement("canvas");
  draw(canvas, ...args);
  const texture = new THREE.CanvasTexture(canvas);
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 8;
  return texture;
};

/** Redraw once web fonts have loaded so labels use Plus Jakarta Sans. */
export const refreshWhenFontsReady = (texture, draw, ...args) => {
  if (!document.fonts?.ready) return;
  document.fonts.ready.then(() => {
    draw(texture.image, ...args);
    texture.needsUpdate = true;
  });
};
