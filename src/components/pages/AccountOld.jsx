import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import storage from "./../../utils/storage.js";
import customFetch from "./../../utils/customFetch.js";
import useContextHook from "./../../hooks/ContextHook";
import { webProtocol, domen, port } from "./../../config.json";

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
      <button>Восстановить доступ к аккаунту</button>
    </div>
  );
};
const AccountWithData = ({data}) => {
  const setUper = (value) => (value ? value : "Значение отсутсвует");
  const accountPhoneNumber = data?.accountPhoneNumber;
  console.log(data)
  return (
    <>
      <header className="account-header">
        <div className="account-identity account-phone">
          Ваш номер телефона:
          <span className="account-identity-value">
            {setUper(data?.accountPhoneNumber)}
          </span>
        </div>
        {/* <button
          className="account-action-button add-phone-button"
          type="button"
        >
          Добавить номер телефона
        </button> */}
        {/* <form className="account-form modal-form phone-form">
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
        </form> */}
        {/* <form className="account-form modal-form verification-form verification-form-sms">
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
        </form> */}
        {/* <div className="account-identity account-email">
          Ваш адрес электронной почты:
          <span className="account-identity-value">your@mail.com</span>
        </div> */}
        {/* <button
          className="account-action-button add-email-button"
          type="button"
        >
          Добавить адрес электронной почты
        </button> */}
        {/* <form className="account-form modal-form email-form">
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
        </form> */}
        {/* <form className="account-form modal-form verification-form verification-form-email">
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
        </form> */}
      </header>
      <div className="vehicles-section">
        <div className="vehicle-add-block">
          <button
            className="account-action-button add-vehicle-button loading"
            type="button"
          >
            Добавить транспортное средство
          </button>
          <div className="vehicle-add-panel">
            <div className="vehicle-add-description">
              Выберите метод добавления.
              <span className="important-message">
                ВАЖНО!!! Вы должны знать, каким способом был зарегестрирован
                автомобиль в базе. Чаще всего автомобили регестрируются по
                номеру телефона
              </span>
            </div>
            <ul className="auth-tabs vehicle-add-tabs">
              <li className="auth-tab-item">
                <button className="auth-tab-button active" type="button">
                  По номеру телефона
                </button>
              </li>
              {/* <li className="auth-tab-item">
                <button className="auth-tab-button" type="button">
                  По адресу электронной почты
                </button>
              </li> */}
            </ul>
            {/* <form className="auth-form auth-form-email">
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
                Получить код доступа на эл. почту
              </button>
            </form> */}
            {/* <form className="auth-form verification-form verification-form-email">
              <fieldset className="form-fieldset">
                <legend className="form-legend">
                  Введите код доступа, полученный по email
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
                Отправить код доступа
              </button>
            </form> */}
            <form className="auth-form auth-form-phone">
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
                <div className="form-error">
                  Введите корректный номер телефона
                </div>
              </fieldset>
              <button className="form-submit-button" type="submit">
                Получить код доступа по СМС
              </button>
            </form>
            <form className="auth-form verification-form verification-form-sms">
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
                />
                <div className="form-error">Введите корректный код доступа</div>
                <div className="code-timer">
                  100 <span className="code-timer-unit">секунд</span>
                </div>
              </fieldset>
              <button className="form-submit-button" type="submit">
                Отправить код доступа
              </button>
            </form>
          </div>
        </div>
        <h1 className="vehicles-title">
          Список "привязанных" транспортных средств
        </h1>
        <ul className="vehicles-list">
          {data.vehileList.map((data, i) => {
            <li className="vehicle-card">
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Название транспортного средства:
                </span>
                Мерседес. Водители: Иванов и Сидоров.
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Государственный номер:
                </span>
                А234MH
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Описание транспортного средства:
                </span>
                Здесь должно быть какое-то описание.
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">Телефон аккаунта:</span>
                +7(123)456-78-90
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">Email аккаунта:</span>
                your@mail.com
              </div>
              <div className="vehicle-property vehicle-services">
                <span className="vehicle-property-name">Сервисы:</span>
                <ul className="services-list">
                  <li className="service-item">Нагрузка на ось</li>
                  <li className="service-item">Давление в шинах</li>
                </ul>
              </div>
              <button className="vehicle-logs-button loading" type="button">
                Посмотреть логи
              </button>
            </li>;
          })}
          {/* <li className="vehicle-card">
            <div className="vehicle-property">
              <span className="vehicle-property-name">
                Название транспортного средства:
              </span>
              Мерседес. Водители: Иванов и Сидоров.
            </div>
            <div className="vehicle-property">
              <span className="vehicle-property-name">
                Государственный номер:
              </span>
              А234MH
            </div>
            <div className="vehicle-property">
              <span className="vehicle-property-name">
                Описание транспортного средства:
              </span>
              Здесь должно быть какое-то описание.
            </div>
            <div className="vehicle-property">
              <span className="vehicle-property-name">Телефон аккаунта:</span>
              +7(123)456-78-90
            </div>
            <div className="vehicle-property">
              <span className="vehicle-property-name">Email аккаунта:</span>
              your@mail.com
            </div>
            <div className="vehicle-property vehicle-services">
              <span className="vehicle-property-name">Сервисы:</span>
              <ul className="services-list">
                <li className="service-item">Нагрузка на ось</li>
                <li className="service-item">Давление в шинах</li>
              </ul>
            </div>
            <button className="vehicle-logs-button loading" type="button">
              Посмотреть логи
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
};
// export default function Account(params) {
// const context = useContextHook();
//   const [page, setPage] = useState("Spinner");

//   const navigate = useNavigate();
//   const accessToken = storage.localLoadData("accessToken");

//   if (accessToken) {
//     customFetch({
//       url: `${webProtocol}://${domen}:${port}/api/web/getAccountData`,
//       fun: (data) => {

//       },
//       method: "POST",
//       body: null,
//       context,
//       auth: `Bearer ${accessToken}`,
//       navigate,
//     });
//   }

// useEffect(() => {
//   navigate("/");
// })
// return <Spinner />
// }

export default function Account(params) {
  const context = useContextHook();
  const [page, setPage] = useState("Spinner");
  const navigate = useNavigate();
  const accessToken = storage.localLoadData("accessToken");
  // const accessToken = false
  let accountData
  if (accessToken) {
    useEffect(() => {
      customFetch({
        url: `${webProtocol}://${domen}:${port}/api/web/getAccountData`,
        fun: (data) => {
          accountData = data.accountData
          setPage("AccountWithData");
        },
        method: "POST",
        body: null,
        context,
        auth: `Bearer ${accessToken}`,
        navigate,
      });
    });

    return (
      <>
        {page == "Spinner" ? (
          <Spinner />
        ) : page == "GetNewAccessToken" ? (
          <GetNewAccessToken />
        ) : page == "AccountWithData" ? (
          <AccountWithData data={accountData}/>
        ) : null}
      </>
    );
  }

  useEffect(() => {
    navigate("/");
  });
}
