const form = document.querySelector(".js-form"),
  userName = document.querySelector(".js-userName_input"),
  email = document.querySelector(".js-email_input"),
  password = document.querySelector(".js-password_input"),
  confirm = document.querySelector(".js-confirm_input"),
  button = document.querySelector(".form_submit");

function handleSubmit(e) {
  e.preventDefault();
}

function showSuccess(input) {
  const parent = input.parentElement;
  const alert = parent.querySelector("span");
  alert.classList.remove("alert-show");
  input.style.border = "2px solid #2ECC71";
}

function showError(input, message) {
  const parent = input.parentElement;
  const alert = parent.querySelector("span");
  const inputName = parent.querySelector("h2");
  input.style.border = "2px solid #e74c3c";
  alert.className = "js-alert alert alert-show";
  alert.innerText = `${inputName.innerText} ${message}`;
}

function checkInvalid(Arr) {
  Arr.forEach(function(each) {
    if (each.value === "") {
      showError(each, "is not valid.");
    } else {
      showSuccess(each);
    }
  });
}

function checkUserName(username, min, max) {
  if (username.value.length < min) {
    showError(username, `must be at least ${min} characters.`);
  } else if (username.value.length > max) {
    showError(username, `must be less than ${max} characters.`);
  } else {
    showSuccess(username);
  }
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.value === "") {
    showError(email, "is required.");
  } else if (!re.test(String(email.value).toLowerCase())) {
    showError(email, "is not valid.");
  } else {
    showSuccess(email);
  }
}

function checkPassword(password, min, max) {
  const passwordNums = password.value.length;
  if (passwordNums < min) {
    showError(password, `must be at least ${min} numbers`);
  } else if (passwordNums > max) {
    showError(password, `must be less than ${max} numbers`);
  } else {
    showSuccess(password);
  }
}

function checkConfirm(confirm) {
  if (confirm.value === "") {
    showError(confirm, "is required.");
  } else if (confirm.value !== password.value) {
    showError(confirm, "do not match.");
  } else {
    showSuccess(confirm);
  }
}

function handleClick() {
  checkInvalid([userName, email, password, confirm]);
  checkUserName(userName, 3, 15);
  checkPassword(password, 6, 20);
  checkEmail(email);
  checkConfirm(confirm);
}

function init() {
  button.addEventListener("click", handleClick);
  form.addEventListener("submit", handleSubmit);
}

init();
