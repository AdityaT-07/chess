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
const currentPlayer = 'w';

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');
 
io.on('connection',(uniquesocket)=>{
    console.log("connection establish");
        if(!player.white){
            player.white =uniquesocket.id
            uniquesocket.emit('playerRole','w')
        }
        else if(!player.black){
            player.black = uniquesocket.id
            uniquesocket.emit('playerRole','b')
        }
        else{
            uniquesocket.emit('playerRole')
        }

        uniquesocket.on('move',(move)=>{
          try{
              if(chess.turn()==='w' && uniquesocket.id!==player.white) return;
            if(chess.turn()==='b' && uniquesocket.id!==player.black) return;

            const result =chess.move(move);
            if(result){
                currentPlayer = chess.turn()
                io.emit('move',move)
                io.emit('currentState',chess.fen())
            }
            else{
                console.log("invalid move : ",move);
                uniquesocket.emit('invalidMove',move)
                
            }
          }
          catch(err){
            console.log("invalid move : ",move);
            console.log(err);
            
          }
        })

    uniquesocket.on('disconnect',()=>{
        if(uniquesocket.id ===player.white){
            delete player.white
        }else if(uniquesocket.id ===player.black){
            delete player.black
        }
    })
})

app.get('/',(req,res)=>{
    res.render('index')
})

server.listen(3000,(req,res)=>{
    console.log("server is running on port number 3000");
    
})