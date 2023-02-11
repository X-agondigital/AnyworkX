"use strict";

const hamburger = document.querySelector(".menu--toggle");
const navMenu = document.querySelector(".right--side__nav");
const navLinkContainer = document.querySelector(".nav--items__container");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("showing");
  navLinkContainer.classList.toggle("showing");
});

//tab controller
const tabs = document.querySelectorAll(".tab-btn");
const all_content = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => { tab.classList.remove('active') });
        tab.classList.add('active');

        const line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + 3 + 'px';
        line.style.left = e.target.offsetLeft + 'px';

        all_content.forEach(content => { content.classList.remove('active') });
        all_content[index].classList.add('active');
    })
})
