import { utilsManager } from "../utils.js";
import { views } from "../views/timetable.js";
import { topBar } from "./topBarController.js";

export function timetableController() {
    topBar.initTopBar()
    utilsManager.addChild("body", views.getPageDefaults())
    utilsManager.addChild(".home-center", views.getTimetable())
}