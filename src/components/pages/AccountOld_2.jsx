import { useState, useEffect } from "react";
import { webProtocol, domen, port } from "./../../config.json";
import { useNavigate } from "react-router";
import storage from "./../../utils/storage.js";
import customFetch from "./../../utils/customFetch.js";
import useContextHook from "./../../hooks/ContextHook";
import getContent from "./../../utils/getContent.js";
const Spinner = () => {
  return (
    // <div className="page-overlay loading">
    //   <div className="spinner"></div>
    // </div>
    <div>Loading</div>
  );
};
const GetNewAccessToken = () => {
  return (
    <div>
      <button>Восстановить доступ к аккаунту 35</button>
    </div>
  );
};
const AccountWithData = ({ data}) => {
  const setUper = (value) => (value ? value : "Отсутсвует");
  
  return (
    <>
      <header className="account-header">
        <div className="account-identity account-phone">
          Ваш номер телефона: 25 {getContent('25')}
          <span className="account-identity-value">
            {setUper(data?.accountPhoneNumber)}
          </span>
        </div>
      </header>
      <div className="vehicles-section">
        <div className="vehicle-add-block">
          <button
            className="account-action-button add-vehicle-button loading"
            type="button"
          >
            Добавить транспортное средство 26 {getContent('26')}
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
            </ul>

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
          Список "привязанных" транспортных средств 27 {getContent('27')}
        </h1>
        <ul className="vehicles-list">
          {data['vehicleList'].map((elem, i) => {
            return <li className="vehicle-card" key={i}>
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Название транспортного средства: 28 {getContent('28')}
                </span>
                {setUper(elem.name)}
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Государственный номер: 29 {getContent('29')}
                </span>
                {setUper(elem.num)}
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">
                  Описание транспортного средства: 30 {getContent('30')}
                </span>
                {setUper(elem.description)}
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">Телефон аккаунта: 31 {getContent('31')}</span>
                {setUper(elem.telephoneNumber)}
              </div>
              <div className="vehicle-property">
                <span className="vehicle-property-name">Email аккаунта: 32 {getContent('32')}</span>
                {setUper(elem.email)}
              </div>
              <div className="vehicle-property vehicle-services">
                <span className="vehicle-property-name">Сервисы: 33 {getContent('33')}</span>
                <ul className="services-list">
                  {elem.services.map((service, i) => {
                    return <li className="service-item" key={i}>{service}</li>
                  })}
                </ul>
              </div>
              <button className="vehicle-logs-button loading" type="button">
                Посмотреть логи 34 {getContent('34')}
              </button>
            </li>;
          })}
        </ul>
      </div>
    </>
  );
};
// export default function Account() {
//   const context = useContextHook();
//   const navigate = useNavigate();
//   const accessToken = storage.localLoadData("accessToken");
//   const [data, setData] = useState();
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(false);
//   if (accessToken) {
//     useEffect(() => {
//       setLoading(true);
//       const signal = AbortSignal.timeout(1000 * 5); // задержка пять секунд
//       fetch(`${webProtocol}://${domen}:${port}/api/web/getAccountData`, {
//         method: "POST",
//         body: null,
//         headers: new Headers({
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         }),
//       })
//         .then((data) => data.json())
//         .then(setData)
//         .then(() => setLoading(false))
//         .catch(setError);
//     });
//     if (loading) return <Spinner />;
//     if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
//     if (!data) return <div>Данных нет</div>;
//     return <AccountWithData data={data.accountData} />;
//   }
//   useEffect(() => {
//     navigate("/");
//   });
// }

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
      // const signal = AbortSignal.timeout(1000 * 5); // задержка пять секунд
      fetch(`${webProtocol}://${domen}:${port}/api/web/getAccountData`, {
        method: "POST",
        body: null,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
      })
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    }, []);
    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (!data) return <div>Данных нет</div>;
    return <AccountWithData data={data.accountData} />;
    // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  }
  useEffect(() => {
    navigate("/");
  });
}
