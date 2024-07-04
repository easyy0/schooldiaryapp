import { utilsManager } from "../utils.js";
import { views } from "../views/notification.js";

export function showNotification(message) {
    utilsManager.addChild("body", views.getNotification(message))

    document.querySelector("#notification-closeButton").addEventListener("click", () => {
        const notif = document.querySelector(".notification")

        notif.animate([
            { bottom: "20px" },
            { bottom: "-160px" },
        ], {
            duration: 1000,
            fill: "forwards"
        }).onfinish = () => {
            notif.remove();
        };
    })
}