document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to the Mental Health Journal!');
    app.get('/quote', (req, res) => {
        const quotes = [
            "Believe in yourself and all that you are.",
            "You are stronger than you think.",
            "The only limit to our realization of tomorrow is our doubts of today.",
            "Keep your face always toward the sunshine—and shadows will fall behind you."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.json({ quote: randomQuote });
    });
    
});
