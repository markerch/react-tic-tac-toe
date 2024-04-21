import { GameTurn } from "../models/game-model";

export default function Logger({ turns }: Readonly<{ turns: GameTurn[] }>) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected Row {turn.square.row} & Column{" "}
          {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
