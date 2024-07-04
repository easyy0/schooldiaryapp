export const views = {
    getMessagesContainer() {
        return (`
            <div class="home-center">
                <div class="home-center-container">
                    <div class="home-center-categories">
                        <button id="filter-all" class="home-center-category category-pressed">
                            All
                        </button>
                        <button id="filter-important" class="home-center-category category-normal">
                            Important
                        </button>
                        <button id="filter-unreaden" class="home-center-category category-normal">
                            Unreaden
                        </button>
                        <button id="filter-readen" class="home-center-category category-normal">
                            Readen
                        </button>
                        <button id="filter-archived" class="home-center-category category-normal">
                            Archived
                        </button>
                        <button id="filter-sent" class="home-center-category category-normal">
                            Sent
                        </button>
                    </div>
                    <div class="home-center-horizontal-elements">
                        <div class="home-center-horizontal-actions">
                            <button id="actions-read" class="fa-solid fa-square-check action-normal"></button>
                            <button id="actions-archive" class="fa-solid fa-archive action-normal"></button>
                            <button id="actions-delete" class="fa-solid fa-trash-can action-normal"></button>
                        </div>
                        <div class="home-center-horizontal-messages">
                            <div id="messageHolder" class="home-center-horizontal-messages-list"></div>
                            <div class="home-center-horizontal-messages-page">
                                <button id="changePageLeft" class="ratio-onebyone">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                                <input id="pageInput" class="ratio-onebyone" type="number" min="1" value="1"/>
                                <button id="changePageRight" class="ratio-onebyone">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                            <button id="buttonWriteMessage" class="home-center-horizontal-messages-reply ratio-onebyone">
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `)
    },
    getMessage({status, boxIcon, sender, title, date}) {
        return (`<button class="home-center-horizontal-messages-list-message ${status === "UNREADEN" ? "unreaden" :
        "readen"}">
            <div class="home-center-horizontal-messages-list-message-box ratio-onebyone ${status === "UNREADEN" ?
            "unreaden-box" : "readen-box"}">
                ${boxIcon}
            </div>
            <div class="home-center-horizontal-messages-list-message-message">
                <span>${sender.firstname} ${sender.lastname}</span>
                <span>${title.substring(0, 20)}...</span>
            </div>
            <div class="home-center-horizontal-messages-list-message-date">
                <span>${date.substring(0, 10)}</span>
                <span>${date.substring(11, 16)}</span>
            </div>
        </button>`)
    }
}