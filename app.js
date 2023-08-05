require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/polling-system-api';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Routes

const optionRoutes = require('./routes/optionRoutes');
const questionRoutes = require('./routes/questionRoutes');


app.use('/options', optionRoutes);
app.use('/questions', questionRoutes);

// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});
