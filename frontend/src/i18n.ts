// src/i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

import translationEN from "./locales/en/translation.json"
import translationDE from "./locales/de/translation.json"

i18n.use(Backend)
    .use(LanguageDetector) // автоматически определяет язык
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEN },
            de: { translation: translationDE }
        },
        fallbackLng: "en", // язык по умолчанию
        interpolation: {
            escapeValue: false // для React не нужно экранирование
        },

        returnEmptyString: false,

        react: {
            useSuspense: true // обязательно, если используешь <Suspense>
        }
    })

export default i18n
