var startButton = $(".start");
var momImage = $(".mom");
var momTalk = $(".mom-phrase");
var playerStatus = $(".current-status");
var imgPlace = $("#upper");
var currentChoices = [];
var currentMomPhrase = [];
var phrases = [];
var choices = [];

var momAnger = 0;
var gameTime = 0;
var playerScore = 0;

// var testPhrases = ["Blahblah blah.", "And this and that and this and repeating this again.", "What did you do today?"];
// var testStatus = ["You just got home from work, you're exhausted.", "You need to get to sleep!", "You're supposed to be making dinner right now..."];
// var testChoices = ["Uhuh", "Right", "Yep", "You know it", "Love you, too, mom", "Mom, I've really gotta go...."];


// $.getJSON("/api/game.json", function(data){
// 	console.log(data);
// 	phrases.push(data.levels[0].phrases);
// 	console.log(phrases);
// 	choices.push(data.levels[0].choices);
// 	console.log(choices);
// });

function drawMom(momAnger){
	console.log("In drawMom");
	var img = document.createElement("IMG");
	img.className = "mom";
	if(momAnger < 35){
		img.src = "images/momstandin01.png";
		img.alt = "Happy mom";
		document.getElementById("upper").appendChild(img);
	}
	else if(momAnger < 70){
		img.src = "images/momstandin02.png";
		img.alt = "Annoyed mom";
		document.getElementById("upper").appendChild(img);
	}
	else if(momAnger < 100){
		img.src = "images/momstandin03.png";
		img.alt = "Angry mom";
		document.getElementById("upper").appendChild(img);
	}
	else if(momAnger == 100){
		img.src = "images/momstandin04.png";
		img.alt = "Furious mom";
		document.getElementById("upper").appendChild(img);
	}
}

function updateGame(){
	console.log("In updateGame");
	drawMom();
	randomMomPhrase();
	placeChoices(choices);
}

function drawPlayerPoints(){
	$("#player-points").empty();
	$("#player-points").append("<div>" + playerScore + "</div>");
}

function drawMomAnger(){
	$("#mom-anger").append("<div class=\"test\"></div><div></div><div></div>");
	for(var i = 0; i < momAnger.count; i++){
		$("#mom-anger").append("<div>" + "" + "</div>");
	}
}

function calcScore(playerChoice){
	console.log("In calcScore, currentMomPhrase points: " + currentMomPhrase[0].points + ", playerChoice amount: " + playerChoice);
	calculation = playerChoice - currentMomPhrase[0].points;
	if(calculation >= 0){
		playerScore += calculation;
	}
	else if(calculation < 0){
		momAnger -= calculation;
	}
	drawPlayerPoints();
	drawMomAnger();
	console.log("playerScore in calcScore: " + playerScore);
	console.log("momAnger in calcScore: " + momAnger);
	checkGameStatus();
}

function checkGameStatus(){
	console.log("In checkGameStatus");
	if(gameTime < 5000 && momAnger < 100 && playerScore < 100){
		updateGame();
	}
	else if(gameTime == 5000){
		secondPlayerStatus();
	}
	else if(momAnger == 100){
		lostGame();
	}
	else if(playerScore == 100){
		wonLevel();
	}
}

function randomMomPhrase(){
	console.log("In randomMomPhrase");
	var justPhrases = [];
	var onlyPhrases = phrases[0];
	_.each(onlyPhrases, function(phrase){
		var momPhrase = {
			points: phrase.number,
			phrase: phrase.phrase,
			question: phrase.question
		};
		justPhrases.push(momPhrase);
	});
	currentMomPhrase = _.sample(justPhrases, 1);
	$("#bubble").empty();
	$("#bubble").append("<p class=\"" + currentMomPhrase[0].points + "\">" + currentMomPhrase[0].phrase + "</p>");
}

function placeChoices(choices){
		var justChoices = [];
		var onlyChoices = choices[0];
		_.each(onlyChoices, function(choice){
			var answer = {
				id: choice.number,
				choice: choice.choice
			};
			justChoices.push(answer);
		});
		var randomChoice = _.sample(justChoices, 3);
		$("#choices").empty();
		for(var i = 0; i < 3; i++){
			$("#choices").append("<h1 class=\"" + randomChoice[i].id + "\">" + randomChoice[i].choice + "</h1>");
			currentChoices.push(randomChoice[i]);
		}
		console.log("In placeChoices, these are the Choices: " + currentChoices[0].choice, currentChoices[1].choice, currentChoices[2].choice);
}

function startGame(){
	console.log("In startGame");
	drawMom(momAnger);
	$.getJSON("/api/game.json", function(data){
		phrases.push(data.levels[0].phrases);
		choices.push(data.levels[0].choices);
		randomMomPhrase(phrases);
		placeChoices(choices);
	});

}

var Game = function(){
	console.log("In Game");
	$("#start").css("display", "none");
	startGame();
	// gameTime = new Date().getTime();
	// console.log(gameTime);
}

function beginGame(){
	$(".start").on("click", this.Game.bind(this));
	console.log("In beginGame");
	$("#choices").on("click", function(event){
		var playerChoice = event.target.className;
		console.log("playerScore in beginGame: " + playerScore);
		calcScore(playerChoice);
	} );
}

window.addEventListener("load", beginGame);
