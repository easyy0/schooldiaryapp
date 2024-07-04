export const views = {
    getBasePage() {
        return (`
        <div class="home-center">
            <div class="home-center-categories">
                <button class="button-pressed"><i class="fa-solid fa-user"></i> Users</button>
                <button><i class="fa-solid fa-school"></i> Classes</button>
            </div>
            <div class="home-center-spacer"></div>
            <div class="home-center-content">
                <div class="home-center-content-header">
                    <input id="searchInput" class="home-center-content-header-search" type="text" placeholder="Search"/>
                    <span class="home-center-content-header-search-icon fa-solid fa-search"></span>
                    <button class="home-center-content-header-search-addUser fa-solid fa-user-plus"></button>
                </div>
                <div id="recordsHolder" class="home-center-content-records"></div>
            </div>
        </div>
        `)
    },
    getSingleRecord({ firstname, lastname, role}) {
        return (`
        <div class="home-center-content-records-record">
            <span class="home-center-content-records-record-name">${firstname} ${lastname}</span>
            <span class="home-center-content-records-record-group">${role} <button class="home-center-content-records-record-edit fa-solid fa-pen"></button></span>
            
        </div>    
        `)
    }
}