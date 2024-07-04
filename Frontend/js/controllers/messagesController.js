import { utilsManager } from "../utils.js";
import { topBar } from "./topBarController.js";
import { service_messages } from "../services/messages.js";
import { views } from "../views/messages.js";
let maxPage = 1

const actions = {
    activeAction: null,
    setupButtons() {
        document.querySelector("#actions-read").addEventListener("click", (e) => {
            this.buttonPressed(e, "read")
        })
        document.querySelector("#actions-archive").addEventListener("click", (e) => {
            this.buttonPressed(e, "archive")
        })
        document.querySelector("#actions-delete").addEventListener("click", (e) => {
            this.buttonPressed(e, "delete")
        })
    },
    resetAllStyles() {
        document.querySelector("#actions-read").classList.remove("action-pressed")
        document.querySelector("#actions-archive").classList.remove("action-pressed")
        document.querySelector("#actions-delete").classList.remove("action-pressed")
    },
    buttonPressed(event, action) {
        if (event.target.classList.contains("action-pressed")) {
            this.resetAllStyles()
            event.target.classList.remove("action-pressed")
            this.activeAction = null
        } else {
            this.resetAllStyles()
            this.activeAction = action
            event.target.classList.add("action-pressed")
        }
    }
}

const categories = {
    activeCategory: "all",

    setupCategoriesButton() {
        document.querySelector("#filter-all").addEventListener("click", (e) => {messages.updateMessages(e, "all")})
        document.querySelector("#filter-important").addEventListener("click", (e) => {messages.updateMessages(e, "important")})
        document.querySelector("#filter-unreaden").addEventListener("click", (e) => {messages.updateMessages(e, "unreaden")})
        document.querySelector("#filter-readen").addEventListener("click", (e) => {messages.updateMessages(e, "readen")})
        document.querySelector("#filter-archived").addEventListener("click", (e) => {messages.updateMessages(e, "archived")})
        document.querySelector("#filter-sent").addEventListener("click", (e) => {messages.updateMessages(e, "sent")})
    }
}

const pages = {
    currentPage: 1,
    initListeneres() {
        const pageInput = document.querySelector("#pageInput")

        document.querySelector("#changePageLeft").addEventListener("click", (e) => {
            const newVal = Number(pageInput.value) - 1
            if (newVal < 1) {
                pageInput.value = 1
            } else {
                pageInput.value = newVal
            }
            pages.currentPage = pageInput.value
            messages.updateMessages()
        })
        document.querySelector("#changePageRight").addEventListener("click", (e) => {
            const newVal = Number(pageInput.value) + 1
            if (newVal > maxPage) {
                pageInput.value = maxPage
            } else {
                pageInput.value = newVal
            }
            pages.currentPage = pageInput.value
            messages.updateMessages()
        })

        pageInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                if (pageInput.value < 1) {
                    pageInput.value = 1;
                } else if (pageInput.value > maxPage) {
                    pageInput.value = maxPage;
                }
                pages.currentPage = pageInput.value
                messages.updateMessages()
            }
        })
        pageInput.addEventListener("focusout", function() {
            pageInput.value = pages.currentPage;
        })
    }
}

const messages = {
    clearMessages() {
        let messages = document.querySelectorAll(".home-center-horizontal-messages-list-message")
        messages.forEach(message => {
            message.remove();
        })
    },
    updateMessages(event, filter) {
        const pressedButton = event?.target
        if (pressedButton) {
            const previousButton = document.getElementById("filter-" + categories.activeCategory)
            previousButton.classList.remove("category-pressed")
            previousButton.classList.add("category-normal")
            pressedButton.classList.remove("category-normal")
            pressedButton.classList.add("category-pressed")
        }
    
        this.clearMessages()
    
        if (filter) {
            categories.activeCategory = filter
            document.querySelector("#pageInput").value = 1
            pages.currentPage = 1
        }
    
        service_messages.getMessagesByFilter(categories.activeCategory, pages.currentPage).then((data) => {
            maxPage = data.totalPages
            for (let i = 0; i < data.content.length; i++) {
                const { id, status, type, sender, title, date, archived } = data.content[i]
                console.log(id)
                
                let boxIcon = ""
                if (type === "IMPORTANT") {
                    boxIcon = "<i class='fa-solid fa-exclamation'></i>"
                }
                if (archived) {
                    boxIcon = "<i class='fa-solid fa-box-archive'></i>"
                } else if (status === "UNREADEN" && type === "DEFAULT") {
                    boxIcon = "<i class='fa-solid fa-bell'></i>"
                } else if (status === "SENT") {
                    boxIcon = "<i class='fa-solid fa-paper-plane'></i>"
                }

                const msgHolder = document.querySelector("#messageHolder")
    
                msgHolder.insertAdjacentHTML("beforeend", views.getMessage({
                    status: status,
                    boxIcon: boxIcon,
                    sender: sender,
                    title: title,
                    date: date
                }))

                const thisMessage = msgHolder.lastElementChild;
                thisMessage.addEventListener("click", (e) => {
                    this.onMessagePressed(id)
                })
            }
        })
    },
    onMessagePressed(msgId) {
        const action = actions.activeAction
        if (action) {
            service_messages.updateMessageBasedOnAction(msgId, action).then((removeOneFromNewMessageCount) => {
                messages.updateMessages(null, categories.activeCategory)
                if(removeOneFromNewMessageCount) {
                    topBar.removeOneFromNewMessageCount()
                }
            })
        } else {
            window.location.href = `./messages-read.html?${new URLSearchParams({id: msgId}).toString()}`;
        }
    },
}

export function messagesController() {
    topBar.initTopBar()
    utilsManager.addChild("body", views.getMessagesContainer())
    categories.setupCategoriesButton()
    actions.setupButtons()
    pages.initListeneres()
    messages.updateMessages(null, "all")

    document.querySelector("#buttonWriteMessage").addEventListener("click", (e) => {
        window.location.href = "./messages-write.html"
    })
}