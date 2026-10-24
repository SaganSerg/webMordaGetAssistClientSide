import { useState, useEffect, useRef } from "react";
import { webProtocol, domen, port } from "./../../config.json";
import { useNavigate } from "react-router";
import storage from "./../../utils/storage.js";
import customFetch from "./../../utils/customFetch.js";
import useContextHook from "./../../hooks/ContextHook";
import getContent from "./../../utils/getContent.js";
import Error from "./Error";
import EmailOrPhoneBlock from "./../EmailOrPhoneBlock";

// const Error = () => {
//   const navigate = useNavigate();
//   useEffect(() => navigate("/error"));
//   return null;
// };
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

  const navigate = useNavigate();
  const formErrorValidPhoneNumberTelephoneInput = useRef();
  const formErrorTimeoutTelephineInput = useRef()
  const formErrorSmsCodeInput = useRef()
  const errorFormsTelephoneInput = { formError: formErrorValidPhoneNumberTelephoneInput, formErrorTimeout: formErrorTimeoutTelephineInput }
  const errorFormsSmsCodeInput = {formError: formErrorSmsCodeInput}


  const [vehicleAddIsOpen, setVehicleAddIsOpen] = useState(false);
  const addVehicleButton = useRef();
  const vehiclAddPanel = useRef();
  const formError = useRef();
  // const navigate = useNavigate();
  const accessToken = storage.localLoadData("accessToken");
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

            <div className="form-error">Введите корректный номер телефона</div>
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
            {/* <EmailOrPhoneBlock
              telephoneInputUrl={"/api/web/getSmsForLinkVehicle"}
              smsCodeInputUrl={"/api/web/confirmLinkVehicleBySms"}
              errorFormsTelephoneInput={ errorFormsTelephoneInput }
          errorFormsSmsCodeInput={errorFormsSmsCodeInput}
          isHome={false}
          smaCodeInputAuth={accessToken}
              smsCodeInputFun={(data) => {
                try {
              if (!data) throw new Error("Custom error! !data");
              if (!data?.result || !data?.description || !data?.responseCode)
                throw new Error(
                  "Custom error! !data.result || !data.description || !data.responseCode",
                );
              // if (data?.responseCode == "0201000")
              //   throw new Error(
              //     "Custom error! data?.responseCode == '0201000'",
              //   );
              // if (data?.responseCode == "0201001")
              //   throw new Error(
              //     "Custom error! data?.responseCode == '0201001'",
              //   );
              // if (data?.responseCode == "0201002")
              //   return formError.current.classList.add("is-visible");
              // if (data.result == "ERR")
              //   throw new Error("Custom error! data.result == 'ERR'");
              // if (!data.accessToken || !data.refreshToken)
              //   throw new Error(
              //     "Custom error! !data.accessToken || !data.refreshToken",
              //   );
              // storage.localSaveData("accessToken", data.accessToken);
              // storage.localSaveData("refreshToken", data.refreshToken);
              navigate("/account");
            } catch (e) {
              console.error(e);
              context.setEvantsPossible(true);
              navigate("/error");
            }
              }}
              formError={formError}
              smaCodeInputAuth={accessToken}
            /> */}
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
  useEffect(() => {
    navigate("/");
  });
}
