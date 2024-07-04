import { urlBase } from "../config.js"

export const service_login = {
  tryLoginUser(login, password) {
    const data = {
      username: login,
      password: password
    };

    return fetch(urlBase + "/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Invalid username or password");
      }
    }
  )}
}