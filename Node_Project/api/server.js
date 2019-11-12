const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const http=require("http")
const socketio=require("socket.io")
const Filter=require('bad-words')
const app = express();
const server= http.createServer(app)
const io =socketio(server)
mongoose.connect('mongodb://localhost/api',{ useNewUrlParser: true });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json({ "limits":"50mb"}));
app.use(bodyParser.urlencoded({ extended: true, "limits": "50mb" }));
const port = 5000;
const publicDirectoryPath= path.join(__dirname,'./public')

app.use(express.static(publicDirectoryPath))
//let count=0


// server(emit)  ==> client(recieve) --- countUpdated
// client(emit) ==> server(recieve) ---- increment

io.on('connection',(socket)=>{
  console.log("new websocket connection")
socket.emit('message',"welcome!")
socket.broadcast.emit('message',"A new user has joined")


// socket.on('sendMessage',(message,callback)=>
// {
// const filter= new Filter()
// if (filter.isProfane(message))
// {
//   return callback("Profanity is not allowed")
// }

//   io.emit('message',message)
// callback()
// })
socket.on('sendMessage',(message)=>
{

  io.emit('message',message)

})
  // socket.emit('countUpdated',count)
  // socket.on('increment',()=>{
  //   count++
  //   // socket.emit('countUpdated', count)
  //   io.emit('countUpdated',count)
  // })
socket.on('disconnect',()=>{
  io.emit('message', 'A user has left')
})
socket.on('sendLocation',(coords)=>{
  //io.emit('message',`Location:${coords.latitude}, ${coords.longitude}`)
  io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
})
})
server.listen(port, '0.0.0.0', () => {
    console.log(`Its my server on ${port}`);
});
