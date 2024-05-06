function filterMessages(filter) {
    console.log(filter)
    var messages = document.querySelectorAll('[data-important]'); // Pobierz wszystkie wiadomości z atrybutem data-important
    messages.forEach(function(message) {
        if (filter === 'all' || (filter === 'important' && message.dataset.important === 'true')) {
            message.style.display = 'block'; // Wyświetl wiadomość
        } else {
            message.style.display = 'none'; // Ukryj wiadomość
        }
    });
}