import { urlBase } from "../config.js";

export const service_messagesWrite = {
    getUsers() {
        const url = new URL(urlBase + "/api/users");
        url.searchParams.append("role", "TEACHER");

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
        }).then(response => {
            return response.json()
        })
    },
    saveForm(formData) {
        console.log(formData)

        const url = new URL(urlBase + "/api/messages");
        
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (response.ok) {
                return true
            } else {
                window.location.href = "../pages/logout.html"
            }
        })
    }
}