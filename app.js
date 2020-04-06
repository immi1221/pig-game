/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;
init();
var gamePlaying=true;

//var x=document.querySelector('#score-0').textContent;



document.querySelector('.btn-roll').addEventListener("click", function () {
  if (gamePlaying) {
    
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //play sound 
    if(dice!==1){
    var audio = new Audio('blue.mp3');
  audio.play();
    }
    //2.display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //update round score if the rolled number is not 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
     

      animate();
       //next player
     nextPlayer();
     if(dice==1){
     document.querySelector('.dice').style.display = 'block';
     }
    }

  }

});


document.querySelector('.btn-hold').addEventListener('click', function () {
 if(gamePlaying){
//add current score in gloabla sore
scores[activePlayer] += roundScore;



//update the ui
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
//take input
var input=document.querySelector('.final-score').value;
if(input){
  var winningScore=input;
}
else{winningScore=100;}

//check if player won the game
if (scores[activePlayer] >=winningScore) {
  document.querySelector('#name-' + activePlayer).textContent = 'Winner';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  gamePlaying=false;
  var audio = new Audio('Tada.mp3');
  audio.play();
 
  } else {
  //next player
  var audio = new Audio('green.mp3');
  audio.play();
  nextPlayer();
   }

}

});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle("active");
  document.querySelector('.player-1-panel').classList.toggle("active");
  
 document.querySelector('.dice').style.display = 'none';
 
 
}


//new game
document.querySelector('.btn-new').addEventListener('click', init);

//initializer
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById("score-0").textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#name-0').textContent = 'Player-1';
  document.querySelector('#name-1').textContent = 'Player-2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  gamePlaying=true;

}

function animate(){
  document.querySelector('.dice').classList.add('false');
  gamePlaying=false;
  var audio = new Audio('wrong.mp3');
  audio.play();
  
  setTimeout(function(){
    document.querySelector('.dice').classList.remove('false');
    gamePlaying=true; 
    document.querySelector('.dice').style.display = 'none';
   }, 3000);
}


