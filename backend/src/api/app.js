const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRoutes = require('../routes/usersRoute');
const userMiddleware = require('../middlewares/usersError');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(usersRoutes);
app.use(userMiddleware);

module.exports = app;
