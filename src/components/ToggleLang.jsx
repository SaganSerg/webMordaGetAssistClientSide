import useContextHook from "./../hooks/ContextHook";
import contents from "./../data/contents.json";
export default function ToggleLang() {
  const { setLang, lang } = useContextHook();
  return (
    <ul className="language-switcher">
      {Object.keys(contents).map((x, i) => (
        <li className="language-item" key={i}>
          <button
            className={"language-button " + (x == lang ? "active " : "")}
            data-lang={x}
            onClick={() => setLang(x)}
          >
            {x.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
}
