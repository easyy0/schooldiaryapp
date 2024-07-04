import { urlBase } from "../config.js";

export const service_messagesRead = {
    getMessageById(id) {
        const url = new URL(urlBase + "/api/messages-read")
        url.searchParams.append("messageId", id);

        return fetch(url, {
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
            }
        )
    }
}