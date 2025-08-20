const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
global.Promise = Promise;
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/players', require('./routes/playerRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
