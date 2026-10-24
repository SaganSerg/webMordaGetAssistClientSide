import contents from "./../data/contents.json";
import useContextHook from "./../hooks/ContextHook";
export default function getContent(index) {
  const { lang } = useContextHook();
  return (() => {
    try {
      const Content =
        (isNaN(Number(index))
          ? contents[lang][index]
          : contents[lang][index]?.value) ?? "";
      if (!Content)
        throw new Error(
          `Custorm Error! There is not index with a ${index} value!`,
        );
      return Content;
    } catch (e) {
      console.error(e);
    }
  })();
}
