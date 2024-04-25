"use strict";

const popupClose = document.querySelector(".popup-close-btn");
const popupMessage = document.querySelector(".message-popup--wrapper");
const chatOpenBtn = document.querySelector(".chat-button");

/*if (popupClose) {
  popupClose.addEventListener("click", function () {
    popupMessage.classList.add("hidden");
  });
}

setTimeout(function () {
  popupMessage.classList.remove("hidden");
}, 7000);*/


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

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      // console.log(content.style.maxHeight);
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const modalBox = document.querySelector(".modal-window");
  const overlay1 = document.querySelector(".overlay");
  const closeBtns = document.querySelectorAll(".close-btn");
  const modal_btn = document.querySelector(".floating-msg-button");

  const openModal = function () {
    modalBox.classList.toggle("hidden");
  };

  const closeModal = function () {
    modalBox.classList.add("hidden");
  };

  // modal_btn.addEventListener("click", openModal);
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", closeModal);
  });
  chatOpenBtn.addEventListener("click", function () {
    modalBox.classList.remove("hidden");
    popupMessage.classList.add("hidden");
  });
});

//SCRIPT FOR CONTACT FORM
document.getElementById("contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById("nameHASHED").value;
  const emailAddress = document.getElementById("emailHASHED").value;
  const messageArea = document.getElementById("messageHASHED").value;
  const submitBtn = document.getElementById("submit-btn");
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.classList.add("active");

  fetch(`https://anyworkx.onrender.com/api/contact/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fullname: name,
      email: emailAddress,
      message: messageArea,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.classList.remove("active");
      submitBtn.textContent = "Message Sent Successfully";

      setTimeout(function () {
        e.target.reset();
        // submitBtn.textContent = "Send Message";
      }, 5000);
    })
    .catch((err) => console.log(err));
}
