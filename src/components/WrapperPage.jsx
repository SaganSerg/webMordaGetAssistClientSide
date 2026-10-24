import ToggleLang from "./ToggleLang";
import useContextHook from "./../hooks/ContextHook.js";
import NavMain from "./NavMain";
import getContent from "./../utils/getContent.js";
export default function WrapperPage({ children, pageParams }) {
  // siteBodyModification = "account" or 'public'
  const { eventsPossible } = useContextHook();
  const rootElem = document.getElementById("root");
  const place = pageParams.place;
  rootElem.className = "site-body site-body-" + place;
  rootElem.style.pointerEvents = eventsPossible ? "auto" : "none";
  const classHtml = `page page-${place} ${place == "public" ? "page-" + pageParams.name.toLowerCase() : ""}`;
  document.documentElement.className = classHtml;
  document.title = getContent(pageParams.titleContentIndex);
  return (
    <>
      <header className="site-header">
        <div className="brand-block">
          <div className="brand-logo">
            <div className="brand-logo-image">
              <img src="logo.svg" alt="Логотип" />
            </div>
          </div>
          <div className="brand-slogan">Инновации для вашего бизнеса</div>
          <div className="brand-name">Компания «GetOff»</div>
          <div className="brand-description">
            Быстрые решения для цифровой трансформации
          </div>
        </div>
        <div className="header-navigation">
          <ToggleLang />
          <NavMain />
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="copyright">
          <span className="symbol">©</span>
          <span>2025 Компания «Ключ». Все права защищены.</span>
        </div>
      </footer>
      {/* <div className={`page-overlay ${!eventsPossible ? "loading": null}`}>
        <div className="spinner"></div>
      </div> */}
    </>
  );
}
