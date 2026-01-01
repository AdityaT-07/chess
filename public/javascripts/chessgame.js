// const { Chess } = require("chess.js")

const socket = io()
const chess = new Chess()
const boardElement = document.getElementsByClassName('chessboard')

let draggedPiece = null
let sourceSquare = null
let playerRole = null

const renderBoard = ()=>{
 const board = chess.board()
 boardElement.innerHTML = ''
 board.forEach((row,rowIndex)=>{
    row.forEach((square,squareIndex)=>{
        const squareElement = document.createElement('div')
        squareElement.classList.add('square',
            (rowIndex + squareIndex)%2===0?'light' :'dark'
        )
        squareElement.dataset.row =rowIndex
        squareElement.dataset.col = squareIndex

        if(square){
            let pieceElement = document.createElement('div')
            pieceElement.classList.add('piece',
                square.color==='w'?'white':'black'
            )
            pieceElement.innerText= ''
            pieceElement.draggable = playerRole === square.color

            pieceElement.addEventListener('dragstart',()=>{
                if(pieceElement.draggable){
                    draggedPiece = pieceElement  // draggedPiece set
                    sourceSquare = {row : rowIndex , col : squareIndex} 
                    // sourceSquare set
                    
                }
            })

        }
    })
 })
}
const handleMove =  ()=>{

}

const getPieceUnicode = ()=>{

}