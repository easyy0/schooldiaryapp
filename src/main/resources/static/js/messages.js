let messageHolder = document.getElementById('messageHolder')
let leftButton = document.getElementById('changePageLeft')
let rightButton = document.getElementById('changePageRight')
let pageInput = document.getElementById('pageInput')
let readenButton = document.getElementById('readenButton')
let archiveButton = document.getElementById('archiveButton')
let deleteButton = document.getElementById('deleteButton')
let currentPage = 1
let maxPage = null
let activeCategory = 'all'
let activeActions = null

function getMessageView(data) {
    console.log(data)
    const { sender, description, date, status, archived, type } = data;
    let boxIcon = ''
    switch (type) {
        case 'IMPORTANT':
            boxIcon = '<i class="fa-solid fa-exclamation"></i>'
            break
        case 'SENT':
            boxIcon = '<i class="fa-solid fa-paper-plane"></i>'
            break
    }
    if (archived) {
        boxIcon = '<i class="fa-solid fa-box-archive"></i>'
    } else if (status === 'UNREADEN' && type === 'DEFAULT') {
        boxIcon = '<i class="fa-solid fa-bell"></i>'
    }

    return `<button class="home-center-horizontal-messages-list-message ${status === 'READEN' ? 'readen' :
    'unreaden'}">
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
            const thisMessage = messageHolder.lastElementChild;
            thisMessage.setAttribute('id', message.id);
            thisMessage.addEventListener('click', () => {
                if (activeActions) {
                    switch (activeActions) {
                        case 'readen':

                            break;
                        case 'archive':

                            break;
                        case 'delete':

                            break;
                    }
                    console.log(thisMessage.getAttribute('id'))
                }
            })
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

function resetActionButtons() {
    readenButton.classList.remove('action-pressed')
    readenButton.classList.add('action-normal')
    archiveButton.classList.remove('action-pressed')
    archiveButton.classList.add('action-normal')
    deleteButton.classList.remove('action-pressed')
    deleteButton.classList.add('action-normal')
}

readenButton.addEventListener('click', () => {
    resetActionButtons()
    if (activeActions === 'readen') {
        activeActions = null;
    } else {
        readenButton.classList.remove('action-normal')
        readenButton.classList.add('action-pressed')
        activeActions = 'readen';
    }
})

archiveButton.addEventListener('click', () => {
    resetActionButtons()
    if (activeActions === 'archive') {
        activeActions = null;
    } else {
        archiveButton.classList.remove('action-normal')
        archiveButton.classList.add('action-pressed')
        activeActions = 'archive';
    }
})

deleteButton.addEventListener('click', () => {
    resetActionButtons()
    if (activeActions === 'delete') {
        activeActions = null;
    } else {
        deleteButton.classList.remove('action-normal')
        deleteButton.classList.add('action-pressed')
        activeActions = 'delete';
    }
})


window.addEventListener('DOMContentLoaded', () => {
    loadMessages(activeCategory)
});