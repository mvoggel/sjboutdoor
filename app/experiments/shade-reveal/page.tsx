import type { Metadata } from "next";
import { ShadeReveal } from "./ShadeReveal";

export const metadata: Metadata = {
  title: "Shade Reveal — Experiment",
  robots: { index: false, follow: false },
};

export default function ShadeRevealExperimentPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Experiment · not linked from production
          </p>
          <h1
            className="text-3xl md:text-4xl mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Shade Reveal
          </h1>
          <p className="text-white/60 max-w-2xl text-sm leading-relaxed">
            Test build for a motorized-shade closing animation. CSS preview runs
            from the two source photos; once a Blender render is dropped at{" "}
            <code className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded">
              /public/experiments/shade-reveal/shade-close.webm
            </code>
            , the component auto-swaps to the video.
          </p>
        </header>

        <ShadeReveal />

        <section className="mt-10 grid gap-6 md:grid-cols-2 text-sm">
          <div className="rounded-lg border border-white/10 p-5">
            <h2 className="font-medium mb-2">What you&apos;re seeing</h2>
            <p className="text-white/60 leading-relaxed">
              The animation scrubs through when the frame enters the viewport.
              The CSS version uses{" "}
              <code className="font-mono text-xs">clip-path</code> to reveal the
              closed-state photo from the top edge — a fast approximation of
              what Blender will produce with proper easing, motion blur, and a
              subtle camera dolly for parallax.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 p-5">
            <h2 className="font-medium mb-2">Next steps</h2>
            <ol className="text-white/60 leading-relaxed list-decimal list-inside space-y-1">
              <li>Save both garage photos to the public folder.</li>
              <li>Follow <code className="font-mono text-xs">BLENDER_STEPS.md</code>.</li>
              <li>Drop the rendered WebM and reload this page.</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
