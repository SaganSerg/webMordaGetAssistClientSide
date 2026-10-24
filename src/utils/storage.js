const sessionLoadJSON = (key) => key && JSON.parse(sessionStorage.getItem(key));
const sessionSaveJSON = (key, data) =>
  sessionStorage.setItem(key, JSON.stringify(data));
const sessionLoadData = (key) => key && sessionStorage.getItem(key);
const sessionSaveData = (key, data) =>
  sessionStorage.setItem(key, String(data));

const localLoadJSON = (key) => key && JSON.parse(localStorage.getItem(key));
const localSaveJSON = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
const localLoadData = (key) => key && localStorage.getItem(key);
const localSaveData = (key, data) => localStorage.setItem(key, String(data));
export default {
  sessionLoadJSON,
  sessionSaveJSON,
  sessionLoadData,
  sessionSaveData,
  localLoadJSON,
  localSaveJSON,
  localLoadData,
  localSaveData
};
