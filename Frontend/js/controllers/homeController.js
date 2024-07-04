import { topBar } from "./topBarController.js";
import { service_home } from "../services/home.js";
import { utilsManager } from "../utils.js";
import { views } from "../views/home.js";


export function homeController() {
    topBar.initTopBar()
    utilsManager.addChild("body", views.getHomePage())

    service_home.getHomePageData().then(data => {
        displayNews(data)
    }).catch(() => {
        window.location.href = "../pages/login.html"
    })
}

function displayNews(news) {
    const newsHolder = document.querySelector("#newsHolder")

    for (let i = 0; i < news.length; i++) {
        newsHolder.insertAdjacentHTML("beforeend", views.getHomeRecord({
            "header": news[i].header,
            "title": news[i].title,
            "description": news[i].description
        }));
    }
}