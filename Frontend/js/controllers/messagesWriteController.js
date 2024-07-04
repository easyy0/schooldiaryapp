import { utilsManager } from "../utils.js";
import { topBar } from "./topBarController.js";
import { views } from "../views/messagesWrite.js";
import { service_messagesWrite } from "../services/messagesWrite.js";
import { showNotification } from "./notificationController.js";

let users = []
let usersString = []

function userDropdownHide() {
    const searchInput = document.querySelector("#searchInput")
    const usersDropdown = document.querySelector("#usersDropdown")

    if (!(searchInput.contains(document.activeElement) || usersDropdown.matches(":hover"))) {
        usersDropdown.classList.remove("d-flex")
        usersDropdown.classList.add("d-none")
    }
}

function addReceiver(userIndex) {
    const receiversHolder = document.querySelector(".home-center-container-receivers-list")
    const receiversIdInput = document.querySelector("#receiversId")
    
    receiversHolder.insertAdjacentHTML("beforeend", 
        `<div class="home-center-container-receivers-list-record">
            <span>${users[userIndex].firstname + " " + users[userIndex].lastname}</span>
            <button class="fa-solid fa-trash-can"></button>
        </div>`
    );

    receiversIdInput.value = receiversIdInput.value.trim() === "" ? users[userIndex].id :receiversIdInput.value + "," + users[userIndex].id
    
    const thisReceiverButton = receiversHolder.lastElementChild;
    thisReceiverButton.querySelector("button").addEventListener("click", (e) => {
        if (users[userIndex].id === Number(receiversIdInput.value.charAt(receiversIdInput.value.length - 1)) && receiversIdInput.value.includes(",")) {
            receiversIdInput.value = receiversIdInput.value.replace(new RegExp("," + users[userIndex].id, "g"), "")
        } else if (receiversIdInput.value.includes(",")) {
            receiversIdInput.value = receiversIdInput.value.replace(new RegExp(users[userIndex].id + ",", "g"), "")
        } else {
            receiversIdInput.value = ""
        }

        usersString[userIndex].selected = false
        thisReceiverButton.remove()
        filterSearch()
    })
}

function filterSearch() {
    const searchInput = document.querySelector("#searchInput")
    const usersDropdown = document.querySelector("#usersDropdown")

    usersDropdown.querySelectorAll("button").forEach(userButton => {
        userButton.remove();
    })
    
    for(let i = 0; i < usersString.length; i++) {
        if (usersString[i].userName.toUpperCase().includes(searchInput.value.toUpperCase()) && !usersString[i].selected) {
            usersDropdown.insertAdjacentHTML("beforeend", `<button><i class="fa-solid fa-plus"></i>    ${usersString[i].userName}</button>`);
            
            const thisButton = usersDropdown.lastElementChild;
            thisButton.setAttribute("id", users[i].id);
            thisButton.addEventListener("click", (e) => {
                usersString[i].selected = true
                thisButton.remove();
                addReceiver(i);
            })
        }
    }
}

function searchInputFunctionality() {
    const searchInput = document.querySelector("#searchInput")
    const usersDropdown = document.querySelector("#usersDropdown")

    searchInput.addEventListener("focus", () => {
        usersDropdown.classList.remove("d-none")
        usersDropdown.classList.add("d-flex")
    })

    searchInput.addEventListener("focusout", userDropdownHide)
    searchInput.addEventListener("keyup", filterSearch)
    usersDropdown.addEventListener("mouseleave", userDropdownHide);

    document.querySelector("#messageForm").addEventListener("submit", function(event) {
        event.preventDefault()
        
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value
        })
    
        
        service_messagesWrite.saveForm(formObject).then(() => {
            showNotification("Message sent successfuly!")
        })
    });
}

export function messagesWriteController() {
    topBar.initTopBar()

    utilsManager.addChild("body", views.base())

    service_messagesWrite.getUsers().then(data => {
        users = data;
        users.forEach((user, index) => {
            usersString[index] = {
                selected: false,
                userName: user.firstname + " " + user.lastname
            }
        });
        filterSearch();
    })

    searchInputFunctionality()
}