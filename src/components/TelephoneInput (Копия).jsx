// используются двух-буквенные коды стран согласно ISO 3166
// RU CN TR
import { useState, useContext } from "react";
import { defaultCounty, countryList } from "./../config.json";
// import contents from "./../data/contents.json";
import Context from "./../Context.js";
// import Content from './Content';
import getContent from './../utils/getContent.js'

const contentIndexArr = [
  // важно четко сопоставить название страны и индекс в файле контента
  [7, "RU"],
  [8, "TR"],
  [9, "CN"],
];

export default function TelephoneInput() {
  
  const { contents, lang, currentPage, eventsPossible } = useContext(Context);
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [inputAble, setInputAble] = useState(false);
  const [templateTel, setTemplateTel] = useState(null)
  const [countryListVisible, setCountryVisible] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(null);
  // const placeholder = contents[lang]["10"].value
  const placeholder = getContent("10")
  function placehoderModification(stringPlaceholder, unvisibleNumber) {
    let madeString = [];
    for (let i = 0; i < stringPlaceholder.length; i++) {
      madeString.push(
        <span
          key={i}
          style={{ visibility: unvisibleNumber < i ? "visible" : "hidden" }}
        >
          {stringPlaceholder[i]}
        </span>,
      );
    }
    return madeString;
  }
  function getSymbolIndices(str, symbol) {
    const indices = [];
    let index = str.indexOf(symbol);
    while (index !== -1) {
      indices.push(index);
      index = str.indexOf(symbol, index + 1);
    }
    return indices.map((x) => x - 1);
  }

  return (
    <>
      <div onClick={() => setCountryVisible(!countryListVisible)}>
        Выберите код страны
        <ul>
        {contentIndexArr.map((e, i) => {
          const dictionaryIndex = e[0];
          // const country = contents[lang][dictionaryIndex].value;
          const country = getContent(dictionaryIndex)
          const blueprint = countryList[e[1]].phonePlaceholder;
          const countryPhoneIndex = blueprint.slice(
            0,
            blueprint.indexOf("(") + 1,
          );
          return (
            <li
              style={{ display: countryListVisible ? "block" : "none" }}
              key={i}
              onClick={() => {
                setInputAble(true);
                // setPlaceholder(blueprint);
                setPhoneInputValue(countryPhoneIndex);
                setPhoneIndex(countryPhoneIndex);
                setTemplateTel(blueprint)
              }}
            >
              {country + " phone code " + countryPhoneIndex + " " + e[1]}
            </li>
          );
        })}
        </ul>
      </div>
      <div style={{}} >
        <div style={{}} >
          {/* {placehoderModification(placeholder, unvisibleNumber)} */}
          {templateTel}
        </div>
        <form onSubmit={() => {}}>
          <input
            className="placehoderPhone"
            type="tel"
            onChange={(e) => {
              let value = e.target.value;
              if (/^[0-9()\-+.]+$/.test(value)) {
                if (value.length > phoneInputValue.length) {
                  if (value.length > templateTel.length) {
                    return;
                  }
                  getSymbolIndices(templateTel, ")").forEach((x) => {
                    if (value.length - 1 === x) {
                      value += ")";
                    }
                  });
                  getSymbolIndices(templateTel, "-").forEach((x) => {
                    if (value.length - 1 === x) {
                      value += "-";
                    }
                  });
                  setPhoneInputValue(value);
                  return;
                } else {
                  if (value.length <= phoneIndex.length) {
                    return setPhoneInputValue(phoneIndex);
                  }
                  setPhoneInputValue(value);
                  return;
                }
              }
              return;
            }}
            value={phoneInputValue}
            onFocus={() => {}}
            // placeholder={contents[lang]["10"].value}
            placeholder={placeholder}
            style={{
              pointerEvents: inputAble ? "auto" : "none"
            }}
          />
          <button>send</button>
        </form>
      </div>
    </>
  );
}
