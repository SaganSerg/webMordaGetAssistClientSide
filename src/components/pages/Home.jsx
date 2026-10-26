import EmailOrPhoneBlock from "./../EmailOrPhoneBlock";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import storage from "./../../utils/storage.js";
import startCountdownFun from "./../../utils/startCountdown";
import turnActive from "./../../utils/turnActive.js";
import useContextHook from "./../../hooks/ContextHook";
export default function Home() {
  const context = useContextHook();
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();
  const formErrorValidPhoneNumberTelephoneInput = useRef();
  const formErrorTimeoutTelephineInput = useRef();
  const formErrorSmsCodeInput = useRef();
  const authTabButtonTelephone = useRef();
  const authTabButtonEmail = useRef();
  const authFormEmail = useRef();
  const authFormPhone = useRef();
  const verificationFormEmail = useRef();
  const verificationFormSMS = useRef();
  const showSmsFormFunForms = [
    authFormEmail,
    authFormPhone,
    verificationFormEmail,
    verificationFormSMS,
  ];
  const showSmsFormFunButtons = [authTabButtonTelephone, authTabButtonEmail];
  const showSmsFormFun = () => {
    turnActive(
      verificationFormSMS,
      authTabButtonTelephone,
      showSmsFormFunButtons,
      showSmsFormFunForms,
    );
  };
  const errorFormsTelephoneInput = {
    formError: formErrorValidPhoneNumberTelephoneInput,
    formErrorTimeout: formErrorTimeoutTelephineInput,
  };
  const errorFormsSmsCodeInput = { formError: formErrorSmsCodeInput };
  const emailInputParams = { componentRef: authFormEmail };
  const emailCodeInputParams = { componentRef: verificationFormEmail };
  const smsCodeInputParamsErrors = {
    notCorrectAccesseCode: useRef(),
  };
  const smsCodeInputParams = {
    url: "/api/web/getTokensBySms",
    errors: smsCodeInputParamsErrors,
    auth: null,
    fun: (data) => {
      try {
        const errors = smsCodeInputParamsErrors
        if (!data) throw new Error("Custom error! !data");
        if (!data?.result || !data?.description || !data?.responseCode)
          throw new Error(
            "Custom error! !data.result || !data.description || !data.responseCode",
          );
        if (data?.responseCode == "0201000")
          throw new Error("Custom error! data?.responseCode == '0201000'");
        if (data?.responseCode == "0201001")
          throw new Error("Custom error! data?.responseCode == '0201001'");
        if (data?.responseCode == "0201002") // 0201002
          return errors.notCorrectAccesseCode.current.classList.add("is-visible");
        if (data.result == "ERR")
          throw new Error("Custom error! data.result == 'ERR'");
        if (!data.accessToken || !data.refreshToken)
          throw new Error(
            "Custom error! !data.accessToken || !data.refreshToken",
          );
        storage.localSaveData("accessToken", data.accessToken);
        storage.localSaveData("refreshToken", data.refreshToken);
        navigate("/account");
      } catch (e) {
        console.error(e);
        context.setEvantsPossible(true);
        navigate("/error");
      }
    },
    componentRef: verificationFormSMS,
    countdown,
  };
  const telephoneInputParamsErrors = {
    timeIsUp: useRef(),
    notCorrectTelephoneNumber: useRef(),
  };
  const telephoneInputParams = {
    url: "/api/web/getSMS",
    errors: telephoneInputParamsErrors,
    auth: null,
    fun: (data) => {
      try {
        const errors = telephoneInputParamsErrors;
        if (!data) throw new Error("Custom error! !data");
        if (!data?.result || !data?.description || !data?.responseCode)
          throw Error(
            "Custom error! !data.result || !data.description || !data.responseCode",
          );
        if (data?.responseCode == "0191000") {
          errors.notCorrectTelephoneNumber.current.classList.add("is-visible");
          return;
        }
        if (data?.responseCode == "0191001")
          throw Error("Custom error! data?.responseCode == '0191001'");
        if (data?.responseCode == "0191002") {
          const { howMuchTimeLeft } = data;
          if (!howMuchTimeLeft)
            throw Error("Custom error! !data?.howMuchTimeLeft");
          errors.timeIsUp.current.classList.add("is-visible");
          return (errors.timeIsUp.current.innerHTML = `Вы можете запросить СМС не ранее чем через ${Math.ceil(howMuchTimeLeft / 1000)} секунд`);
        }
        if (data.result == "ERR")
          throw new Error("Custom error! data.result == 'ERR'");
        if (!data.timestamp || !data.lifetimeSms)
          throw new Error("Custom error! JSON-parameters are lost!");
        startCountdownFun(data.timestamp, data.lifetimeSms, setCountdown);
        showSmsFormFun();
      } catch (e) {
        console.error(e);
        context.setEvantsPossible(true);
        navigate("/error");
      }
    },
    showSmsFormFun: showSmsFormFun,
    componentRef: authFormPhone,
    forRegistrationAccount: true
  };
  return (
    <>
      <section className="auth-section">
        <h1 className="auth-title">Войти</h1>
        <div className="auth-method-description">
          Выберите метод входа.
          <span className="important-message">
            Запомните свой метод входа! Добавить другой метод входа можно будет
            уже только в личном кабинете
          </span>
        </div>
        <EmailOrPhoneBlock
          isHome={true}
          showSmsFormFunForms={showSmsFormFunForms}
          showSmsFormFunButtons={showSmsFormFunButtons}
          authTabButtonTelephone={authTabButtonTelephone}
          authTabButtonEmail={authTabButtonEmail}
          telephoneInputParams={telephoneInputParams}
          smsCodeInputParams={smsCodeInputParams}
          emailInputParams={emailInputParams}
          emailCodeInputParams={emailCodeInputParams}
        />
      </section>
    </>
  );
}
