function getSubscribers(pageNumber) {
    fetch(`https://cerdo.pythonanywhere.com/api/subscribers/?page=${pageNumber}`)
        .then(response => response.json())
        .then((subscribers) => {
            let output = ` `;
            for (const [key, subscriber] of Object.entries(subscribers.subscribers)) {
                output += `
            <tr>
                <td data-label="Email Address">${subscriber.email}</td>
                <td data-label="Date subscribed">${subscriber.created_at}</td>
                <td><a class="delete btn--action">Delete</a></td>
            </tr>
        `;
            }
            document.getElementById('subscriber-table-body').innerHTML = output;
            generatePaginationButtons(subscribers.total_pages, pageNumber);
        })
        .catch(error => {
            console.error(`Error loading subscribers: ${error}`);
        });
}

function generatePaginationButtons(totalPages, currentPage) {
    const paginationDiv = document.querySelector('.pagination');
    let paginationOutput = 'Page ';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationOutput += `<button class="current-page">${i}</button> `;
        } else {
            paginationOutput += `<button>${i}</button> `;
        }
    }
    paginationDiv.innerHTML = paginationOutput;
    const buttons = paginationDiv.querySelectorAll('.pagination-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            getSubscribers(button.textContent);
            buttons.forEach(button => button.classList.remove('current-page'));
            button.classList.add('current-page');
        });
    });
}

// Initialize with the first page
getSubscribers(1);