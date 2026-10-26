// используются двух-буквенные коды стран согласно ISO 3166
// RU CN TR
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  defaultCounty,
  countryList,
  webProtocol,
  domen,
  port,
} from "./../config.json";
import useContextHook from "./../hooks/ContextHook";
import getContent from "./../utils/getContent.js";
import customFetch from "./../utils/customFetch.js";
import telephoneNumberNormalizers from "./../utils/normalizers.js";
import storage from "./../utils/storage.js";

const contentIndexArr = [
  // важно четко сопоставить название страны и индекс в файле контента
  [7, "RU"],
  [8, "TR"],
  [9, "CN"],
];

export default function TelephoneInput({
  componentRef,
  showSmsFormFun,
  startCountdownFun,
  url,
  fun,
  errors, // errors.{timeIsUp, notCorrectTelephoneNumber, noSuchPhone}
  auth,
  forRegistrationAccount
}) {
  const context = useContextHook();
  const { lang, eventsPossible } = context;
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [inputAble, setInputAble] = useState(false);
  const [templateTel, setTemplateTel] = useState(null);
  const [countryListVisible, setCountryVisible] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(null);
  const navigate = useNavigate();
  const placeholder = getContent("10") + " Но сначала, выберите код страны";
  const sendButton = useRef();
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
  const submit = (e) => {
    e.preventDefault();
    if (templateTel.length !== phoneInputValue.length) {
      return errors.notCorrectTelephoneNumber.current.classList.add(
        "is-visible",
      );
    };
    const sessionDataName = forRegistrationAccount ?  "accountPhoneNumber" : 'vehiclePhoneNumber'
    storage.sessionSaveData(sessionDataName, phoneInputValue);
    customFetch({
      url: `${webProtocol}://${domen}:${port}${url}`,
      fun,
      method: "POST",
      body: JSON.stringify({
        telephoneNumber: phoneInputValue,
      }),
      context,
      auth,
      spinnerElemRef: sendButton,
      navigate,
    });
  };
  return (
    <>
      <form
        className="auth-form auth-form-phone is-active"
        ref={componentRef}
        onSubmit={submit}
      >
        <fieldset className="form-fieldset">
          <legend className="form-legend">Введите номер телефона</legend>

          <div className="chooseState">
            <div
              className="title"
              onClick={() => setCountryVisible(!countryListVisible)}
            >
              Выберите код страны
            </div>
            <ul
              className="list"
              style={{ display: countryListVisible ? "block" : "none" }}
            >
              {contentIndexArr.map((e, i) => {
                const dictionaryIndex = e[0];
                // const country = contents[lang][dictionaryIndex].value;
                const country = getContent(dictionaryIndex);
                const blueprint = countryList[e[1]].phonePlaceholder;
                const countryPhoneIndex = blueprint.slice(
                  0,
                  blueprint.indexOf("(") + 1,
                );
                return (
                  <li
                    className="item"
                    key={i}
                    onClick={() => {
                      setInputAble(true);
                      // setPlaceholder(blueprint);
                      setPhoneInputValue(countryPhoneIndex);
                      setPhoneIndex(countryPhoneIndex);
                      setTemplateTel(blueprint);
                      setCountryVisible(false);
                    }}
                  >
                    {country + " phone code " + countryPhoneIndex + " " + e[1]}
                  </li>
                );
              })}
            </ul>
          </div>
          <label className="form-label" htmlFor="phone">
            {templateTel}
          </label>
          <input
            className="form-input"
            type="tel"
            onChange={(e) => {
              let value = e.target.value;
              errors.notCorrectTelephoneNumber.current.classList.remove(
                "is-visible",
              );
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
            placeholder={placeholder}
            style={{
              pointerEvents: inputAble ? "auto" : "none",
            }}
            id="phone"
          />
          <div className="form-error" ref={errors.notCorrectTelephoneNumber}>
            Введите корректный номер телефона
          </div>
          <div className="form-error" ref={errors.noSuchPhone}>
            Нет такого номера телефона в базе
          </div>
          <div className="form-error" ref={errors.timeIsUp}></div>
        </fieldset>
        <button className="form-submit-button" ref={sendButton}>
          send
        </button>
      </form>
    </>
  );
}
