document.addEventListener('DOMContentLoaded', () => {
    const quoteButton = document.getElementById('new-quote-btn');
    const quoteText = document.getElementById('quote-text');

    quoteButton.addEventListener('click', () => {
        fetch('/quote')
            .then(response => response.json())
            .then(data => {
                quoteText.textContent = data.quote;
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
    });
});
