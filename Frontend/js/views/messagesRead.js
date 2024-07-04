export const views = {
    getMessageTemplate({title, sender: {firstname, lastname}, date, description}) {
        const correctDate = new Date(date)
        const year = correctDate.getFullYear()
        const month = (correctDate.getMonth() + 1).toString().padStart(2, "0")
        const day = correctDate.getDate().toString().padStart(2, "0");
        const hour = correctDate.getHours()
        const min = correctDate.getMinutes()

        return (`
        <div class="home-center">
            <div class="home-center-message-box">
                <div class="home-center-message-box-headers">
                    <div class="home-center-message-box-title">
                        <h1>${title}</h1>
                    </div>
                    <div class="home-center-message-box-date">
                        <div class="home-center-message-box-date-sender">
                            <span>${firstname} ${lastname}</span>
                        </div>
                        <div>
                            <span>${year}-${month}-${day}</span>
                            <span>${hour}:${min}</span>
                        </div>
                    </div>
                </div>
                <div class="home-center-message-box-message">
                    <pre>${description}</pre>
                </div>
            </div>
        </div>
        `)
    }
}