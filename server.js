const express = require('express');
const errorHandler = require('./app/middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./app/config/dbConnection');

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts', require('./app/routes/contactRoutes'));
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});