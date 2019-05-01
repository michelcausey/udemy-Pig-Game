/* Challenges: 

1. A player looses his ENTIRE score when he rolls two 6's in a row.  After that, it's the next player's turn. 
(Hint: always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript)

*/

// name all of the global variables
var scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore;

startGame();

// function for clicking the ROLL DICE button
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (gamePlaying) {
        // dice rolls a random number between 1 - 6
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice, lastDice)

        // display the correct dice image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // update round score if the roll isn't 1
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            // add to round score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player's turn with ternary
            nextPlayer()
        }
        lastDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add roundScore points to total score
        scores[activePlayer] += roundScore;

        // update UI to reflect total score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game

        var input = document.querySelector('.final-score').value;

        if (input) {
            winningScore = input
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //don't show the dice until we know what the random number is
    document.querySelector('.dice').style.display = 'none';

    // set all values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // set the names of the players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // re-set the class to active for player 1
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

