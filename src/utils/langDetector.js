import { defaultLang } from "./../config.json";
import contents from './../data/contents.json'
export const detectLanguageFromBrowser = () => {
  try {
    // Получаем язык браузера
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.split("-")[0].toLowerCase();

    // Проверяем, поддерживается ли язык
    // const supportedLanguages = ["ru", "tr", "en"];
    // получили список поддежриваемых языков
    const supportedLanguages = Object.keys(contents)

    if (supportedLanguages.includes(lang)) {
      return lang;
    }

    // Проверяем также navigator.languages для более точного определения
    if (navigator.languages && navigator.languages.length > 0) {
      for (const browserLang of navigator.languages) {
        const langPart = browserLang.split("-")[0].toLowerCase();
        if (supportedLanguages.includes(langPart)) {
          return langPart;
        }
      }
    }

    // Проверка через Intl (если доступно)
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
      const formatter = new Intl.DateTimeFormat();
      const locales = formatter.resolvedOptions().locale.split("-");
      if (locales.length > 0) {
        const intlLang = locales[0].toLowerCase();
        if (supportedLanguages.includes(intlLang)) {
          return intlLang;
        }
      }
    }

    // По умолчанию английский
    return defaultLang;
  } catch (error) {
    console.error("Error detecting language:", error);
    return defaultLang;
  }
};
