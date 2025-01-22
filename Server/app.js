import express from 'express';
import morgan from 'morgan';
import dbConnect from './db/db.js';
import userRoutes from './routes/user.route.js';

dbConnect(); // connect to the database

const app = express(); 

app.use(morgan('dev')); // log requests to the console

app.use(express.json()); // parse json requests
app.use(express.urlencoded({ extended: true })); // parse urlencoded requests

app.use('/api/users', userRoutes); // use user routes

app.get('/api/', (req, res)=> {
    res.send('Welcome to the server');
})

export default app;