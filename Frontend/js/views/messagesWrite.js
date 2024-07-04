export const views = {
    base() {
        return (`
        <div class="home-center">
            <div class="home-center-container-receivers">
                <h1 class="home-center-container-header">Receivers</h1>
                <div class="home-center-container-receivers-search">
                    <label class="fa-solid fa-search" for="searchInput"></label>
                    <input id="searchInput" type="text" placeholder="Search" />
                    <div id="usersDropdown" class="dropdown-content d-none"></div>
                </div>
                <div class="home-center-container-receivers-list"></div>
            </div>
            <div class="home-center-container-message">
                <h1 class="home-center-container-header">Message</h1>
                <form id="messageForm" method="post" class="home-center-container-form">
                    <input name="receivers" type="text" id="receiversId" class="d-none"/>
                    <div class="home-center-container-form-input">
                        <label>Title:</label>
                        <input name="title" type="text" maxlength="60" required/>
                    </div>
                    <div class="home-center-container-form-input">
                        <textarea name="message" placeholder="Message" required></textarea>
                    </div>
                    <div class="home-center-container-form-msgtype">
                        <label>Important</label>
                        <input name="isImportant" type="checkbox" th:value="true"/>
                    </div>
                    <input class="home-center-container-form-submit" type="submit" value="Send"/>
                </form>
            </div>
        </div>
        `)
    }
}