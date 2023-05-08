const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');

require('express-async-errors');

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter)


module.exports = app;
