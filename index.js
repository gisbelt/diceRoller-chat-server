import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv'
import { Server as Socketserver } from 'socket.io'
import http from 'http'
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from './routes/message.js'

dotenv.config();

// settings mongoose 
let url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rr0qhya.mongodb.net/?retryWrites=true&w=majority`
mongoose.Promise = global.Promise

const app = express();
const PORT = 4000

// create server with module http
const server = http.createServer(app)
const io = new Socketserver(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// Middlewares: view console requests using morgan 
app.use(cors())
app.use(morgan('dev')) // use when in development mode
app.use(bodyParser.urlencoded({ extended: false })) // analyze bodies through the url 
app.use(bodyParser.json())
app.use('/api', router) // access the route file

/* This is a route that is protected by the JWT middleware. If you try to access it without a valid
token, you will get a 401 error. */
app.get('/protected', (req, res) => {
  res.status(200).send({ message: "This message is protected" });
});

app.get("/", (req, res) => {
  res.status(200).send({ msg: "hello world" })
})

app.post("welcome", (req, res) => {
  const { usename } = req.body;
  res.status(200).send({ msg: `Hello, ${usename}`})
})

// listen to clients connections 
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // send message for our frontend to listen to it 
  socket.on("message", (message, nickname) => {
    // sending to all other connected clients 
    socket.broadcast.emit('message', {
      body: message, 
      from: nickname
    })
  });
});

// database connection and listen application through port 4000
mongoose.set('strictQuery', true);
mongoose.connect(url, {useNewUrlParser: true}).then(() => {
  console.log('successful connection')
  server.listen(PORT, () => {
    console.log('server is runnig in https://diceroller-chat-server.up.railway.app/:', PORT)
  })
})