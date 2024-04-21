export default function GameBoard({
  onSelectSquare,
  board,
}: Readonly<{
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  board: (string | null)[][];
}>) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={"row" + rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={"row" + rowIndex + "col" + colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
