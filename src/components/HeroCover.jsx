import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-b-2xl border border-neutral-800 bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient and vignette overlays that don't block Spline interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_40%,rgba(0,255,170,0.08),transparent)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
            Build a realtime, collaborative canvas editor
          </h1>
          <p className="mt-4 text-neutral-200/80 sm:text-lg">
            Infinite canvas, layers, properties, and multiplayer sync — designed with modular patterns for scale.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#editor"
              className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400"
            >
              Open Editor
            </a>
            <a
              href="#overview"
              className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
