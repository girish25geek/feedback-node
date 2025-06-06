const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3111;
let feedbacks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', (req, res) => {
  const feedback = req.body.feedback;
  if (feedback) {
    feedbacks.push({
      text: feedback,
      time: new Date().toLocaleString()
    });
  }
  res.redirect('/');
});

app.get('/feedbacks', (req, res) => {
  res.json(feedbacks);
});

app.listen(PORT, () => {
  console.log(`🚀 Feedback Pro app live at http://localhost:${PORT}`);
});
