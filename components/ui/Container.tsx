interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as,
}: ContainerProps) {
  // Give the polymorphic element explicit children-accepting props — otherwise
  // React 19's broad ElementType collapses `children` to `never` (TS2745).
  const Tag = (as ?? "div") as React.ElementType<{
    className?: string;
    children?: React.ReactNode;
  }>;
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
