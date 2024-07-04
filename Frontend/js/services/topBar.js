import { urlBase } from "../config.js"

export const service_topBar = {
    getNewMessagesCount() {
        return fetch(urlBase + "/api/messages-count", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                window.location.href = "../pages/logout.html"
            }
        })
    }
}