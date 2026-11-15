import React, { lazy, Suspense } from "react";

// The 3D scenes (three.js, react-three-fiber, drei) load as a separate chunk after the page
// renders, so text and product photos appear without waiting for the 3D libraries.
const lazyCanvas = (load) => {
  const Comp = lazy(load);
  const Wrapped = (props) => (
    <Suspense fallback={null}>
      <Comp {...props} />
    </Suspense>
  );
  return Wrapped;
};

export const BowlCanvas = lazyCanvas(() => import("./Bowl"));
export const BallCanvas = lazyCanvas(() => import("./Ball"));
export const PouchCanvas = lazyCanvas(() => import("./Pouch"));
export const GrainsCanvas = lazyCanvas(() => import("./Grains"));
