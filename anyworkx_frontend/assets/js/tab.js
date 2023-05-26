let tabs = document.querySelectorAll(".data-filter button");
let tabContents = document.querySelectorAll(".tab-content .tab--item");
const allSubscribers = document.getElementById("all-subscribers");
const className = "active";
const allSubscribersPage = document.querySelector("#pagination-all");
const todaySubcribers = document.querySelector("#pagination-today");

setTimeout(() => {
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

      if(allSubscribers.classList.contains(className)){
        // todaySubcribers.classList.add('hidden');
        todaySubcribers.style.display = "hidden";
      } else{
        allSubscribersPage.classList.add('hidden')
        // todaySubcribers.classList.remove('hidden')
      }
    });
  });
}, 1000);
