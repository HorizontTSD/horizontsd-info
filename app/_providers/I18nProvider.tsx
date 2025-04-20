"use client";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { dictionaries, getDictionary } from "../../dictionaries";
import { Dictionary, AppDictionary } from "../_components/types";

interface I18nContextType<T extends Dictionary = Dictionary> {
  dicts: string[];
  dict: T | null;
  lang: string;
  setLang: (lang: string) => void;
}

const I18nContext = React.createContext<I18nContextType<AppDictionary> | null>(null);

interface I18nProviderProps {
  lang: string;
  children: React.ReactNode;
}

export function I18nProvider({ lang, children }: I18nProviderProps) {
  const [dicts] = useState<string[]>(Object.keys(dictionaries));
  const [dict, setDict] = useState<AppDictionary | null>(null);
  const [currentLang, setCurrentLang] = useState<string>(lang);

  useEffect(() => {
    getDictionary(currentLang).then((response: AppDictionary) => {
      setDict(response);
    });
  }, [currentLang]);

  if (!dict) return null;

  return (
    <I18nContext.Provider
      value={{
        dicts,
        dict,
        lang: currentLang,
        setLang: setCurrentLang
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}