export const views = {
    getHomePage() {
        return (`
        <div class="home-center">
            <div class="home-center-element">
                <div class="home-center-element-header">
                    <p>News</p>
                </div>
                <div id="newsHolder" class="home-center-element-list"></div>
            </div>
            <div class="home-center-element">
                <div class="home-center-element-header">
                    <p>Incoming events</p>
                </div>
                <div class="home-center-element-list">
                    <div class="home-center-element-list-record">
                        <div class="home-center-element-list-record-head date">
                            <span>WIP</span>
                            <span>WIP</span>
                        </div>
                        <div class="home-center-element-list-record-body">
                            <span class="home-center-element-list-record-body-head">WIP</span>
                            <span>Work In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `)
    },
    getHomeRecord({ header, title, description}) {
        return (`
            <div class="home-center-element-list-record">
                <div class="home-center-element-list-record-head ratio-onebyone">${header}</div>
                <div class="home-center-element-list-record-body">
                    <span class="home-center-element-list-record-body-head">${title}</span>
                    <span>${description}</span>
                </div>
            </div>
        `)
    }
}