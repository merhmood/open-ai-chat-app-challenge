import express  from 'express';
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import openai from './openai.config.mjs';
import db from './models/app.model.mjs';
import homepageController from './controllers/homepage.controller.mjs';
import loginController from './controllers/login.controller.mjs';
import signupController from './controllers/signup.controller.mjs';
import logoutController from './controllers/logout.controller.mjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port =  process.env.PORT || 3000

// parse application/json
app.use(bodyParser.json())

// Using pug template engine
app.set('view engine', 'pug')

// Handles homepage request
app.get('/', homepageController);

// Chat socket connection
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        completion(msg).then((data)=>{
            db.chats.push(data);
            io.emit('chat message', db.chats);
        }).catch(()=>{
            io.emit('chat message', 'error');
        })
    });
    const completion = async(msg)=>{
        let userMsg = {role: "user", content: msg}
        db.chats.push(userMsg);
        const res =  await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: db.chats, 
        });
        
        return res.data.choices[0].message;
    }
});

// Handles login page request
app.get('/login', loginController);

// Handles login action request
app.post('/login', loginController);

app.patch('/logout', logoutController);

// Handles signup request request
app.get('/signup', signupController);

// Handles signup action submit
app.post('/signup', signupController);

// Handles request for unhandled parts
app.use('*', (req, res)=>{
    res.statusCode = 404
    res.send('404 page not found')
})


server.listen(port, ()=>{
    console.log(`server started ${port}`);
})
