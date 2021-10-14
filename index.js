import express from 'express';
import dotenv from 'dotenv';
import checkPass from './pass.js';

const app = express();
dotenv.config();
const port = process.env.PORT;
const messages = [];


app.use(express.json());

// Endpoint to check if message was saved:
app.get('/check', (req, res) => {
    res.send(messages);
});

// Password from Header:
app.use('/', async (req, res) => {
    const pass = req.headers.authorization;
    
    try {
        if (!req.body.message) {
            res.status(400);
            res.send("Please provide a message");
            return;
        }
        if (!pass) {
            res.status(400);
            res.send("Please provide a password");
            return;
        }
        if (!await checkPass(pass)) {
            res.status(400);
            res.send("Password is incorrect");
            return;
        }
        messages.push(req.body.message)
        res.send(`Message: ${req.body.message} saved`);
    } catch (error) {
        console.log(error)
        res.status(404);
    }
})

// Password from url query string:
/* app.use('/', async (req, res) => {
    const pass = req.query.pass;
    try {
        if (!req.body.message) {
            res.status(400);
            res.send("Please provide a message");
            return;
        }
        if (!pass) {
            res.status(400);
            res.send("Please provide a password");
            return;
        }
        if (!await checkPass(pass)) {
            res.status(400);
            res.send("Password is incorrect");
            return;
        }
        messages.push(req.body.message)
        res.send(`Message: ${req.body.message} saved`);
    } catch (error) {
        console.log(error)
        res.status(404);
    }
}) */

// Password from params:
/* app.use('/:pass', async (req, res) => {
    try {
        if (!req.body.message) {
            res.status(400);
            res.send("Please provide a message");
            return;
        }
        if (!req.params.pass) {
            res.status(400);
            res.send("Please provide a password");
            return;
        }
        if (!await checkPass(req.params.pass)) {
            res.status(400);
            res.send("Password is incorrect");
            return;
        }
        console.log(checkPass(req.params.pass));
        messages.push(req.body.message)
        res.send(`Message: ${req.body.message} saved`);
    } catch (error) {
        console.log(error)
        res.status(404);
    }
}) */


// Password from body:
/* app.use('/', async (req, res) => {
    try {
        if (!req.body.message) {
            res.status(400);
            res.send("Please provide a message");
            return;
        }
        if (!req.body.password) {
            res.status(400);
            res.send("Please provide a password");
            return;
        }
        if (!await checkPass(req.body.password)) {
            res.status(400);
            res.send("Password is incorrect");
            return;
        }
        messages.push(req.body.message)
        res.send(`Message: ${req.body.message} saved`);
    } catch (error) {
        console.log(error)
        res.status(404);
    }
}) */


app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

