import { createElement } from "react";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Error from "./pages/Error";
const PageComponentList = {
  Home: function ({}) {
    return <Home />;
  },
  Services: function ({}) {
    return (
      <div>
        <h1>[Servises]</h1>
      </div>
    );
  },
  About: function ({}) {
    return (
      <div>
        <h1>[About]</h1>
      </div>
    );
  },
  Contacts: function ({}) {
    return (
      <div>
        <h1>[Contacts]</h1>
      </div>
    );
  },
  Account: function ({}) {
    return <Account />;
  },
  Page404: function ({}) {
    return (
      <div>
        <h1>[Page404]</h1>
      </div>
    );
  },
  Error: function ({}) {
    return <Error />;
  },
};
class Page {
  constructor({ path, end, linkContenIndex, name, place, titleContentIndex }) {
    this.path = path;
    this.end = end;
    this.linkContenIndex = linkContenIndex;
    this.name = name;
    this.place = place;
    this.titleContentIndex = titleContentIndex;
    this.element = createElement(PageComponentList[this.name]);
  }
}
const pagesParamList = [
  {
    path: "/",
    end: true,
    linkContenIndex: "13",
    name: "Home",
    place: "public",
    titleContentIndex: "18",
  },
  {
    path: "/servises",
    end: true,
    linkContenIndex: "14",
    name: "Services",
    place: "public",
    titleContentIndex: "20",
  },
  {
    path: "/about",
    end: true,
    linkContenIndex: "15",
    name: "About",
    place: "public",
    titleContentIndex: "21",
  },
  {
    path: "/contacts",
    end: true,
    linkContenIndex: "16",
    name: "Contacts",
    place: "public",
    titleContentIndex: "22",
  },
  {
    path: "/account",
    end: false,
    linkContenIndex: "17",
    name: "Account",
    place: "account",
    titleContentIndex: "23",
  },
  {
    path: "*",
    end: false,
    name: "Page404",
    place: "public",
    titleContentIndex: "19",
  },
  {
    path: "/error",
    end: true,
    name: "Error",
    place: "public",
    titleContentIndex: "24",
  },
];
const pages = [];
pagesParamList.forEach((element) => {
  pages.push(new Page(element));
});
export default pages;
