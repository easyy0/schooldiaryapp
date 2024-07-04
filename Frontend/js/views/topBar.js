export const views = {
    getTopBarView() {
        return (`
        <div class="home-topBar">
            <button id="homeButton" class="home-topBar-page">
                <i class="fa-solid fa-house"></i>
                <p>Home</p>
            </button>
            <button id="messagesButton" class="home-topBar-page">
                <i class="fa-solid fa-envelope-open-text"></i>
                <div id="newMessagesCount"></div>
                <p>Messages</p>
            </button>
            <button id="timetableButton" class="home-topBar-page">
                <i class="fa-solid fa-table"></i>
                <p>Timetable</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-user-graduate"></i>
                <p>Marks</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-chart-column"></i>
                <p>Frequence</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-person-chalkboard"></i>
                <p>Lessons</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-calendar-days"></i>
                <p>Calendar</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Notes</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-list-check"></i>
                <p>Exams</p>
            </button>
            <button class="home-topBar-page">
                <i class="fa-solid fa-file-signature"></i>
                <p>Homeworks</p>
            </button>
            <button id="adminPanelButton" class="home-topBar-page">
                <i class="fa-solid fa-user-gear"></i>
                <p>Admin Panel</p>
            </button>
            <button id="logoutButton" class="home-topBar-page">
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Logout</p>
            </button>
        </div>`)
    },
    getNewMessageCountView(newMessageCount) {
        return (`<p>${newMessageCount}</p>`)
    }
}