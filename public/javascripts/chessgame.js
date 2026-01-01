// const Chess = require("chess.js")

const socket = io()
const chess = new Chess()
const boardElement = document.querySelector('.chessboard')

let draggedPiece = null
let sourceSquare = null
let playerRole = null // or 'b'

const renderBoard = () => {
    const board = chess.board()
    boardElement.innerHTML = ''

    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {

            const squareElement = document.createElement('div')
            squareElement.classList.add(
                'square',
                (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'
            )

            squareElement.dataset.row = rowIndex
            squareElement.dataset.col = colIndex

            // If piece exists
            if (square) {
                const pieceElement = document.createElement('div')
                pieceElement.classList.add(
                    'piece',
                    square.color === 'w' ? 'white' : 'black'
                )

                // Display piece letter
                // pieceElement.innerText =
                //     square.color === 'w'
                //         ? square.type.toUpperCase()
                //         : square.type.toLowerCase()

                pieceElement.innerText = getPieceUnicode(square)
                // Allow drag only for current player
                pieceElement.draggable = playerRole === square.color

                pieceElement.addEventListener('dragstart', (e) => {
                    if (!pieceElement.draggable) return

                    draggedPiece = pieceElement
                    sourceSquare = { row: rowIndex, col: colIndex }
                    e.dataTransfer.setData('text/plain', '')
                })

                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null
                    sourceSquare = null
                })

                squareElement.appendChild(pieceElement)
            }

            // Allow drop
            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault()
            })

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault()
                if (!draggedPiece || !sourceSquare) return

                const targetSquare = {
                    row: parseInt(squareElement.dataset.row),
                    col: parseInt(squareElement.dataset.col)
                }

                handleMove(sourceSquare, targetSquare)
            })

            boardElement.appendChild(squareElement)
        })
    })
}


const handleMove =  ()=>{

}

const getPieceUnicode = (piece)=>{
const unicodePieces = {
    // White pieces
    p: '♙',
    r: '♖',
    n: '♘',
    b: '♗',
    q: '♕',
    k: '♔',

    // Black pieces
    P: '♟',
    R: '♜',
    N: '♞',
    B: '♝',
    Q: '♛',
    K: '♚'
}

return unicodePieces[piece.type] || ''

}

renderBoard()