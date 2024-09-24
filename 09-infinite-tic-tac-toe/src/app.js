const gameBoard = document.getElementById('game-board')
const cells = []
const resetButton = document.getElementById('reset-button')
const messageDisplay = document.getElementById('message')
let currentPlayer = 'X'
let gameState = ['', '', '', '', '', '', '', '', '']
let moveOrder = []
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.setAttribute('data-index', i)
  cell.addEventListener('click', handleClick)
  gameBoard.appendChild(cell)
  cells.push(cell)
}

function handleClick (event) {
  const cell = event.target
  const index = parseInt(cell.getAttribute('data-index'))

  if (gameState[index] !== '' || checkWinner()) {
    return
  }

  gameState[index] = currentPlayer
  cell.textContent = currentPlayer
  moveOrder.push(index)

  removeOldestMarker(currentPlayer)

  if (checkWinner()) {
    messageDisplay.textContent = `¡El jugador ${currentPlayer} ganó!`
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }
}

function removeOldestMarker (player) {
  const playerMoves = moveOrder.filter(index => gameState[index] === player)
  if (playerMoves.length > 3) {
    const oldestMove = playerMoves[0]
    const indexToRemove = moveOrder.indexOf(oldestMove)
    moveOrder.splice(indexToRemove, 1)
    gameState[oldestMove] = ''
    cells[oldestMove].textContent = ''
  }
}

function checkWinner () {
  return winningCombinations.some(combination => {
    return combination.every(index =>
      gameState[index] !== '' && gameState[index] === gameState[combination[0]]
    )
  })
}

function resetGame () {
  gameState = ['', '', '', '', '', '', '', '', '']
  moveOrder = []
  currentPlayer = 'X'

  cells.forEach(function (cell) {
    cell.textContent = ''
  })

  messageDisplay.textContent = ''
}

resetButton.addEventListener('click', resetGame)

resetButton.addEventListener('click', resetGame)
