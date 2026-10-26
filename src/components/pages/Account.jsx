// это блок импортов нужен для работы форм регистрации
import EmailOrPhoneBlock from "./../EmailOrPhoneBlock";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import storage from "./../../utils/storage.js";
import startCountdownFun from "./../../utils/startCountdown";
import turnActive from "./../../utils/turnActive.js";
import useContextHook from "./../../hooks/ContextHook";
// это окончание блока импортов

import { webProtocol, domen, port } from "./../../config.json";
import customFetch from "./../../utils/customFetch.js";
import getContent from "./../../utils/getContent.js";
import Error from "./Error";

const Spinner = () => {
  return (
    <div className="page-overlay loading">
      <div className="spinner"></div>
    </div>
  );
};
const GetNewAccessToken = () => {
  return (
    <div>
      <button>Восстановить доступ к аккаунту 35</button>
    </div>
  );
};
const AccountWithData = ({ data }) => {
  // значение page может быть 'accountWithData' или getNewAccessToken
  const [page, setPage] = useState("accountWithData");
  const accessToken = storage.localLoadData("accessToken");
  // это блок данных для работы поле регистрации
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
    url: "/api/web/confirmLinkVehicleBySms",
    errors: smsCodeInputParamsErrors,
    auth: `Bearer ${accessToken}`,
    fun: (data) => {
      try {
        const errors = smsCodeInputParamsErrors;
        if (!data) throw new Error("Custom error! !data");
        if (!data?.result || !data?.description || !data?.responseCode)
          throw new Error(
            "Custom error! !data.result || !data.description || !data.responseCode",
          );
        if (data?.responseCode == "0231000")
          throw new Error("Custom error! data?.responseCode == '0231000'");
        if ("0231003" == data?.responseCode) {
          return setPage("getNewAccessToken");
        }
        if ("0231004" == data?.responseCode) {
          throw new Error("Custom error! data?.responseCode == '0231004'");
        }
        if ("0231001" == data?.responseCode) {
          throw new Error("Custom error! data?.responseCode == '0231001'");
        }
        if ("0231002" == data?.responseCode) {
          return errors.notCorrectAccesseCode.current.classList.add(
            "is-visible",
          );
        }
        return navigate('/account')
      } catch (e) {
        console.error(e);
        context.setEvantsPossible(true);
        return navigate("/error");
      }
    },
    componentRef: verificationFormSMS,
    countdown,
    forRegistrationAccount: false,
  };
  const telephoneInputParamsErrors = {
    timeIsUp: useRef(),
    notCorrectTelephoneNumber: useRef(),
    noSuchPhone: useRef(),
  };
  const telephoneInputParams = {
    url: "/api/web/getSmsForLinkVehicle",
    errors: telephoneInputParamsErrors,
    auth: `Bearer ${accessToken}`,
    fun: (data) => {
      try {
        const errors = telephoneInputParamsErrors;
        if (!data) throw new Error("Custom error! !data");
        if (!data?.result || !data?.description || !data?.responseCode)
          throw Error(
            "Custom error! !data.result || !data.description || !data.responseCode",
          );
        if (data?.responseCode == "0221000") {
          throw Error("Custom error! data?.responseCode == '0221000'");
        }
        if ("0221001" == data?.responseCode) {
          return setPage("getNewAccessToken");
        }
        if ("0221002" == data?.responseCode) {
          throw Error("Custom error! data?.responseCode == '0221002'");
        }
        if ("0221003" == data?.responseCode) {
          throw Error("Custom error! data?.responseCode == '0221003'");
        }
        if ("0221004" == data?.responseCode) {
          // timeIsUp
          // notCorrectTelephoneNumber;
          // noSuchPhone;
          Object.keys(errors).forEach((element) => {
            errors[element].current.classList.remove("is-visible");
          });
          errors.noSuchPhone.current.classList.add("is-visible");
          return;
        }
        if ("0221005" == data?.responseCode) {
          const { howMuchTimeLeft } = data;
          if (!howMuchTimeLeft)
            throw Error("Custom error! !data?.howMuchTimeLeft");
          Object.keys(errors).forEach((element) => {
            errors[element].current.classList.remove("is-visible");
          });
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
    forRegistrationAccount: false,
  };
  // это окончание блока данных для регистрации

  // const navigate = useNavigate();
  // const formErrorValidPhoneNumberTelephoneInput = useRef();
  // const formErrorTimeoutTelephineInput = useRef();
  // const formErrorSmsCodeInput = useRef();
  // const errorFormsTelephoneInput = {
  //   formError: formErrorValidPhoneNumberTelephoneInput,
  //   formErrorTimeout: formErrorTimeoutTelephineInput,
  // };
  // const errorFormsSmsCodeInput = { formError: formErrorSmsCodeInput };
  const [vehicleAddIsOpen, setVehicleAddIsOpen] = useState(false);
  const addVehicleButton = useRef();
  const vehiclAddPanel = useRef();
  // const formError = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addVehicleButton.current &&
        !addVehicleButton.current.contains(event.target) &&
        vehiclAddPanel.current &&
        !vehiclAddPanel.current.contains(event.target)
      ) {
        setVehicleAddIsOpen(false); // Закрываем панель
      }
    };

    // Вешаем событие на весь документ
    document.addEventListener("click", handleClickOutside);
    // Обязательно очищаем событие при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const setUper = (value) => (value ? value : "Отсутсвует");
  if (page == "accountWithData")
    return (
      <>
        <header className="account-header">
          <div className="account-identity account-phone">
            Ваш номер телефона: 25 {getContent("25")}
            <span className="account-identity-value">
              {setUper(data?.accountPhoneNumber)}
            </span>
          </div>
          <button
            className="account-action-button add-phone-button"
            type="button"
          >
            Добавить номер телефона
          </button>
          <form className="account-form modal-form phone-form">
            <fieldset className="form-fieldset">
              <legend className="form-legend">Введите номер телефона</legend>
              <label className="form-label" htmlFor="ownPhone">
                Телефон
              </label>
              <input
                className="form-input"
                type="tel"
                id="ownPhone"
                placeholder="+7(123)4567890"
                autoComplete="tel"
              />
              <div className="form-error">
                Введите корректный номер телефона
              </div>
            </fieldset>
            <button className="form-submit-button" type="submit">
              Получить код подтверждения по СМС
            </button>
          </form>
          <form className="account-form modal-form verification-form verification-form-sms">
            <fieldset className="form-fieldset">
              <legend className="form-legend">
                Введите код подтверждения полученный по СМС
              </legend>
              <label className="form-label" htmlFor="ownSmsCode">
                Код доступа
              </label>
              <input
                className="form-input verification-code-input"
                type="text"
                id="ownSmsCode"
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
          <div className="account-identity account-email">
            Ваш адрес электронной почты:
            <span className="account-identity-value">your@mail.com</span>
          </div>
          <button
            className="account-action-button add-email-button"
            type="button"
          >
            Добавить адрес электронной почты
          </button>
          <form className="account-form modal-form email-form">
            <fieldset className="form-fieldset">
              <legend className="form-legend">Введите Email</legend>
              <label className="form-label" htmlFor="ownEmail">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="ownEmail"
                placeholder="your@email.com"
                autoComplete="email"
              />
              <div className="form-error">Введите корректный email</div>
            </fieldset>
            <button className="form-submit-button" type="submit">
              Получить код подтверждения на эл. почту
            </button>
          </form>
          <form className="account-form modal-form verification-form verification-form-email">
            <fieldset className="form-fieldset">
              <legend className="form-legend">
                Введите код подтверждения полученный по email
              </legend>
              <label className="form-label" htmlFor="onwEmailCode">
                Код доступа
              </label>
              <input
                className="form-input verification-code-input"
                type="text"
                id="onwEmailCode"
                placeholder="XXXXX"
              />
              <div className="form-error">
                Введите корректный код подтверждения
              </div>
              <div className="code-timer">
                100 <span className="code-timer-unit">секунд</span>
              </div>
            </fieldset>
            <button className="form-submit-button" type="submit">
              Отправить код подтверждения
            </button>
          </form>
        </header>
        <div className="vehicles-section">
          <div className="vehicle-add-block">
            <button
              className="account-action-button add-vehicle-button"
              type="button"
              onClick={() => setVehicleAddIsOpen((prev) => !prev)}
              ref={addVehicleButton}
            >
              Добавить транспортное средство 26 {getContent("26")}
            </button>
            <div
              className={`vehicle-add-panel ${vehicleAddIsOpen ? " is-open " : ""}`}
              ref={vehiclAddPanel}
            >
              <div className="vehicle-add-description">
                Выберите метод добавления.
                <span className="important-message">
                  ВАЖНО!!! Вы должны знать, каким способом был зарегестрирован
                  автомобиль в базе. Чаще всего автомобили регестрируются по
                  номеру телефона
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
            </div>
          </div>
          <h1 className="vehicles-title">
            Список "привязанных" транспортных средств 27 {getContent("27")}
          </h1>
          <ul className="vehicles-list">
            {data["vehicleList"].map((elem, i) => {
              return (
                <li className="vehicle-card" key={i}>
                  <div className="vehicle-property">
                    <span className="vehicle-property-name">
                      Название транспортного средства: 28 {getContent("28")}
                    </span>
                    {setUper(elem.name)}
                  </div>
                  <div className="vehicle-property">
                    <span className="vehicle-property-name">
                      Государственный номер: 29 {getContent("29")}
                    </span>
                    {setUper(elem.num)}
                  </div>
                  <div className="vehicle-property">
                    <span className="vehicle-property-name">
                      Описание транспортного средства: 30 {getContent("30")}
                    </span>
                    {setUper(elem.description)}
                  </div>
                  <div className="vehicle-property">
                    <span className="vehicle-property-name">
                      Телефон аккаунта: 31 {getContent("31")}
                    </span>
                    {setUper(elem.telephoneNumber)}
                  </div>
                  <div className="vehicle-property">
                    <span className="vehicle-property-name">
                      Email аккаунта: 32 {getContent("32")}
                    </span>
                    {setUper(elem.email)}
                  </div>
                  <div className="vehicle-property vehicle-services">
                    <span className="vehicle-property-name">
                      Сервисы: 33 {getContent("33")}
                    </span>
                    <ul className="services-list">
                      {elem.services.map((service, i) => {
                        return (
                          <li className="service-item" key={i}>
                            {service}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <button className="vehicle-logs-button" type="button">
                    Посмотреть логи 34 {getContent("34")}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  if (page == "getNewAccessToken") return <GetNewAccessToken />;
};
export default function Account() {
  const context = useContextHook();
  const navigate = useNavigate();
  const accessToken = storage.localLoadData("accessToken");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  if (accessToken) {
    useEffect(() => {
      setLoading(true);
      const signal = AbortSignal.timeout(1000 * 10); // задержка 10 sec
      fetch(`${webProtocol}://${domen}:${port}/api/web/getAccountData`, {
        method: "POST",
        body: null,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        signal,
      })
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch((e) => {
          console.log(e);
          setError(e);
        });
    }, []);
    if (loading) return <Spinner />;
    if (error) return <Error />;
    if (!data) return <Error />;
    return <AccountWithData data={data?.accountData} />;
  }
  const refreshToken = storage.localLoadData("refreshToken");
  if (refreshToken) return <GetNewAccessToken />;
  useEffect(() => {
    navigate("/");
  });
}
