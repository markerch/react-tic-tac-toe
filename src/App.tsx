import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { GameTurn } from "./models/game-model";
import Logger from "./components/Logger";
import { WINNING_COMBINATIONS } from "./models/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getActivePlayer = (turns: GameTurn[]) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const getGameBoard = (gameTurns: GameTurn[]) => {
  const gameBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const getWinner = (
  gameBoard: (string | null)[][],
  players: { X: string; O: string }
) => {
  let winner: string | null = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      (firstSquareSymbol === "X" || firstSquareSymbol === "O") &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

//Main Component
function App() {
  const [players, setPlayers] = useState<{ X: string; O: string }>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players) || null;
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => setGameTurns([]);

  const handlePlayerNameChange = (symbol: string, newName: string) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChanged={handlePlayerNameChange}
          ></Player>
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChanged={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Logger turns={gameTurns}></Logger>
    </main>
  );
}

export default App;
