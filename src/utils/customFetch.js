// import useContextHook from "./../hooks/ContextHook.js";
// const { eventsPossible } = useContextHook();
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
/* 
// Requesting Data
async function requestGithubUser(githubLogin) {
try {
const response = await fetch(
`https://api.github.com/users/${githubLogin}`
);
const userData = await response.json();
console.log(userData);
} catch (error) {
console.error(error);
}
}

// Sending Data with a Request
fetch("/create/user", {
method: "POST",
body: JSON.stringify({ username, password, bio })
});

Uploading Files with fetch
const formData = new FormData();
formData.append("username", "moontahoe");
formData.append("fullname", "Alex Banks");
forData.append("avatar", imgFile);
fetch("/create/user", {
method: "POST",
body: formData
});

Authorized Requests
fetch(`https://api.github.com/users/${login}`, {
method: "GET",
headers: {
Authorization: `Bearer ${token}`
}
}); 
*/

/* 
async function request({
  url,
  fun,
  method,
  body,
  headers,
  context,
  spinnerElemRef,
  navigate,
  timeout = 10000, // Время ожидания по умолчанию (10 секунд)
}) {
  try {
    // Создаем сигнал, который автоматически прервет запрос через указанное время
    const signal = AbortSignal.timeout(timeout);

    // Передаем signal в настройки fetch
    const response = await fetch(url, { method, body, headers, signal });
    const userData = await response.json();
    
    context.setEvantsPossible(true);
    if (spinnerElemRef?.current) {
      spinnerElemRef.current.classList.remove("loading");
    }
    fun(userData);
  } catch (error) {
    console.error(error);
    
    // Если произошел таймаут, error.name будет равен "TimeoutError"
    if (error.name === "TimeoutError") {
      console.warn(`Запрос был прерван по таймауту (${timeout}ms)`);
    }

    context.setEvantsPossible(true);
    if (spinnerElemRef?.current) {
      spinnerElemRef.current.classList.remove("loading");
    }
    navigate("/error");
  }
}

*/
