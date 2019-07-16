/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScores, activePlayer, gamePlaying;
let diceDOM = document.querySelector('.dice');
let secondDice = document.getElementById('dice1');
let dice0 = document.getElementById('dice0');
let dice1 = document.getElementById('dice1');
let goal = document.getElementById('goal');

let init = function () {
    scores = [0, 0];
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;
    diceDOM.style.display = 'none';
    dice1.style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

init();

let diceRoll = function () {
    let roll = Math.floor(Math.random() * 6) + 1;
    return roll;
}

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //1. need a random number
        let dice = diceRoll();
        let dice2 = diceRoll();

        //2.display result
        diceDOM.style.display = 'block';
        dice1.style.display = 'block';
        dice0.src = 'dice-' + dice + '.png';
        dice1.src = 'dice-' + dice2 + '.png'

        //3.update the round score only IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            //add score
            roundScores += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            nextPlayer();

        }

        if (dice + dice2 === 12) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //add current score to players global score
        scores[activePlayer] += roundScores;

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if(goal.value){
            var winningScore = goal.value;
        } else {
            winningScore = 100;
        }
    
        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            dice1.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

let nextPlayer = function () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
    dice1.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);



// document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// let x = document.querySelector('#score-0').textContent;


