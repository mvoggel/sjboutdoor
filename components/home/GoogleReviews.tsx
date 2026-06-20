"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const REVIEWS = [
  {
    id: 1,
    text: "I installed a motorized outdoor awning and patio motorized screens. The staff is amazing and professional — sales, electrician, and installer. Ian made it look like the product was crafted into my pillars with Azek, cutting stone to get the right fit. Beautiful job. I can't say enough.",
    author: "Noreen McTamney",
    category: "Awning & Motorized Screens",
  },
  {
    id: 2,
    text: "Just had a new awning installed. Our estimator Jared was professional and courteous, and installers Anthony and Brendon were meticulous with the install and cleanup, taking care not to damage our home. Can't say enough good things about this company.",
    author: "Greg L.",
    category: "Retractable Awning",
  },
  {
    id: 3,
    text: "We had retractable shades installed on our outdoor pavilion. Too much sun in summer, too cold in fall and winter — they had the solution for both. From Zach's detailed quote to the install by Ian and Nick, the attention to detail was outstanding. Climate control year-round at the press of a button.",
    author: "Wayne",
    category: "Pavilion Retractable Shades",
  },
  {
    id: 4,
    text: "The quote was very fair and we appreciated how knowledgeable Rob was about the different options. Extremely patient, thorough, and never pushy — he took the time to understand what we wanted and made thoughtful recommendations. Highly recommend for quality, honest pricing, and great service.",
    author: "Christian Sanchez",
    category: "Blinds & Shades",
  },
  {
    id: 5,
    text: "We had outdoor motorized zipper shades installed on our back deck for protection from sun, wind, and insects — the perfect solution. Robbie and Ian were incredibly easy to deal with and made it a smooth experience. Highly recommended!",
    author: "Robert Cruise",
    category: "Motorized Zipper Shades",
  },
  {
    id: 6,
    text: "Just installed a 33-foot awning at my restaurant and it's absolutely stunning! The guys did a great job — super quick and efficient. This is my third awning with this company and I highly recommend.",
    author: "Peter",
    category: "Commercial Awning",
  },
  {
    id: 7,
    text: "Rob and his team are by far the best for your window treatment needs. Plenty of options and designs to work within your budget, and their prices and install work surpass any others in the area. We've used them for our clients for years and couldn't be more grateful for the service they provide.",
    author: "Kristine Grasso",
    category: "Window Treatments",
  },
  {
    id: 8,
    text: "All I can say is WOW! We just had outside shades installed on our deck — a huge job over two days. Ian was the consummate professional, doing additional woodworking to conceal items we didn't want to see and keeping the aesthetics beautiful. A wealth of knowledge and responsive throughout. Highly recommend!",
    author: "Mindy Gottenberg",
    category: "Exterior Deck Shades",
  },
  {
    id: 9,
    text: "I'm beyond happy with my new shades. Very professional from start to finish, with an incredible selection of product and good insight on meeting my household needs. The team and installers were proficient, clean, and knowledgeable. My home finally feels complete with a beautiful environment of brightness and privacy.",
    author: "Dan Mercadante",
    category: "Interior Shades",
  },
  {
    id: 10,
    text: "From start to finish this company was very easy to work with. My salesman Jay was professional, not pushy, and informative. Installation was quick once ordered, and the installers were courteous, quick, and tidy. I love my blinds — and their prices were the best as well.",
    author: "Donna Rogers",
    category: "Blinds & Shades",
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
528 verified 5-star Google reviews for South Jersey Blinds, our parent company
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
