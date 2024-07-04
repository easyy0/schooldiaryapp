import { views } from "../views/topBar.js";
import { service_topBar } from "../services/topBar.js";
import { utilsManager } from "../utils.js";

export const topBar = {
    initTopBar() {
        displayTopBar()
        setupButtons()
    },
    removeOneFromNewMessageCount() {
        const newMessagesCount = document.querySelector("#newMessagesCount")
        const newVal = Number(newMessagesCount.lastChild.innerText) - 1
        if (newVal > 0) {
            newMessagesCount.lastChild.innerText = newVal
        } else {
            newMessagesCount.remove()
        }
    }
}

function displayTopBar() {
    utilsManager.addChild("body", views.getTopBarView())
    service_topBar.getNewMessagesCount().then(data => {
        if (data > 0) {
            const newMessagesCount = document.querySelector("#newMessagesCount")
            newMessagesCount.classList.add("home-topBar-messages-new")
            newMessagesCount.insertAdjacentHTML("beforeend", views.getNewMessageCountView(data))
        }
    })
}

function setupButtons() {
    document.querySelector("#homeButton").addEventListener("click", () => {
        window.location.href = "../pages/home.html"
    })

    document.querySelector("#messagesButton").addEventListener("click", () => {
        window.location.href = "../pages/messages.html"
    })

    document.querySelector("#timetableButton").addEventListener("click", () => {
        window.location.href = "../pages/timetable.html"
    })

    document.querySelector("#adminPanelButton").addEventListener("click", () => {
        window.location.href = "../pages/adminpanel.html"
    })

    document.querySelector("#logoutButton").addEventListener("click", () => {
        window.location.href = "../pages/logout.html"
    })
}