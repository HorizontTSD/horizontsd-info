"use client";
import { useConsent } from "@/app/_providers/ConsentProvider";
import ConsentModal from "./ConsentModal";

export default function ConsentWrapper() {
  const { showConsent } = useConsent();
  
  if (!showConsent) return null;
  
  return <ConsentModal />;
}
