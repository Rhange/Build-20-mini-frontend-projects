const menu = document.querySelector(".js-menu");
const menuBtn = document.querySelector(".js-menuBtn");
const modal = document.querySelector(".js-modal");
const modalContainer = modal.querySelector(".js-modalContainer");
const signUpBtn = document.querySelector(".js-signUpBtn");
const submitBtn = document.querySelector(".js-submitBtn");

const handleMenuClick = () => {
  menu.classList.toggle("menu-show");
};

const handleSignUpClick = () => {
  modal.classList.toggle("modal-show");

  const closeBtn = document.querySelector(".js-modalCloseBtn");
  closeBtn.addEventListener("click", handleSignUpClick);
};

const handleWindowClick = (e) => {
  const targetClassList = Array.from(e.target.classList);
  if (targetClassList.includes("modal-show")) {
    handleSignUpClick();
  }
};

const init = () => {
  if (menuBtn) {
    menuBtn.addEventListener("click", handleMenuClick);
  }

  if (signUpBtn) {
    signUpBtn.addEventListener("click", handleSignUpClick);
  }

  window.addEventListener("click", handleWindowClick);
};

init();
