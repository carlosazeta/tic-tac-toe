import confetti from 'canvas-confetti'
import { useState } from 'react'
import './App.css'

import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'

function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem('board')
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
	})
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem('turn')
		return turnFromStorage ?? TURNS.X // Mira si turnFromStorage es null o undefined
	})

	// null es que no hay ganador, false es que hay un empate
	const [winner, setWinner] = useState(null)

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)
		window.localStorage.removeItem('board')
		window.localStorage.removeItem('turn')
	}

	const updateBoard = (index) => {
		// no actualizamos esta posicion si ya tiene algo
		if (board[index] || winner) return

		// actualizar el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		// cambiar el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

		// guardar la partida
		window.localStorage.setItem('board', JSON.stringify(newBoard))
		window.localStorage.setItem('turn', newTurn)

		// revisamos si hay un ganador
		const newWinner = checkWinnerFrom(newBoard)
		if (newWinner) {
			confetti()
			setWinner(newWinner)
		} else if (checkEndGame(newBoard)) {
			setWinner(false) // empate
		}
	}
	return (
		<main className='board'>
			<h1>TIC TAC TOE</h1>
			<button onClick={resetGame}> Reset the game</button>
			<section className='game'>
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{square}
						</Square>
					)
				})}
			</section>

			<section className='turn'>
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>
			<WinnerModal resetGame={resetGame} winner={winner} />
		</main>
	)
}

export default App
