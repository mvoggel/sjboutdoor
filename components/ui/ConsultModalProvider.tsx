"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ConsultModal } from "./ConsultModal";

interface ConsultModalContextValue {
  openModal: (productSlug?: string) => void;
}

const ConsultModalContext = createContext<ConsultModalContextValue>({
  openModal: () => {},
});

export function ConsultModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string | undefined>();
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((productSlug?: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setPreselectedProduct(productSlug);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Return focus to the element that opened the modal
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
