type Player = "X" | "O" | "TIE" | null
function Square({
	value,
	onClick,
	winner,
    currentPlayer
}: {
	winner: Player
	value: Player
    currentPlayer: string | null
	onClick: () => void
    
}) {
	if (!value) {
		return (
			<button
                id={currentPlayer}
				className="square"
				onClick={onClick}
				disabled={Boolean(winner)}
			/>
		)
	}

	return (
		<button className={`square square_${value.toLowerCase()}`} disabled>
			{value}
		</button>
	)
}

export default Square
