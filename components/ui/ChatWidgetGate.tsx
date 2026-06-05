"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./ChatWidget";

// Full-screen tool/embed routes should not show the floating chat widget —
// it would overlay the builder and bleed into <iframe> embeds.
const HIDE_ON = ["/embed", "/experiments/pergola-builder"];

export function ChatWidgetGate() {
  const pathname = usePathname();
  if (pathname && HIDE_ON.some((p) => pathname.startsWith(p))) return null;
  return <ChatWidget />;
}
