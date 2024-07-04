import { service_adminPanel } from "../services/adminPanel.js";
import { utilsManager } from "../utils.js";
import { views } from "../views/adminPanel.js";
import { topBar } from "./topBarController.js";

let usersData = []
let usersString = []

export function adminPanelController() {
    topBar.initTopBar()
    utilsManager.addChild("body", views.getBasePage())

    service_adminPanel.getUsers().then(users => {
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            
            usersData[index] = user
            usersString[index] = user.firstname + " " + user.lastname
            user.role = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
            utilsManager.addChild("#recordsHolder", views.getSingleRecord(user))
        }
        console.log(users)
    })

    document.querySelector('#searchInput').addEventListener('keyup', (e) => {
        const searchInput = e.target
        const recordsHolder = document.querySelector("#recordsHolder")

        recordsHolder.querySelectorAll(".home-center-content-records-record").forEach(userButton => {
            userButton.remove();
        })
        
        for(let i = 0; i < usersData.length; i++) {
            if (usersString[i].toUpperCase().includes(searchInput.value.toUpperCase())) {
                recordsHolder.insertAdjacentHTML("beforeend", views.getSingleRecord(usersData[i]));
            }
        }
    })
}