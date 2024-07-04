import { loginController } from "./controllers/loginController.js"
import { homeController } from "./controllers/homeController.js"
import { logoutController } from "./controllers/logoutController.js"
import { messagesController } from "./controllers/messagesController.js"
import { messagesReadController } from "./controllers/messagesReadController.js"
import { messagesWriteController } from "./controllers/messagesWriteController.js"
import { timetableController } from "./controllers/timetableController.js"
import { adminPanelController } from "./controllers/adminPanelController.js"

function initPage() {
    const bodyId = document.body.id

    switch (bodyId) {
        case "login":
            loginController()
            break
        case "home":
            homeController()
            break
        case "messages":
            messagesController()
            break
        case "messages-read":
            messagesReadController()
            break
        case "messages-write":
            messagesWriteController()
            break
        case "timetable":
            timetableController()
            break
        case "adminpanel":
            adminPanelController()
            break
        case "logout":
            logoutController()
            break
        default:
            window.location.href = "../Frontend/pages/home.html"
            break
    }
}

document.addEventListener("DOMContentLoaded", initPage)