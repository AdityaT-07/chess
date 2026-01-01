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
let currentPlayer = 'w';

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');
 
io.on('connection', (uniquesocket) => {

    if (!player.white) {
        player.white = uniquesocket.id
        uniquesocket.emit('playerRole', 'w')
    }
    else if (!player.black) {
        player.black = uniquesocket.id
        uniquesocket.emit('playerRole', 'b')
    }
    else {
        uniquesocket.emit('spectatorRole') // correction
    }

    uniquesocket.on('move', (move) => {
        try {
            if (chess.turn() === 'w' && uniquesocket.id !== player.white) return
            if (chess.turn() === 'b' && uniquesocket.id !== player.black) return

            const result = chess.move(move)

            if (!result) {
                uniquesocket.emit('invalidMove', move)
                return
            }

            currentPlayer = chess.turn()
            io.emit('move', move)
            io.emit('boardState', chess.fen()) //correction
        }
        catch (err) {
            console.error(err)
        }
    })

    uniquesocket.on('disconnect', () => {
        if (uniquesocket.id === player.white) delete player.white
        if (uniquesocket.id === player.black) delete player.black
    })
})


app.get('/',(req,res)=>{
    res.render('index')
})

server.listen(3000,(req,res)=>{
    console.log("server is running on port number 3000");
    
})