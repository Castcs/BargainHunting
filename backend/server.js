const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const modelPaths = require('./config/ModelPaths');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { fetchData } = require('./Scraper/Models/ScraperFunction');
const jwt = require('jsonwebtoken');
const secretKey = 'secret-token-key';
const app = express();
const port = 3000;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.use(cors());
app.use('/fetchHistory', authenticateToken);
app.use('/saveResult', authenticateToken);
app.use('/removeItem', authenticateToken);

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Sequelize
const sequelize = new Sequelize('BargainHunting', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // To see executed SQL statements in backend console, set to true.
});

// Import the User model from the models folder
const User = require(modelPaths.user)(sequelize, DataTypes);
const SearchHistory = require(modelPaths.history)(sequelize, DataTypes);

// Sync the models with the database
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

    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1d' });
    res.json(token);
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

    // User is authenticated, assign them a token for their session
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });
    res.json({ token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/fetchHistory', async (req, res) => {
  try {
    // Gets the userID from the token sent from the front end.
    const userToken = req.user.id;

    // console.log("UserToken (fetchHistory): " +  userToken);
    // const user = await User.findOne({ where: { Id: userToken } });

    if (!userToken) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find search histories based on the UserId
    const results = await SearchHistory.findAll({ where: { userId: userToken } });

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

  try {
    const searchResults = await fetchData(searchQuery);
    res.json(searchResults);
    
  } catch (error) {
    console.error('Error executing Search:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/saveResult', async (req, res) => {
  const { saved, query }  = req.body; // Use req.body to get parameters from the request body

  try {
    const userToken = req.user.id;

    if (!userToken) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find search histories based on the UserId from token
    const newSave = await SearchHistory.create(
      { userId: userToken, userQuery: query, resultName: saved[0], resultURL: saved[1], resultPrice: saved[2] });

    // Send the results as JSON in the response
    res.json(newSave);

  } catch (error) {
    console.error('Error fetching data from the database:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/removeItem', async(req, res) => {
  const { item } = req.body;

  try {
    // const user = await User.findOne({ where: { email } });
    const userToken = req.user.id;
    // console.log("UserToken (removeItem): " +  userToken);

    if (!userToken) {
      return res.status(404).json( { erro: 'User not found' });
    }

    // Removes the selected item from the database.
    const searchHistory = await SearchHistory.destroy({
      where: { userId: userToken, resultName: item.resultName, resultURL: item.resultURL, resultPrice: item.resultPrice }
    });

    res.status(200).json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});