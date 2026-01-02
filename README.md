# ♟️ Multiplayer Chess Game (Socket.IO + Chess.js)

A real-time **multiplayer chess game** built using **JavaScript**, **Node.js**, **Express**, **Socket.IO**, and **chess.js**.
The project supports **two players (White & Black)** and **spectators**, with full server-side move validation and real-time board synchronization.

---

## 🚀 Features

* ♞ Real-time multiplayer gameplay using **Socket.IO**
* 👥 Automatic role assignment: **White**, **Black**, or **Spectator**
* 🧠 **Server-side move validation** using `chess.js`
* 🔒 Turn-based move enforcement (no cheating)
* 🔄 Live board synchronization using **FEN notation**
* 🖱️ Drag & Drop piece movement
* ♜ Unicode chess pieces (no images required)
* 👀 Spectator mode (view-only)

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3 / Tailwind CSS
* Socket.IO Client
* chess.js (CDN)

### Backend

* Node.js
* Express.js
* Socket.IO
* chess.js

---

## 📂 Project Structure

```
chess/
│
├── public/
│   ├── javascripts/
│   │   └── chessgame.js   # Frontend logic
│   └── css/
│
├── views/
│   └── index.ejs          # Main UI
│
├── app.js                 # Backend server & socket logic
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/multiplayer-chess.git
cd multiplayer-chess
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Server

```bash
node app.js
```

or (recommended):

```bash
nodemon app.js
```

### 4️⃣ Open in Browser

```
http://localhost:3000
```

Open the URL in **two different browsers or tabs** to play.

---

## 🎮 How the Game Works

### Player Assignment

* First connected user → **White**
* Second connected user → **Black**
* Any additional users → **Spectators**

### Move Flow

1. Player drags a piece
2. Move is sent to server via Socket.IO
3. Server validates the move using `chess.js`
4. If valid:

   * Move is applied
   * Updated board (FEN) is broadcast to all clients
5. If invalid:

   * Move is rejected

---

## 🔁 Socket.IO Events

### Client → Server

| Event  | Description                                  |
| ------ | -------------------------------------------- |
| `move` | Sends a chess move `{ from, to, promotion }` |

### Server → Client

| Event           | Description             |
| --------------- | ----------------------- |
| `playerRole`    | Assigns `w` or `b`      |
| `spectatorRole` | Assigns spectator       |
| `move`          | Broadcasts a valid move |
| `boardState`    | Sends updated board FEN |
| `invalidMove`   | Notifies invalid move   |

---

## ♟️ Chess Logic

* Board state managed **only on server**
* Uses `chess.js` for:

  * Legal move validation
  * Turn management
  * FEN generation
  * Game rules enforcement

---

## 🧩 Unicode Chess Pieces

The game uses Unicode characters instead of images:

```js
♔ ♕ ♖ ♗ ♘ ♙  // White
♚ ♛ ♜ ♝ ♞ ♟  // Black
```

This keeps the project lightweight and fast.

---

## 🧠 Key Learnings from This Project

* Real-time communication using **WebSockets**
* Server-authoritative game state
* Turn-based multiplayer logic
* Drag & Drop API
* Mapping UI coordinates to chess notation
* Handling spectators in multiplayer games

---

## 🚧 Known Limitations

* No check/checkmate UI alerts
* No game restart button
* No room-based multiple games
* No move history panel

---

## 🔮 Future Improvements

* ♜ Highlight legal moves
* 🔄 Board flip for black player
* 🧠 Check / Checkmate indicators
* 📜 Move history panel
* 🏠 Multiple rooms (play many games)
* 🔁 Reconnect & resume game state
* 🔊 Sound effects

---

## 👨‍💻 Author

**Aditya Thakur**
Diploma in Information Technology
Aspiring Backend / MERN Stack Developer

---

## ⭐ Support

If you found this project useful:

* ⭐ Star the repository
* 🐞 Report issues
* 🤝 Contribute improvements

---

Happy Coding & Checkmate ♟️🔥
