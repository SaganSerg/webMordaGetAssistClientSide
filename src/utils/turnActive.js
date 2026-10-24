// const forms = [
//       authFormEmail,
//       authFormPhone,
//       verificationFormEmail,
//       verificationFormSMS,
//     ];
// const buttons = [authTabButtonTelephone, authTabButtonEmail];
export default function turnActive(activeElement, activeButton, buttons, forms) {
    // const buttons = [authTabButtonTelephone, authTabButtonEmail];
    buttons.forEach((e) => e.current.classList.remove("active"));
    activeButton.current.classList.add("active");
    // const forms = [
    //   authFormEmail,
    //   authFormPhone,
    //   verificationFormEmail,
    //   verificationFormSMS,
    // ];
    forms.forEach((e) => e.current.classList.remove("is-active"));
    activeElement.current.classList.add("is-active");
  }