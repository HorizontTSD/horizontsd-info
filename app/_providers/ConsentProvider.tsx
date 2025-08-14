"use client";
import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface ConsentSettings {
  privacyPolicy: boolean;
  cookiePolicy: boolean;
  termsOfService: boolean;
}

interface ConsentContextType {
  showConsent: boolean;
  settings: ConsentSettings;
  handleAcceptAll: () => void;
  handleDeclineAll: () => void;
  handleAcceptSelected: () => void;
  handleSettingChange: (setting: keyof ConsentSettings) => (checked: boolean) => void;
  showNotification: boolean;
  notificationMessage: string;
  notificationType: "success" | "error" | "info";
  hideNotification: () => void;
  showConsentModal: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = "user-consent-settings";
const CONSENT_SHOWN_KEY = "consent-modal-shown";

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [showConsent, setShowConsent] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    privacyPolicy: false,
    cookiePolicy: false,
    termsOfService: false,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    // Check if user has already made a choice
    const hasShownConsent = localStorage.getItem(CONSENT_SHOWN_KEY);
    const savedSettings = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!hasShownConsent) {
      setShowConsent(true);
    } else if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error("Error parsing consent settings:", error);
      }
    }
  }, []);

  const showNotificationMessage = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  const handleAcceptAll = () => {
    const newSettings = {
      privacyPolicy: true,
      cookiePolicy: true,
      termsOfService: true,
    };

    setSettings(newSettings);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newSettings));
    localStorage.setItem(CONSENT_SHOWN_KEY, "true");
    setShowConsent(false);

    showNotificationMessage("Все политики приняты", "success");
  };

  const handleDeclineAll = () => {
    const newSettings = {
      privacyPolicy: false,
      cookiePolicy: false,
      termsOfService: false,
    };

    setSettings(newSettings);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newSettings));
    localStorage.setItem(CONSENT_SHOWN_KEY, "true");
    setShowConsent(false);

    showNotificationMessage("Все политики отклонены", "info");
  };

  const handleAcceptSelected = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(settings));
    localStorage.setItem(CONSENT_SHOWN_KEY, "true");
    setShowConsent(false);

    const acceptedCount = Object.values(settings).filter(Boolean).length;
    showNotificationMessage(`Принято ${acceptedCount} из 3 политик`, "success");
  };

  const handleSettingChange = (setting: keyof ConsentSettings) => (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: checked,
    }));
  };

  const showConsentModal = () => {
    setShowConsent(true);
  };

  const value: ConsentContextType = {
    showConsent,
    settings,
    handleAcceptAll,
    handleDeclineAll,
    handleAcceptSelected,
    handleSettingChange,
    showNotification,
    notificationMessage,
    notificationType,
    hideNotification,
    showConsentModal,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
