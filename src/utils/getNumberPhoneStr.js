export default function getNumberPhoneStr(
  phoneNumber,
  phonePattern,
  symbolArr = ["(", ")", "-"], // в данном массиве нет + потому что этот символ подставляется в другом месте
) {
  const phonePatternArr = [];
  const pushPhonePatternArr = (x, i) => (phonePatternArr[i] = x);
  for (let i = 0; i < phonePattern.length; i++) {
    for (let y = 0; y < symbolArr.length; y++) {
      const symbol = symbolArr[y];
      if (symbol === phonePattern[i]) pushPhonePatternArr(symbol, i);
    }
  }
  const phoneIndexWithPlus = phonePattern.slice(0, phonePattern.indexOf("("));
  let readyPhoneNumber = phoneIndexWithPlus;
  for (let i = 0; phoneNumber.length > i; i++) {
    if (!/[0-9]/.test(phoneNumber[i])) {
      continue;
    }
    if (phonePatternArr[readyPhoneNumber.length] !== undefined) {
      readyPhoneNumber +=
        phonePatternArr[readyPhoneNumber.length] + phoneNumber[i];
    } else {
      readyPhoneNumber += phoneNumber[i];
    }
    if (readyPhoneNumber.length >= phonePattern.length) break;
  }
  return readyPhoneNumber;
}
