import contents from "./../data/contents.json";
import useContextHook from "./../hooks/ContextHook";
export default function Content({ index, langIndex = null }) {
  const { lang } = useContextHook();
  if (!langIndex) langIndex = lang
  const content = contents[langIndex][String(index)];
  return isNaN(Number(index)) ? content : content.value;
}
