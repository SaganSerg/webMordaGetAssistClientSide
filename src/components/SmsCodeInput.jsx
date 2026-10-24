import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { webProtocol, domen, port } from "./../config.json";
import useContextHook from "./../hooks/ContextHook";
import getContent from "./../utils/getContent.js";
import customFetch from "./../utils/customFetch.js";
import { smsCodeLength } from "./../config.json";
import storage from "./../utils/storage.js";

export default function SmSCodeInput({
  componentRef,
  countdown,
  url,
  errors, // errors.notCorrectAccesseCode
  fun,
  auth,
}) {
  const context = useContextHook();
  const [smSCodeInput, setSmsCodeInput] = useState("");
  // const notCorrectAccesseCode = useRef();
  const navigate = useNavigate();
  const sendButton = useRef();
  // const formErrorNoTelephone = useRef();
  const telephoneNumber = storage.sessionLoadData("accountPhoneNumber");
  return (
    <form
      className="auth-form verification-form verification-form-sms"
      ref={componentRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (smsCodeLength !== smSCodeInput.length) {
          return errors.notCorrectAccesseCode.current.classList.add(
            "is-visible",
          );
        }
        const accountPhoneNumber =
          storage.sessionLoadData("accountPhoneNumber");
        return customFetch({
          url: `${webProtocol}://${domen}:${port}${url}`,
          fun,
          method: "POST",
          body: JSON.stringify({
            telephoneNumber,
            smsCode: smSCodeInput,
          }),
          context,
          auth,
          spinnerElemRef: sendButton,
          navigate,
        });
      }}
    >
      <fieldset className="form-fieldset">
        <legend className="form-legend">
          Введите код доступа полученный по СМС
        </legend>
        <label className="form-label" htmlFor="smsCode">
          Код доступа
        </label>
        <input
          className="form-input verification-code-input"
          type="text"
          id="smsCode"
          placeholder="XXXXX"
          // maxLength="5"
          // minLength="5"
          value={smSCodeInput}
          onChange={(event) => {
            const value = event.target.value;
            if (/^[0-9]*$/.test(value) && value.length <= smsCodeLength)
              setSmsCodeInput(value);
          }}
        />

        <div ref={errors.notCorrectAccesseCode} className="form-error">
          Вы ввели некорректный код доступа, либо срок действия кода доступа
          истек!!
        </div>
        {/* <div ref={formErrorNoTelephone} className="form-error"></div> */}
        <div className="code-timer">
          {countdown ?? "Время истекло!!!"}{" "}
          <span className="code-timer-unit">
            {countdown ? "секунд" : "Вам нужно запросить новую СМС!"}
          </span>
        </div>
      </fieldset>
      <button className="form-submit-button" type="submit" ref={sendButton}>
        Отправить код регистрации
      </button>
    </form>
  );
}
