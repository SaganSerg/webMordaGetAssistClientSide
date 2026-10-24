import { fetchTimeout } from "./../config.json"
async function request({
  url,
  fun,
  method,
  body,
  headers,
  context,
  spinnerElemRef,
  navigate,
}) {
  try {
    const signal = AbortSignal.timeout(fetchTimeout)
    const response = await fetch(url, { method, body, headers, signal });
    const userData = await response.json();
    context.setEvantsPossible(true);
    if (spinnerElemRef?.current) {
      spinnerElemRef.current.classList.remove("loading");
    }
    fun(userData);
  } catch (error) {
    console.error(error);
    if (error.name === "TimeoutError") {
      console.warn(`Запрос был прерван по таймауту (${fetchTimeout}ms)`)
    }
    context.setEvantsPossible(true);
    if (spinnerElemRef?.current) {
      spinnerElemRef.current.classList.remove("loading");
    }
    navigate("/error");
  }
}
function CustomFetch({
  url,
  fun,
  method,
  body,
  context,
  auth, // это строка вида `Bearer ${accessToken}`
  spinnerElemRef,
  navigate,
}) {
  try {
    context.setEvantsPossible(false);
    if (spinnerElemRef) {
      spinnerElemRef.current.classList.add("loading");
    }
    const HeadersObj = {}
    HeadersObj["Content-Type"] = "application/json"
    if (auth) HeadersObj["Authorization"] = auth
    const headers = new Headers(HeadersObj);
    request({
      url,
      fun,
      method,
      body,
      headers,
      context,
      spinnerElemRef,
      navigate,
    });
  } catch (e) {
    console.error(error);
    context.setEvantsPossible(true);
    navigate("/error");
  }
}
export default CustomFetch;