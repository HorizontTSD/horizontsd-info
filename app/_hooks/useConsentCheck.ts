"use client";
import { useEffect, useState } from "react";
import { useConsent } from "@/app/_providers/ConsentProvider";

export function useConsentCheck() {
  const { settings, showConsentModal } = useConsent();
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has consented to all policies
    const allConsented = settings.privacyPolicy && settings.cookiePolicy && settings.termsOfService;
    setHasConsented(allConsented);

    // If user hasn't consented to all policies, show the modal after a short delay
    if (!allConsented) {
      const timer = setTimeout(() => {
        showConsentModal();
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, [settings, showConsentModal]);

  return { hasConsented };
}
