let messageHolder = document.getElementById('messageHolder')
let leftButton = document.getElementById('changePageLeft')
let rightButton = document.getElementById('changePageRight')
let pageInput = document.getElementById('pageInput')
let currentPage = 1
let maxPage = null
let activeCategory = 'all'

function getMessageView(data) {
    const { sender, description, date, status, type } = data;
    let boxIcon = ''
    switch (type) {
        case 'IMPORTANT':
            boxIcon = '<i class="fa-solid fa-exclamation"></i>'
            break
        case 'ARCHIVED':
            boxIcon = '<i class="fa-solid fa-box-archive"></i>'
            break
        case 'SENT':
            boxIcon = '<i class="fa-solid fa-paper-plane"></i>'
            break
    }
    if (status === 'UNREADEN' && type === 'DEFAULT') {
        boxIcon = '<i class="fa-solid fa-bell"></i>'
    }

    return `<button class="home-center-horizontal-messages-list-message ${status === 'READEN' ? 'readen' : 'unreaden'}">
        <div class="home-center-horizontal-messages-list-message-box ratio-onebyone ${status === 'READEN' ? 'readen-box' : 'unreaden-box'}">
            ${boxIcon}
        </div>
        <div class="home-center-horizontal-messages-list-message-message">
            <span>${sender.firstname} ${sender.lastname}</span>
            <span>${description.substring(0, 20)}...</span>
        </div>
        <div class="home-center-horizontal-messages-list-message-date">
            <span>${date.substring(0, 10)}</span>
            <span>${date.substring(11, 16)}</span>
        </div>
    </button>`;
}

function loadMessages(filter) {
    let messages = document.querySelectorAll('.home-center-horizontal-messages-list-message')
    messages.forEach(message => {
        message.remove();
    })

    const url = new URL('http://localhost:8080/api/messages');
    url.searchParams.append('page', currentPage);
    if (filter != 'all') {
        url.searchParams.append('messagesFilter', filter);
    }

    fetch(url, {
      method: 'GET',
    })
    .then(response => {return response.json()})
    .then(data => {
        maxPage = data.totalPages
        pageInput.max = maxPage
        data.content.forEach(message => {
            const messageHTML = getMessageView(message)
            messageHolder.insertAdjacentHTML("beforeend", messageHTML);
        })
    })
}

function filterMessages(event, filter) {
    const previousButton = document.getElementById('filter-' + activeCategory)
    activeCategory = filter
    previousButton.classList.remove('category-pressed')
    previousButton.classList.add('category-normal')
    const pressedButton = event.target
    pressedButton.classList.remove('category-normal')
    pressedButton.classList.add('category-pressed')
    currentPage = 1
    pageInput.value = currentPage
    loadMessages(filter)
}

leftButton.addEventListener('click', () => {
    if (currentPage <= 1) {
        return
    }
    currentPage = currentPage - 1
    pageInput.value = currentPage
    loadMessages(activeCategory)
})

rightButton.addEventListener('click', () => {
    currentPage = parseInt(currentPage)
    if (maxPage && currentPage + 1 > maxPage) {
        return
    }
    currentPage = currentPage + 1
    pageInput.value = currentPage
    loadMessages(activeCategory)
})

pageInput.addEventListener("focusout", function() {
    pageInput.value = currentPage;
});

pageInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        if (pageInput.value < 1) {
            pageInput.value = 1;
        } else if (pageInput.value > maxPage) {
            pageInput.value = maxPage;
        }
        currentPage = pageInput.value
        loadMessages(activeCategory)
    }
})

window.addEventListener('DOMContentLoaded', () => {
    loadMessages(activeCategory)
});