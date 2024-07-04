import { urlBase } from "../config.js"

export const service_messages = {
    getMessagesByFilter(filter, page) {
        const url = new URL(urlBase + "/api/messages")
        if (filter != "all") {
            url.searchParams.append("messagesFilter", filter);
        }
        url.searchParams.append("page", page);
    
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    window.location.href = "../pages/logout.html"
                }
            }
        )
    },
    updateMessageBasedOnAction(messageId, activeAction) {
        const url = new URL(urlBase + "/api/messages")
    
        url.searchParams.append("messageId", messageId);
        url.searchParams.append("method", activeAction);
    
        return fetch(url, {
            method: "PATCH",
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