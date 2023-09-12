// Game setup
const game = () => {
  // Keep track of game components
  let playerScore = 0;
  let computerScore = 0;
  let moves = 0;

  // Game execution
  const playGame = () => {
    // Access html elements
    const rockBtn = document.querySelector('.rock');
    const paperBtn = document.querySelector('.paper');
    const scissorsBtn = document.querySelector('.scissors');

    // Place moves into a list for easier access
    const playerOptions = [rockBtn, paperBtn, scissorsBtn];
    const computerOptions = ['rock', 'paper', 'scissors'];

    // Accesses the player move selected
    playerOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Update the number of moves
        const movesLeft = document.querySelector('.movesLeft');
        moves++;
        movesLeft.innerText = `Moves left: ${10 - moves}`;

        // Determine the computer's move
        const computerIndex = Math.floor(Math.random() * 3);
        const computerMove = computerOptions[computerIndex];

        // Determine winner of the round
        determineWinner(this.innerText, computerMove);
        
        // Check if the game is finished
        if (moves === 10) {
          gameOver(playerOptions, movesLeft);
        }
      });
    });
  }

  // Determines the winner of each round
  const determineWinner = (player, computer) => {
    // Access html elements
    const result = document.querySelector('.result');
    const playerCount = document.querySelector('.p-count');
    const computerCount = document.querySelector('.c-count');
    
    // Determine the winner of the round and add to their score
    if (player === 'Rock') {
      if (computer === 'rock') {
        result.textContent = 'Tie!';
      } else if (computer === 'paper') {
        result.textContent = 'Rock loses to Paper!';
        computerScore++;
      } else {
        result.textContent = 'Rock beats Scissors!';
        playerScore++;
      }
    } else if (player === 'Paper') {
      if (computer === 'rock') {
        result.textContent = 'Paper beats Rock!';
        playerScore++;
      } else if (computer === 'paper') {
        result.textContent = 'Tie!';
      } else {
        result.textContent = 'Paper loses to Rock!';
        computerScore++;
      }
    } else {
      if (computer === 'rock') {
        result.textContent = 'Scissors loses to Rock!';
        computerScore++;
      } else if (computer === 'paper') {
        result.textContent = 'Scissors beats Paper!';
        playerScore++;
      } else {
        result.textContent = 'Tie!';
      }
    }

    // Update the game score
    playerCount.textContent = playerScore;
    computerCount.textContent = computerScore;
  }

  // Determines the winner of the game
  const gameOver = (playerOptions, movesLeft) => {
    // Access html elements
    const moves = document.querySelector('.moves');
    const result = document.querySelector('.result');
    const restartBtn = document.querySelector('.restart');

    // Clear the game screen
    moves.style.display = 'none';
    movesLeft.style.display = 'none';
    playerOptions.forEach(option => {
      option.style.display = 'none';
    });

    // Displays the game results
    result.style.fontsize = '2rem';
    if (playerScore > computerScore) {
      result.innerText = 'Player Wins!';
      result.style.color = '#308D46';
    } else if (computerScore > playerScore) {
      result.innerText = 'Computer Wins!';
      result.style.color = 'red';
    } else {
      result.innerText = 'Tie!';
      result.style.color = 'grey';
    }
      
    // Play again?
    restartBtn.innerText = 'Restart';
    restartBtn.style.display = 'flex';
    restartBtn.addEventListener('click', () => {
      location.reload();
    });
  }

  // Loop the game rounds
  playGame();
}

// Play the game
game();