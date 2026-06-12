import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const translations = import.meta.glob<Record<string, any>>("./*/**.json", { eager: true });

type Resources = Record<string, Record<string, any>>;
const resources: Resources = {};

Object.entries(translations).forEach(([path, module]) => {
  const match = path.match(/\.\/(\w+)\/(\w+)\.json$/);
  if (!match) return;

  const [, lang, namespace] = match;
  if (!resources[lang]) {
    resources[lang] = {};
  }
  resources[lang][namespace] = module.default;
});

i18n.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  detection: {
    order: ["localStorage", "cookie", "navigator"],
    caches: ["localStorage", "cookie"],
  },
  resources
});

export default i18n;