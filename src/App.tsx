import { useState } from "react";

type SquareValue = "X" | "O" | null;

function Square({
  value,
  onClick,
}: {
  value: SquareValue;
  onClick: () => void;
}) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [squares, setSquares] = useState<SquareValue[]>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((s) => s !== null);

  function handleClick(i: number) {
    if (winner || squares[i]) return;

    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";

    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="status">{status}</div>

      <div className="board">
        {squares.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
      )}
    </div>
  );
}

function calculateWinner(s: SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (s[a] && s[a] === s[b] && s[a] === s[c]) {
      return s[a];
    }
  }

  return null;
}
