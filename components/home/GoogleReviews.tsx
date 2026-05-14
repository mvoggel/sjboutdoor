"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const REVIEWS = [
  {
    id: 1,
    text: "From the initial walk-through with Zach to the installation with Ian and Nick — the attention to detail was outstanding. We now have climate control year-round, and shade with the press of a button.",
    author: "Wayne",
    category: "Outdoor Pavilion",
  },
  {
    id: 2,
    text: "Installer Ian was amazing. I've dealt with many contractors and would hire him for anything. He made it look like the product was crafted right into the pillars — had to cut stone to get the right fit. Beautiful job.",
    author: "Noreen McTamney",
    category: "Motorized Outdoor Installation",
  },
  {
    id: 3,
    text: "The professionalism of the crew was beyond my expectations. On time, efficient, made sure we knew how to work the system, and didn't leave a speck of dirt behind. So friendly and helpful.",
    author: "Erin Wetzel",
    category: "Install Experience",
  },
  {
    id: 4,
    text: "Our louvered pergola transformed our lanai into a space we use every single day. The motorization is seamless and the quality is evident — this is a product built to last in the Florida heat.",
    author: "David & Pamela H.",
    category: "Louvered Pergola",
  },
  {
    id: 5,
    text: "We had exterior shades installed on three sides of our outdoor kitchen. The difference is night and day — keeps the space cool, bug-free, and private. Couldn't be happier with how it turned out.",
    author: "Karen S.",
    category: "Exterior Shades",
  },
  {
    id: 6,
    text: "SJBB was referred by our interior designer and now I know why. The awning fabric is stunning and the motorized operation is whisper-quiet. Our porch has become our favorite spot in the house.",
    author: "Michael & Lori T.",
    category: "Retractable Awning",
  },
  {
    id: 7,
    text: "Zach came out to measure and was incredibly knowledgeable — no pressure whatsoever, just honest advice. The installation was flawless and the team cleaned up perfectly. Already recommended to three neighbors.",
    author: "Christine B.",
    category: "Shade & Privacy Screens",
  },
];

// Triplicate so both rows loop seamlessly at any window width
const REVIEWS_A = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const REVIEWS_B = [...REVIEWS, ...REVIEWS, ...REVIEWS];

function Stars() {
  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="var(--rich-warm)"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div
      style={{
        width: "360px",
        flexShrink: 0,
        padding: "2rem 2rem 1.75rem",
        background: "var(--bg-pure)",
        border: "1px solid rgba(184, 146, 74, 0.18)",
        marginRight: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Decorative quote */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "3.5rem",
          lineHeight: 0.8,
          color: "var(--rich-warm)",
          opacity: 0.5,
          marginBottom: "1.25rem",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--ink-primary)",
          flex: 1,
        }}
      >
        {review.text}
      </p>

      <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--rich-sand)", paddingTop: "1rem" }}>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--ink-primary)",
            fontWeight: 400,
          }}
        >
          {review.author}
        </p>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            marginTop: "0.2rem",
          }}
        >
          Google Review · {review.category}
        </p>
      </div>
    </div>
  );
}

function MarqueeRow({
  reviews,
  direction,
  duration,
  paused,
}: {
  reviews: (typeof REVIEWS)[number][];
  direction: "left" | "right";
  duration: number;
  paused: boolean;
}) {
  const animation =
    direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${animation} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {reviews.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function GoogleReviews() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      style={{ background: "var(--rich-sand)", paddingTop: "5rem", paddingBottom: "2rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <Container>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <Stars />
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.5rem",
              color: "var(--ink-muted)",
              letterSpacing: "0.04em",
            }}
          >


            528 verified 5-starGoogle reviews for South Jersey Blinds, our parent company
          </p>
        </div>
      </Container>

      {/* Single row — drifts left */}
      <MarqueeRow
        reviews={REVIEWS_A}
        direction="left"
        duration={55}
        paused={paused}
      />
    </section>
  );
}
