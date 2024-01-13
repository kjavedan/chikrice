const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".burger-menu");
const closeNavbar = document.querySelector(".close-navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.add("show");
  closeNavbar.classList.add("show");
});

closeNavbar.addEventListener("click", () => {
  navbar.classList.remove("show");
  closeNavbar.classList.remove("show");
});
