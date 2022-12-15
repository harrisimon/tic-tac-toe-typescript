import { useEffect, useState } from "react"
import Square from "../components/Square"
type Player = "X" | "O" | "TIE" | null

function checkWinner(squares: Player[]) {
	const combos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i = 0; i < combos.length; i++) {
		const [a, b, c] = combos[i]
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a]
		} 
		
	}
    return null
}

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
		Math.round(Math.random() * 1) === 1 ? "X" : "O"
	)
	const [winner, setWinner] = useState<Player>(null)

	function setSquareValue(index: number) {
		const newClick = squares.map((value, i) => {
			if (i === index) {
				return currentPlayer
			}
			return value
		})
		setSquares(newClick)
		setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
	}
	function reset() {
		setSquares(Array(9).fill(null))
		setWinner(null)
		setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O")
	}
	useEffect(() => {
		const win = checkWinner(squares)
		if (win) {
			setWinner(win)
		}
		if (!win && !squares.filter((square) => !square).length) {
			setWinner("TIE")
		}
	})

	return (
		<div>
			{!winner &&<p>{currentPlayer}'s turn</p>}
            {winner && winner !== 'TIE' && <p>{winner} wins!</p>}
            {winner && winner === 'TIE' && <p>It's a tie</p>}
			<div className="grid">
				{Array(9)
					.fill(null)
					.map((_, i) => {
						return (
							<Square
								winner={winner}
								key={i}
								onClick={() => setSquareValue(i)}
								value={squares[i]}
							/>
						)
					})}
			</div>
			<button className="reset" onClick={reset}>
				RESET
			</button>
		</div>
	)
}

export default Board
