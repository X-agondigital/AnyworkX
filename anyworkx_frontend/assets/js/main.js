"use strict";

//-----NAVIGATION BAR
const hamburger = document.querySelector(".menu--toggle");
const navMenu = document.querySelector(".right--side__nav");
const navLinkContainer = document.querySelector(".nav--items__container");
const navLinks = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");
const hamburgerIcon = document.getElementById("hamburger");
const classPresent = hamburgerIcon.classList.contains("ri-menu-3-line");

const navToggle = function () {
  navMenu.classList.toggle("showing");
  navLinkContainer.classList.toggle("showing");
  overlay.classList.toggle("hidden");
  hamburgerIcon.classList.toggle("ri-menu-3-line");
  hamburgerIcon.classList.toggle("ri-close-fill");
};

const collapseNavbar = function () {
  //to solve the ovrlay issue on desktop, try using if statement to check for desktop breakpoint
  overlay.classList.add("hidden");
  navMenu.classList.toggle("showing");
  navLinkContainer.classList.toggle("showing");
  hamburgerIcon.classList.toggle("ri-menu-3-line");
  hamburgerIcon.classList.toggle("ri-close-fill");
};

hamburger.addEventListener("click", navToggle);
overlay.addEventListener("click", navToggle);

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", collapseNavbar);
}

//-----ANIMATION SCRIPT
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const animateElements = document.querySelectorAll(".animate");
animateElements.forEach((el) => observer.observe(el));

//ACCORDION SCRIPT CONTROLLER
const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});

//modal window for popup message
const modalWindow = document.querySelector(".modal-window");
const overlay1 = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const modal_btn = document.querySelector(".floating-msg-button");

const openModal = function () {
  modalWindow.classList.toggle("hidden");
};

const closeModal = function () {
  modalWindow.classList.add("hidden");
};

modal_btn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
