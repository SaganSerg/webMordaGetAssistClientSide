import TelephoneInput from "./../TelephoneInput";
import SmsCodeInput from "./../SmsCodeInput"; // src/components/SmsCodeInput.jsx SmSCodeInput
import { useRef, useState } from "react";
export default function Home() {
  const authTabButtonTelephone = useRef();
  const authTabButtonEmail = useRef();
  const authFormEmail = useRef();
  const authFormPhone = useRef();
  const verificationFormEmail = useRef();
  const verificationFormSMS = useRef();
  const [countdown, setCountdown] = useState(null);
  // const [resendSmsRequestPeriod, setResendSmsRequestPeriod] = useState(null);
  function turnActive(activeElement, activeButton) {
    const buttons = [authTabButtonTelephone, authTabButtonEmail];
    buttons.forEach((e) => e.current.classList.remove("active"));
    activeButton.current.classList.add("active");
    const forms = [
      authFormEmail,
      authFormPhone,
      verificationFormEmail,
      verificationFormSMS,
    ];
    forms.forEach((e) => e.current.classList.remove("is-active"));
    activeElement.current.classList.add("is-active");
  }
  function startCountdown(timestampMs, lifetimeSMS) {
    const targetTime = timestampMs + lifetimeSMS;
    const now = Date.now();
    let remainingSeconds = Math.ceil((targetTime - now) / 1000);
    setCountdown(remainingSeconds);
    const timer = setInterval(() => {
      if (remainingSeconds <= 0) {
        setCountdown(null);
        clearInterval(timer);
        return;
      }
      setCountdown(remainingSeconds--);
    }, 1000);
  }
  return (
    <>
      {/* Блок для входа */}
      <section className="auth-section">
        {/* заголовок панели входа */}
        <h1 className="auth-title">Войти</h1>
        {/* это панель выбора способа входа */}
        <div className="auth-method-description">
          Выберите метод входа.
          {/* Данное сообщение нужно будут стилизовать заметно */}
          <span className="important-message">
            Запомните свой метод входа! Добавить другой метод входа можно будет
            уже только в личном кабинете
          </span>
        </div>
        {/* Это список табов */}
        <ul className="auth-tabs">
          <li className="auth-tab-item">
            <button
              className="auth-tab-button active"
              type="button"
              onClick={() => {
                // console.log(authFormPhone)
                // authFormPhone.current.classList.add('is-active')
                // authFormEmail.current.classList.remove('is-active')
                // x.target.classList.add('active')
                // authTabButtonEmail.current.classList.remove('active')
                turnActive(authFormPhone, authTabButtonTelephone);
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
                // authFormPhone.current.classList.remove('is-active')
                // authFormEmail.current.classList.add('is-active')
                // x.target.classList.add('active')
                // authTabButtonTelephone.current.classList.remove('active')
                turnActive(authFormEmail, authTabButtonEmail);
              }}
              ref={authTabButtonEmail}
            >
              По адресу электронной почты
            </button>
          </li>
        </ul>
        {/* В определенный момент времени должна отображаться только одна форма ввода */}
        {/* Форма ввода Email */}
        <form className="auth-form auth-form-email" ref={authFormEmail}>
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
            {/* это поле для сообщений о некорректном вводе и т.п. */}
            <div className="form-error">Введите корректный email</div>
          </fieldset>
          <button className="form-submit-button" type="submit">
            Получить код регистрации на эл. почту
          </button>
        </form>
        {/* Форма ввода кода регистрации, полученного по email */}
        <form
          className="auth-form verification-form verification-form-email"
          ref={verificationFormEmail}
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
            {/* это блок для сообщений о некорректном вводе и т.п. */}
            <div className="form-error">Введите корректный код доступа</div>
            {/* это блок где отображается количество секунд */}
            <div className="code-timer">
              100 <span className="code-timer-unit">секунд</span>
            </div>
          </fieldset>
          <button className="form-submit-button" type="submit">
            Отправить код регистрации
          </button>
        </form>
        {/* Форма "Введите номер телефона" */}
        {/* <form className="auth-form auth-form-phone is-active" id='authFormPhone'>
          <fieldset className="form-fieldset">
            <legend className="form-legend">Введите номер телефона</legend>
            <label className="form-label" htmlFor="phone">
              Телефон
            </label>
            <input
              className="form-input"
              type="tel"
              id="phone"
              placeholder="+7(123)4567890"
              autoComplete="tel"
            />
            
            <div className="form-error">Введите корректный номер телефона</div>
          </fieldset>
          <button className="form-submit-button" type="submit">
            Получить код регистрации по СМС
          </button>
        </form> */}
        <TelephoneInput
        url={'/api/web/getSMS'}
          ref={authFormPhone}
          showSMSform={() => {
            turnActive(verificationFormSMS, authTabButtonTelephone);
          }}
          startCountdown={startCountdown}
          // setResendSmsRequestPeriod={setResendSmsRequestPeriod}
        />
        {/* Форма ввода кода регистрации, полученного по СМС */}
        <SmsCodeInput
        url={'/api/web/getTokensBySms'}
          verificationFormSMS={verificationFormSMS}
          countdown={countdown}
          // resendSmsRequestPeriod={resendSmsRequestPeriod}
        />
        {/* <form
          className="auth-form verification-form verification-form-sms"
          ref={verificationFormSMS}
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
              maxLength="5"
              minLength='5'
            />
            
            <div className="form-error">Введите корректный код доступа</div>
            
            <div className="code-timer">
              {countdown ?? "Время истекло!!!"}{" "}
              <span className="code-timer-unit">
                {countdown ? "секунд" : `Вы сможете запросить новую СМС через ` + resendSmsRequestPeriod  + ` минут`}
              </span>
            </div>
          </fieldset>
          <button className="form-submit-button" type="submit">
            Отправить код регистрации
          </button>
        </form> */}
      </section>
    </>
  );
}
