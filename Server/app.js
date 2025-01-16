import express from 'express';
import morgan from 'morgan';

const app = express(); 

app.use(morgan('dev')); // log requests to the console

app.use(express.json()); // parse json requests
app.use(express.urlencoded({ extended: true })); // parse urlencoded requests

app.get('/', (req, res)=> {
    res.send('Welcome to the server');
})

export default app;