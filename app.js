const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors')
const app = express();
const { connectToDb } = require('./db/db')
const routes = require('./routes/index'); // auto loads index.js

app.use(cors());

connectToDb();

app.use(express.json());
app.use('/api', routes); // All routes prefixed with /api


module.exports = app