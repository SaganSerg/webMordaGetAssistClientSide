import TelephoneInput from "./TelephoneInput";
import SmsCodeInput from "./SmsCodeInput";
import turnActive from "./../utils/turnActive.js";
import { useRef, useState } from "react";
export default function EmailOrPhoneBlock({
  isHome,
  authTabButtonTelephone,
  authTabButtonEmail,
  telephoneInputParams, // componentRef, showSmsFormFun, startCountdownFun, url, fun, errors{timeIsUp, notCorrectTelephoneNumber}, auth, forRegistrationAccount
  smsCodeInputParams, // componentRef, countdown, url, errors.{notCorrectAccesseCode}, fun, auth, forRegistrationAccount
  emailInputParams, // componentRef
  emailCodeInputParams, // componentRef

  showSmsFormFunForms,
  showSmsFormFunButtons,
}) {
  return (
    <>
      <ul className={`auth-tabs ${!isHome ? " vehicle-add-tabs " : null}`}>
        <li className="auth-tab-item">
          <button
            className="auth-tab-button active"
            type="button"
            onClick={() => {
              turnActive(
                telephoneInputParams.componentRef,
                authTabButtonTelephone,
                showSmsFormFunButtons,
                showSmsFormFunForms,
              );
            }}
            ref={authTabButtonTelephone}
          >
            По номеру телефона
          </button>
        </li>
        <li className="auth-tab-item">
          <button
            className="auth-tab-button"
            type="button"
            onClick={() => {
              turnActive(
                emailInputParams.componentRef,
                authTabButtonEmail,
                showSmsFormFunButtons,
                showSmsFormFunForms,
              );
            }}
            ref={authTabButtonEmail}
          >
            По адресу электронной почты
          </button>
        </li>
      </ul>
      <form
        className="auth-form auth-form-email"
        ref={emailInputParams.componentRef}
      >
        <fieldset className="form-fieldset">
          <legend className="form-legend">Введите Email</legend>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            type="email"
            id="email"
            placeholder="your@email.com"
            autoComplete="email"
          />
          <div className="form-error">Введите корректный email</div>
        </fieldset>
        <button className="form-submit-button" type="submit">
          Получить код регистрации на эл. почту
        </button>
      </form>
      <form
        className="auth-form verification-form verification-form-email"
        ref={emailCodeInputParams.componentRef}
      >
        <fieldset className="form-fieldset">
          <legend className="form-legend">
            Введите код доступа полученный по email
          </legend>
          <label className="form-label" htmlFor="emailCode">
            Код доступа
          </label>
          <input
            className="form-input verification-code-input"
            type="text"
            id="emailCode"
            placeholder="XXXXX"
          />
          <div className="form-error">Введите корректный код доступа</div>
          <div className="code-timer">
            100 <span className="code-timer-unit">секунд</span>
          </div>
        </fieldset>
        <button className="form-submit-button" type="submit">
          Отправить код регистрации
        </button>
      </form>
      <TelephoneInput
        componentRef={telephoneInputParams.componentRef}
        url={telephoneInputParams.url}
        fun={telephoneInputParams.fun}
        errors={telephoneInputParams.errors}
        auth={telephoneInputParams.auth}
        showSmsFormFun={telephoneInputParams.showSmsFormFun}
        forRegistrationAccount={telephoneInputParams.forRegistrationAccount}
      />
      <SmsCodeInput
        componentRef={smsCodeInputParams.componentRef}
        countdown={smsCodeInputParams.countdown}
        url={smsCodeInputParams.url}
        errors={smsCodeInputParams.errors}
        fun={smsCodeInputParams.fun}
        auth={smsCodeInputParams.auth}
      />
    </>
  );
}
