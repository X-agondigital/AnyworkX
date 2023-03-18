"use strict";

//-----NAVIGATION BAR
const hamburger = document.querySelector(".menu--toggle");
const navMenu = document.querySelector(".right--side__nav");
const navLinkContainer = document.querySelector(".nav--items__container");
const navLinks = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");

const navToggle = function () {
  navMenu.classList.toggle("showing");
  navLinkContainer.classList.toggle("showing");
  overlay.classList.toggle("hidden");
};

hamburger.addEventListener("click", navToggle);
overlay.addEventListener("click", navToggle);

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", navToggle);
}

const hamburgerIcon = document.getElementById('hamburger');
const classPresent = hamburgerIcon.classList.contains('ri-menu-3-line');

function checkActiveClass(){
  if(classPresent){
    hamburgerIcon.classList.toggle('ri-menu-3-line');
    hamburgerIcon.classList.toggle('ri-close-fill');
  }
}

hamburgerIcon.addEventListener('click', checkActiveClass);

//-----TAB PANE CONTROLLER
const tabs = document.querySelectorAll("#tab-box");
const line = document.querySelector(".line");

for (let i = 0; i < tabs.length; i++){
  line.style.width = tabs[i].offsetWidth + 3 + "px";
}
// tabs.forEach((tab, index) => {
//   tab.addEventListener("click", (e) => {
//     tabs.forEach((tab) => {
//       tab.classList.remove("active");
//     });
//     tab.classList.add("active");

//     const line = document.querySelector(".line");
//     line.style.width = e.target.offsetWidth + 3 + "px";
//     line.style.left = e.target.offsetLeft + "px";

//     all_content.forEach((content) => {
//       content.classList.remove("active");
//     });
//     all_content[index].classList.add("active");
//   });
// });

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
