import React, { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [circleTurn, setCircleTurn] = useState(false);
  const [winningMessage, setWinningMessage] = useState('');
  const [gameBoardVisible, setGameBoardVisible] = useState(false);
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));

  const WIN_POSSIBILITY_ARR = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleInputChange = (e, player) => {
    const value = e.target.value;
    player === 'one' ? setPlayerOneName(value) : setPlayerTwoName(value);
  };

  const startGame = () => {
    if (!playerOneName) {
      alert('Please enter player 1 name');
      return;
    }
    if (!playerTwoName) {
      alert('Please enter player 2 name');
      return;
    }
    setGameBoard(Array(9).fill(''));
    setGameBoardVisible(true); // Show the game board
  };

  const handleBoardCellClick = (index) => {
    if (gameBoard[index] !== '' || winningMessage) return;

    const newBoard = [...gameBoard];
    newBoard[index] = circleTurn ? 'O' : 'X';
    setGameBoard(newBoard);

    if (checkWinStatus(newBoard, circleTurn ? 'O' : 'X')) {
      setWinningMessage(`${circleTurn ? playerTwoName : playerOneName} is the winner!`);
    } else if (gameDrawStatus(newBoard)) {
      setWinningMessage('It\'s a draw!');
    } else {
      setCircleTurn(!circleTurn);
    }
  };

  const checkWinStatus = (board, currentClass) => {
    return WIN_POSSIBILITY_ARR.some(combination =>
      combination.every(index => board[index] === currentClass)
    );
  };

  const gameDrawStatus = (board) => {
    return board.every(cell => cell !== '');
  };
  const resetGame = () => {
    setPlayerOneName('');
    setPlayerTwoName('');
    setCircleTurn(false);
    setWinningMessage('');
    setGameBoardVisible(false);
  };

  return (
    <main role="main" className="container pt-5">
        <div className="form-group">
          <div className="form-item d-flex">
            <input type="text" placeholder="player one name" value={playerOneName} onChange={(e) => handleInputChange(e, 'one')} autoComplete="off" className="form-control" />
            <img className="game-icon" src="./assets/images/crs.png" alt="cross-icon" />
          </div>
          <div className="form-item d-flex">
            <input type="text" placeholder="player two name" value={playerTwoName} onChange={(e) => handleInputChange(e, 'two')} autoComplete="off" className="form-control" />
            <img className="game-icon" src="./assets/images/cr.png" alt="nought-icon" />
          </div>
        </div>
        <div className="btn-container">
            <button className="btn btn-lg btn-secondary" onClick={startGame}>Start Game</button>
        </div>
     

      {gameBoardVisible && (
        <section id="tic-tac-toe">
          <div className="game-board">
            {gameBoard.map((cell, index) => (
              <div key={index} className="cell" onClick={() => handleBoardCellClick(index)}>
                {cell === 'X' && <img src="./assets/images/crs.png" alt="cross-icon" />}
                {cell === 'O' && <img src="./assets/images/cr.png" alt="nought-icon" />}
              </div>
            ))}
          </div>
          <div className={`winning-message ${winningMessage && 'show'}`}>
            <div>{winningMessage}</div>
            <button className="btn btn-lg btn-secondary" onClick={resetGame}>Reset</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default TicTacToe;