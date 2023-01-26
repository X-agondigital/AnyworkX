'use strict'

const hamburger = document.querySelector('.menu--toggle');
const navMenu = document.querySelector('.right--side__nav');
const navLinkContainer = document.querySelector('.nav--items__container');

hamburger.addEventListener('click', function(){
    navMenu.classList.toggle('showing');
    navLinkContainer.classList.toggle('showing');
});