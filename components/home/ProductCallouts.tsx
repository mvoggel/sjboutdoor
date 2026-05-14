"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

// TODO: replace with licensed product photography before launch
const PRODUCTS = [
  {
    slug: "exterior-shades",
    eyebrow: "01 / Shade",
    name: "Exterior Shades & Shutters",
    descriptor: "Motorized precision meets architectural elegance. Hover to see our product line - click to see it in action.",
    href: "/products/exterior-shades",
    // High-quality luxury home exterior — Unsplash placeholder
    image: "/img/products/shades2.png",
    alt: "Luxury home exterior with elegant shutters",
  },
  {
    slug: "retractable-awnings",
    eyebrow: "02 / Awning",
    name: "Retractable Awnings",
    descriptor: "Shade on demand. Style without compromise.",
    href: "/products/retractable-awnings",
    image: "/img/products/awning.png",
    alt: "Elegant outdoor terrace with retractable awning",
  },
  {
    slug: "louvered-pergolas",
    eyebrow: "03 / Pergola",
    name: "Louvered Pergolas",
    descriptor: "Transform your outdoor space into a year-round retreat.",
    href: "/products/louvered-pergolas",
    image: "/img/products/pergolas.jpg",
    alt: "Modern louvered pergola in a Florida outdoor living space",
  },
];

export function ProductCallouts() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="products"
      className="py-14 md:py-20"
      style={{ background: "var(--bg-pure)" }}
    >
      <Container>
        <SectionHeading
          eyebrow="Our Products"
          heading="Crafted for Florida living."
          subheading="Each product is custom-fabricated to your space, your style, and the Florida climate."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: prefersReducedMotion ? 0 : i * 0.1,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    <Link
      href={product.href}
      className="group block rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 2px 16px rgba(14,26,31,0.07)" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/5" }}
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Content block */}
      <div
        className="p-6"
        style={{ background: "var(--bg-bright)" }}
      >
        <p className="text-eyebrow mb-2">{product.eyebrow}</p>
        <h3 className="text-h3 mb-1" style={{ color: "var(--ink-primary)" }}>
          {product.name}
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--ink-muted)" }}>
          {product.descriptor}
        </p>

        {/* Brass underline — animates in on card hover */}
        <span
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5"
          style={{ color: "var(--rich-warm)" }}
        >
          Learn more
          <ArrowRight size={14} />
        </span>
        <div
          className="h-px mt-2 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: "var(--rich-warm)" }}
        />
      </div>
    </Link>
  );
}
