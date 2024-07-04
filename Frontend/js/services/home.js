import { urlBase } from "../config.js";

export const service_home = {
  getHomePageData() {
    return fetch(urlBase + "/api/home", {
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