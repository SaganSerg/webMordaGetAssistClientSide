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
  errors, // здесь должен объект с элементами errors.timeIsUp и errors.notCorrectTelephoneNumber
  auth,
}) {
  const context = useContextHook();
  const { lang, eventsPossible } = context;
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [inputAble, setInputAble] = useState(false);
  const [templateTel, setTemplateTel] = useState(null);
  const [countryListVisible, setCountryVisible] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(null);
  const navigate = useNavigate();
  // const placeholder = contents[lang]["10"].value
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
    }
    storage.sessionSaveData("accountPhoneNumber", phoneInputValue);
    customFetch({
      url: `${webProtocol}://${domen}:${port}${url}`,
      //   fun: (data) => {
      //     try {
      //       if (!data) throw new Error("Custom error! !data");
      //       if (!data?.result || !data?.description || !data?.responseCode ) throw Error("Custom error! !data.result || !data.description || !data.responseCode");
      //       // data { result: "ERR", description: "The waiting period for requesting a new SMS has not yet expired.", responseCode: "0191002", howMuchTimeLeft: 1791465741487 }
      //       if (data?.responseCode == "0191000") {
      //         errors.notCorrectTelephoneNumber.current.classList.add("is-visible");
      //         return
      //       }
      //       if (data?.responseCode == "0191001") throw Error("Custom error! data?.responseCode == '0191001'");
      //       if (data?.responseCode == "0191002") {
      //         const { howMuchTimeLeft } = data
      //         if (!howMuchTimeLeft ) throw Error("Custom error! !data?.howMuchTimeLeft");
      //         errors.timeIsUp.current.classList.add('is-visible')
      //         return errors.timeIsUp.current.innerHTML = `Вы можете запросить СМС не ранее чем через ${Math.ceil(howMuchTimeLeft / 1000)} секунд`
      //       }
      //       if (data.result == 'ERR') throw new Error("Custom error! data.result == 'ERR'");
      //       if (
      //         !data.timestamp ||
      //         !data.lifetimeSms
      //       )
      //         throw new Error("Custom error! JSON-parameters are lost!");
      //       startCountdownFun(data.timestamp, data.lifetimeSms);
      //       showSmsFormFun();
      //       // setResendSmsRequestPeriod(data.resendSmsRequestPeriod / (1000 * 60));
      //     } catch (e) {
      //       console.error(e);
      //       context.setEvantsPossible(true);
      //       navigate("/error");
      //     }
      //   },
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
              // setCountryVisible(false)
              errors.notCorrectTelephoneNumber.current.classList.remove("is-visible");
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
            // onFocus={() => {setCountryVisible(false)}}
            // placeholder={contents[lang]["10"].value}
            placeholder={placeholder}
            style={{
              pointerEvents: inputAble ? "auto" : "none",
            }}
            id="phone"
          />

          <div className="form-error" ref={errors.notCorrectTelephoneNumber}>
            Введите корректный номер телефона
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
