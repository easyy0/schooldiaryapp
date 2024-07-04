let usersDropdown = document.getElementById('usersDropdown')
let receiversHolder = document.querySelector('.home-center-container-receivers-list')
let receiversIdInput = document.getElementById('receiversId')
let searchInput = document.getElementById('search-input')
let users = {}
let usersString = []

function isDropdownActive() {
    return searchInput.contains(document.activeElement) || usersDropdown.matches(':hover');
}

function userDropdownHide() {
    if (!isDropdownActive()) {
        usersDropdown.classList.remove('d-flex')
        usersDropdown.classList.add('d-none')
    }
}

function addReceiver(userIndex) {
    console.log(receiversHolder)
    receiversHolder.insertAdjacentHTML("beforeend", `<div class="home-center-container-receivers-list-record">
        <span>${users[userIndex].firstname + ' ' + users[userIndex].lastname}</span>
        <button class="fa-solid fa-trash-can"></button>
    </div>`);
    receiversIdInput.value = receiversIdInput.value.trim() === '' ? users[userIndex].id :receiversIdInput.value + "," + users[userIndex].id
    const thisReceiverButton = receiversHolder.lastElementChild;
    thisReceiverButton.querySelector('button').addEventListener('click', (e) => {
        if (users[userIndex].id === Number(receiversIdInput.value.charAt(receiversIdInput.value.length - 1)) && receiversIdInput.value.includes(',')) {
            receiversIdInput.value = receiversIdInput.value.replace(new RegExp(',' + users[userIndex].id, 'g'), '')
        } else if (receiversIdInput.value.includes(',')) {
            receiversIdInput.value = receiversIdInput.value.replace(new RegExp(users[userIndex].id + ',', 'g'), '')
        } else {
            receiversIdInput.value = ''
        }
        usersString[userIndex].selected = false
        thisReceiverButton.remove()
        filterSearch()
    })
}

function filterSearch() {
    usersDropdown.querySelectorAll('button').forEach(userButton => {
        userButton.remove();
    })
    for(let i = 0; i < usersString.length; i++) {
        if (usersString[i].userName.toUpperCase().includes(searchInput.value.toUpperCase()) && !usersString[i]
            .selected) {
            usersDropdown.insertAdjacentHTML("beforeend", `<button><i class="fa-solid fa-plus"></i>    ${usersString[i].userName}</button>`);
            const thisButton = usersDropdown.lastElementChild;
            thisButton.setAttribute('id', users[i].id);
            thisButton.addEventListener('click', (e) => {
                usersString[i].selected = true
                thisButton.remove();
                addReceiver(i);
            })
        }
    }
}


function loadUsers() {
    const url = new URL('http://localhost:8080/api/users');
    fetch(url, {
        method: 'GET',
    }).then(response => {return response.json()})
    .then(data => {
        users = data;
        users.forEach((user, index) => {
            usersString[index] = {
                selected: false,
                userName: user.firstname + ' ' + user.lastname
            }
        });
        filterSearch();
    })
}

searchInput.addEventListener('focus', (e) => {
    usersDropdown.classList.remove('d-none')
    usersDropdown.classList.add('d-flex')
})

searchInput.addEventListener('focusout', userDropdownHide);
usersDropdown.addEventListener('mouseleave', userDropdownHide);
searchInput.addEventListener('keyup', filterSearch);

window.addEventListener('DOMContentLoaded', () => {
    loadUsers()
});