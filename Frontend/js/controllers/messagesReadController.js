import { utilsManager } from "../utils.js";
import { topBar } from "./topBarController.js"
import { views } from "../views/messagesRead.js";
import { service_messagesRead } from "../services/messagesRead.js";

export function messagesReadController() {
    topBar.initTopBar()

    const messageId = new URLSearchParams(window.location.search).get("id");

    service_messagesRead.getMessageById(messageId).then(data => {
        utilsManager.addChild("body", views.getMessageTemplate(data[1]))
        if (data[0]) {
            topBar.removeOneFromNewMessageCount()   
        }
    })
}