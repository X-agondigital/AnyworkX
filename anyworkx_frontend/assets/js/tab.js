let tabs = document.querySelectorAll(".data-filter button");
let tabContents = document.querySelectorAll(".tab-content .tab--item");
const tabItem1 = document.getElementById("tab--item-1");
const className = "active";
// const allSubscribersPage = document.querySelector("#pagination-all");
// const todaySubcribers = document.querySelector("#pagination-today");

document.addEventListener("DOMContentLoaded", function() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tabContents[index].classList.add("active");
      tabs[index].classList.add("active");
    });
  });
});
