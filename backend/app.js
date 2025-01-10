import 'dotenv/config';
import { MongoClient } from 'mongodb';
import OpenAI from "openai";
import { initializeDatabases } from './mongo_client.js';
import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import surveyRouter from './routes/surveys.js';

// Get the __dirname equivalent for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const client = new MongoClient(process.env.URI);

client.connect();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openai };

//initializeDatabases(client);


const db = client.db('interviews');
export { db };




const corsOptions = {
  origin: 'http://localhost:3000', // Allow only the frontend origin
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
};

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/surveys', surveyRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});



// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
