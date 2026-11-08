import { NavLink } from "react-router";
import getContent from "./../utils/getContent.js";
import pagesProps from "./Pages";
import useContextHook from "./../hooks/ContextHook.js";
function NavMain() {
  return (
    <nav className={"site-navigation"}>
      <ul className={"main-menu"}>
        {pagesProps.map((pageProps, i) => {
          if (pageProps.path != "*" && pageProps.path != "/error" && pageProps.path != "/logs/:id") {
            const { linkContenIndex } = pageProps;
            return (
              <li className={"main-menu-item"} key={i}>
                <NavLink
                  className={"main-menu-link"}
                  to={pageProps.path}
                  end={pageProps.end}
                  data-content={linkContenIndex}
                >
                  {getContent(linkContenIndex)}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
export default NavMain;
