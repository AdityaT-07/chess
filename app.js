const express = require('express')
const http = require('http')
const socket = require('socket.io')
const {Chess} = require('chess.js')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const chess = new Chess()

const player ={};
const currentPlayer = 'W';

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');
 
io.on('connection',(uniquesocket)=>{
    console.log("connection establish",uniquesocket.id);
    
})

app.get('/',(req,res)=>{
    res.render('index')
})

server.listen(3000,(req,res)=>{
    console.log("server is running on port number 3000");
    
})