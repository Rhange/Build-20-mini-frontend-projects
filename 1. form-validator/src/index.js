const userName = document.querySelector(".js-userName_input"),
  email = document.querySelector(".js-email_input"),
  password = document.querySelector(".js-password_input"),
  confirm = document.querySelector(".js-conform_input"),
  submit = document.querySelector(".form_submit"),
  inputs = document.querySelectorAll("input");

let userNameAlert = document.querySelector(".js-userName_alert"),
  emailAlert = document.querySelector(".js-email_alert"),
  passwordAlert = document.querySelector(".js-password_alert"),
  confirmAlert = document.querySelector(".js-confirm_alert");

function handleSubmit(e) {
  e.preventDefault();
}

function setPassword() {
  if (password.value.length >= 6) {
    userName.style.border = "2px solid #2ECC71";
    userNameAlert.innerText = "";
  } else {
    userName.style.border = "2px solid #E74C3C";
    userNameAlert.innerText = "Password must be at least 6 characters";
  }
}
function setUserName() {
  if (userName.value.length >= 3) {
    userName.style.border = "2px solid #2ECC71";
    userNameAlert.innerText = "";
  } else {
    userName.style.border = "2px solid #E74C3C";
    userNameAlert.innerText = "Username must be at least 3 characters";
  }
}

function handleClick() {
  setUserName(); // Username
  setPassword();
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("click", handleSubmit);
}

function init() {
  submit.addEventListener("click", handleClick);

  console.log(inputs);
}

init();
