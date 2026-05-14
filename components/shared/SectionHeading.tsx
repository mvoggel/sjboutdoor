interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  center = false,
  light = false,
}: SectionHeadingProps) {
  const align = center ? "text-center" : "";
  const headingColor = light ? "text-[var(--bg-pure)]" : "text-[var(--ink-primary)]";
  const bodyColor = light ? "text-[rgba(252,251,247,0.8)]" : "text-[var(--ink-muted)]";

  return (
    <div className={`mb-12 md:mb-16 ${align}`}>
      {eyebrow && (
        <p className={`text-eyebrow mb-3 ${light ? "!text-[var(--rich-warm)]" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-h2 ${headingColor}`}>{heading}</h2>
      {subheading && (
        <p
          className={`mt-4 max-w-2xl text-lg ${bodyColor} ${center ? "mx-auto" : ""}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
