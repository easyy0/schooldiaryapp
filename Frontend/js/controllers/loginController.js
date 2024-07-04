import { getLoginPage } from "../views/login.js";
import { service_login } from "../services/login.js";
import { utilsManager } from "../utils.js";

export function loginController() {
    localStorage.removeItem("jwtToken");
    refreshPage()

    document.querySelector("#submitButton").addEventListener("click", onSubmitted)
}

export function refreshPage(errorMessage) {
    const form = document.querySelector("form")
    form !== null ? form.remove() : null

    utilsManager.addChild("body", getLoginPage(errorMessage))
}

function onSubmitted(event) {
    event.preventDefault()
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    if (username.length === 0 || password.length === 0) {
        refreshPage("All fields cannot be empty")
        return
    }

    service_login.tryLoginUser(username, password).then(data => {
        localStorage.setItem("jwtToken", data.jwtToken)
        window.location.href = "../pages/home.html"
    }).catch(message => {
        refreshPage(message)
    })
}