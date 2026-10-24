import { useState, useEffect } from "react";
import { detectLanguageFromBrowser } from "./utils/langDetector";
import Context from "./Context";
const ContextProvider = ({ children }) => {
  const currantLang = detectLanguageFromBrowser();
  useEffect(() => {
    document.documentElement.lang = currantLang; // надо разобраться как это работает, а то не понятно.
  }, [currantLang]);
  const [lang, setLanguage] = useState(currantLang);
  const [eventsPossible, setEvantsPossible] = useState(true);
  
  const setLang = (lang) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };
  
  return (
    <Context
      value={{
        lang,
        setLang,
        eventsPossible,
        setEvantsPossible,
      }}
    >
      {children}
    </Context>
  );
};
export default ContextProvider;
