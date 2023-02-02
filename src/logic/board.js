import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
	// revisamos todas las combinaciones ganadoras para ver si X u O gano
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a] // X u O
		}
	}
	// si no hay ganador
	return null
}

export const checkEndGame = (newBoard) => {
	// revisamos si hay un empate
	return newBoard.every((square) => square !== null) // si todas las posiciones son diferentes a null y devuelve true si es asi
}
