let tabs = document.querySelectorAll(".data-filter button");
let tabContents = document.querySelectorAll(".tab-content .tab--item");
// const allSubscribersPage = document.querySelector("#pagination-all");
// const todaySubcribers = document.querySelector("#pagination-today");

// setTimeout(() => {
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
      
          if (index === 0) {
            // All subscribers tab
            currentPage = currentPageAll;
            generatePaginationButtons(subscribersAll.last_page, "all");
          } else if (index === 1) {
            // Today's subscribers tab
            currentPage = currentPageToday;
            generatePaginationButtons(subscribersToday.last_page, "today");
          }
      
          if (tabContents[index].classList.contains("active")) {
            if (index === 0) {
              // All subscribers tab
              getSubscribers(currentPage);
            } else if (index === 1) {
              // Today's subscribers tab
              getTodaySubscribers(currentPage);
            }
          }
        });
      });
      
      
// }, 1000);
