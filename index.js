const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
