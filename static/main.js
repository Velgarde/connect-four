const board = [];
const COLS = 7;
const ROWS = 6;
let currentPlayer = 1;
for (let i = 0; i < ROWS; i++) {
    const row = [];
    for ( let j = 0; j < COLS; j++) {
        row.push(0);
    }
    board.push(row);
}


const gameBoard  = document.getElementById('game-board');
for ( let i = 0; i< ROWS; i++) {
    for ( let j = 0; j < COLS; j++ ) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleMove(j));
        gameBoard.appendChild(cell);
    }
}

const handleMove = (col) => {
    for ( let i = ROWS - 1; i >= 0; i--) {
        if ( board[i][col] === 0) {
            board[i][col] = currentPlayer;
            updateBoard();
            if (checkWin(currentPlayer)) {
                alert(`Player ${currentPlayer} Wins !`);
                location.reload();
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
    alert("The column is full");
}


function updateBoard() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = gameBoard.children[i * COLS + j];
            cell.classList.remove('player1', 'player2');
            if (board[i][j] === 1) {
                cell.classList.add('player1');
            } else if (board[i][j] === 2) {
                cell.classList.add('player2');
            }
        }
    }
}

function checkWin(player) {
    // Check horizontal lines
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            if (board[i][j] === player && board[i][j + 1] === player && board[i][j + 2] === player && board[i][j + 3] === player) {
                return true;
            }
        }
    }

    // Check vertical lines
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] === player && board[i + 1][j] === player && board[i + 2][j] === player && board[i + 3][j] === player) {
                return true;
            }
        }
    }

    // Check diagonal lines (bottom left to top right)
    for (let i = 3; i < ROWS; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            if (board[i][j] === player && board[i - 1][j + 1] === player && board[i - 2][j + 2] === player && board[i - 3][j + 3] === player) {
                return true;
            }
        }
    }

    // Check diagonal lines (top left to bottom right)
    for (let i = 3; i < ROWS; i++) {
        for (let j = 3; j < COLS; j++) {
            if (board[i][j] === player && board[i - 1][j - 1] === player && board[i - 2][j - 2] === player && board[i - 3][j - 3] === player) {
                return true;
            }
        }
    }

    return false;
}