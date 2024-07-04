export const views = {
    getNotification(message) {
        return (`
        <div class="notification">
            <p>${message}</p>
            <button id="notification-closeButton" class="notification-close">&times;</button>
        </div>
        `)
    }
}