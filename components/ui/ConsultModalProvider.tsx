"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ConsultModal } from "./ConsultModal";
import { PRODUCT_SLUGS, type ProductSlug } from "@/lib/validators";

interface ConsultModalContextValue {
  /** Opens the consult modal. If a product slug is passed, it preselects that
   *  product so the lead lands on the right specialist's calendar. */
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

export function ConsultModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<ProductSlug | undefined>();
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((productSlug?: ProductSlug | string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setPreselectedProduct(asProductSlug(productSlug));
    setIsOpen(true);
  }, []);

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
