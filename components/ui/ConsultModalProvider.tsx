"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { ConsultModal } from "./ConsultModal";
import { PRODUCT_SLUGS, type ProductSlug } from "@/lib/validators";

interface ConsultModalContextValue {
  /** Opens the consult modal. If a product slug is passed, it preselects that
   *  product. If not, we infer from the current pathname so a CTA on
   *  /products/louvered-pergolas auto-selects Louvered Pergolas. */
  openModal: (productSlug?: ProductSlug | string) => void;
}

const ConsultModalContext = createContext<ConsultModalContextValue>({
  openModal: () => {},
});

function asProductSlug(value: string | undefined): ProductSlug | undefined {
  if (!value) return undefined;
  return (PRODUCT_SLUGS as readonly string[]).includes(value)
    ? (value as ProductSlug)
    : undefined;
}

/**
 * Extract a product slug from a Next.js pathname. Matches /products/<slug>
 * exactly so blog posts, gallery pages, etc. don't accidentally preselect.
 */
function productFromPath(pathname: string | null): ProductSlug | undefined {
  if (!pathname) return undefined;
  const match = pathname.match(/^\/products\/([^/]+)/);
  return asProductSlug(match?.[1]);
}

export function ConsultModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<ProductSlug | undefined>();
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(
    (productSlug?: ProductSlug | string) => {
      triggerRef.current = document.activeElement as HTMLElement;
      // Explicit slug wins; otherwise infer from the URL.
      const explicit = asProductSlug(productSlug);
      setPreselectedProduct(explicit ?? productFromPath(pathname));
      setIsOpen(true);
    },
    [pathname]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  return (
    <ConsultModalContext.Provider value={{ openModal }}>
      {children}
      <ConsultModal isOpen={isOpen} onClose={closeModal} preselectedProduct={preselectedProduct} />
    </ConsultModalContext.Provider>
  );
}

export function useConsultModal() {
  return useContext(ConsultModalContext);
}
