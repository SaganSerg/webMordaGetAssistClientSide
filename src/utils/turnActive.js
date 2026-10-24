// const forms = [
//       authFormEmail,
//       authFormPhone,
//       verificationFormEmail,
//       verificationFormSMS,
//     ];
// const buttons = [authTabButtonTelephone, authTabButtonEmail];
export default function turnActive(activeElement, activeButton, buttons, forms) {
    buttons.forEach((e) => e.current.classList.remove("active"));
    activeButton.current.classList.add("active");
    forms.forEach((e) => e.current.classList.remove("is-active"));
    activeElement.current.classList.add("is-active");
  }