var gameState = 0;
var playerCount;
var database;
var form, player, game;
var allPlayers;
var scoree,startScreen,gameArea;
var player1Number,player1Dice,player2Dice,player2Number;
var type,submit, goGame = false;
var feedbackInput;
var clickTime = 0;
var result1 = 0, result2 = 0, result3 = 0;
var goShoot = false;



function preload(){
  player1Won = loadSound("Sounds/ding.mp3");
  player2Won = loadSound("Sounds/Sound.mp3");
  draww = loadSound("Sounds/checkPoint.mp3");
}



function setup(){
  noCanvas();
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}



function draw(){

  if(goGame === true){
    game.update(1);
  }

  if(goGame === true){
    clear();
    scoree = document.querySelector('.score');
    startScreen = document.querySelector('.startScreen');
    startScreen.addEventListener('click', start);
    container = document.querySelector('.container');
    endScreen = document.querySelector('.endScreen');
    feeedback = document.querySelector('.feedback');
    submitfeedback = document.querySelector('.SubmitFeedback');
    submit = document.querySelector('.submit');

    game.play();
  }

  if(clickTime === 100) {
    container.classList.add('hide');
    feeedback.classList.add('hide');
    submitfeedback.classList.add('hide');
    endScreen.classList.remove('hide');
    
    document.querySelector('.displayScore1').innerHTML = "Player 1 Score = " + result1;
    document.querySelector('.displayScore2').innerHTML = "Player 2 Score = " + result2;
    document.querySelector('.displayScore3').innerHTML = "Draw = " + result3;

    if(result1 > result2) {
      document.querySelector('.ultimateWinner').innerHTML = "Hence the ultimate winner of the game is Player 1.";
    }

    if(result1 < result2) {
      document.querySelector('.ultimateWinner').innerHTML = "Hence the ultimate winner of the game is Player 2.";
    }

    if(result1 === result2) {
      document.querySelector('.ultimateWinner').innerHTML = "Hence the game ended with a DRAW.";
    }

    game.update(2);
  }

  if(gameState === 2) {
    
  }
}



ludoGame = () => {
  if(clickTime < 100) {
    player1Number = floor(random(1,7));
    player1Dice = `images/dice${player1Number}.png`;
    document.getElementById('check1').setAttribute('src',player1Dice);

    player2Number = floor(random(1,7));
    player2Dice = `images/dice${player2Number}.png`;
    document.getElementById('check2').setAttribute('src',player2Dice);

    if(player1Number > player2Number) {
      document.querySelector('h1').innerHTML="Player 1 won :)";
      result1++;
      player1Won.play();
      document.querySelector('.score1').innerHTML = "Player 1 Score = " + result1 + " / Player 2 Score = " + result2 + " / Draw = " + result3;
    } else if (player2Number > player1Number) {
      document.querySelector('h1').innerHTML="Player 2 won :)";
      result2++;
      player2Won.play();
      document.querySelector('.score1').innerHTML = "Player 1 Score = " + result1 + " / Player 2 Score = " + result2 + " / Draw = " + result3;
    } else {
      document.querySelector('h1').innerHTML="DRAW!!";
      result3++;
      draww.play();
      document.querySelector('.score1').innerHTML = "Player 1 Score = " + result1 + " / Player 2 Score = " + result2 + " / Draw = " + result3;
    }

    clickTime++;

    player.updateClick(clickTime,result1,result2,result3);
  }
}



function start() {
  container.classList.remove('hide');
  startScreen.classList.add('hide');
  feeedback.classList.remove('hide');

  form.greeting.hide();
}



Feedback = () => {
  feedbackInput = createInput("");
  feedbackInput.parent(submitfeedback);
  feeedback.classList.add('hide');
  submitfeedback.classList.remove('hide');
}



SubmitF = () => {
  var feedback = feedbackInput.value();
  player.feedback = feedback;
  player.updateFeedback();
  feedbackInput.hide();
  submitfeedback.classList.add('hide');
  feeedback.classList.remove('hide');
}