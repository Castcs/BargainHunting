const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const modelPaths = require('./config/ModelPaths');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { fetchData } = require('./Scraper/Models/ScraperFunction');

const app = express();
const port = 3000;
app.use(cors());

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Sequelize
const sequelize = new Sequelize('BargainHunting', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Import the User model from the models folder
const User = require(modelPaths.user)(sequelize, DataTypes);
const SearchHistory = require(modelPaths.history)(sequelize, DataTypes);

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


app.post('/newUser', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User is authenticated, you can generate and send a token here if using JWT

    res.json({ message: 'Login successful', user: user });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/fetchHistory', async (req, res) => {
  const { email }  = req.body; // Use req.body to get parameters from the request body
  // console.log("Email: " + email);

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find search histories based on the UserId
    const results = await SearchHistory.findAll({ where: { userId: user.id } });
    // console.log(results);

    // Send the results as JSON in the response
    res.json(results);
  } catch (error) {
    console.error('Error fetching data from the database:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/executeSearch', async (req, res) => {
  const { searchQuery }  = req.body; // Use req.body to get parameters from the request body
  console.log("Search Query " + searchQuery);

  try {
    // Find the user by email
    const searchResults = await fetchData(searchQuery);
    // console.log(searchResults);
    res.json(searchResults);
    
  } catch (error) {
    console.error('Error executing Search:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/saveResult', async (req, res) => {
  const { email, saved, query }  = req.body; // Use req.body to get parameters from the request body
  // console.log("Email: " + email);
  // console.log("Result: " + saved);
  // console.log("Query: " + query);

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find search histories based on the UserId
    const newSave = await SearchHistory.create(
      { userId: user.id, userQuery: query, resultName: saved[0], resultURL: saved[1], resultPrice: saved[2] });
    // console.log(results);

    // Send the results as JSON in the response
    res.json(newSave);

  } catch (error) {
    console.error('Error fetching data from the database:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});