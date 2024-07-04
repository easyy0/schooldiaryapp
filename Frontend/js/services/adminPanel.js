import { urlBase } from "../config.js";

export const service_adminPanel = {
    getUsers() {
        const url = new URL(urlBase + "/api/users");
        
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
}