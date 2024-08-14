const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line
const app = express();
const port = 3000;
const Sentiment = require('sentiment');
const sentiment = new Sentiment();


// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/resources', (req, res) => {
  res.render('resources');
});

app.get('/mindfulness', (req, res) => {
  res.render('mindfulness');
});

app.get('/forums', (req, res) => {
  res.render('forums');
});
// Route for motivational quotes
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
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.ejs'));
  });
  //route for journal
  app.get('/journal', (req, res) => {
    res.render('journal'); // Render the 'journal.ejs' file
});

// Handle forum form submission
app.post('/forums', (req, res) => {
  const message = req.body.message;
  // You would normally save this message to a database
  console.log('Received message:', message);
  res.redirect('/forums'); // Redirect back to the forums page
});
app.post('/submit-journal', (req, res) => {
  const journalEntry = req.body.journalEntry;
  const result = sentiment.analyze(journalEntry);
  const sentimentScore = result.score; // The sentiment score: positive, negative, or neutral

  // Store the sentiment score along with the journal entry
  let recommendation;
    
    if (sentimentScore > 0) {
        recommendation = "Keep up the positive mindset! How about trying a gratitude journal or sharing your good vibes with someone close?";
    } else if (sentimentScore < 0) {
        recommendation = "It looks like you’re feeling a bit down. Try some deep breathing exercises or listen to your favorite calming music. Remember, it’s okay to ask for help.";
    } else {
        recommendation = "Your entry seems neutral. How about exploring some new mindfulness activities or setting small goals for the day?";
    }
   // Render the result and recommendation
   res.render('journal-result', { entry: journalEntry, sentiment: sentimentScore, recommendation: recommendation });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
