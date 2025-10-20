const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = 3009;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user-information', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());
// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', formRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
