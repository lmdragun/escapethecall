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


$.getJSON("/api/game.json", function(data){
	console.log(data);
	phrases.push(data.levels[0].phrases);
	console.log(phrases);
	choices.push(data.levels[0].choices);
	console.log(choices);
});

function drawMom(momAnger){
	console.log("drawMom");
	var img = document.createElement("IMG");
	img.className = "mom";
	if(momAnger < 35){
		img.src = "images/momstandin01.png";
		img.alt = "Happy mom";
		document.getElementById("upper").appendChild(img);
		console.log("Happy Mom");
	}
	else if(momAnger < 70){
		img.src = "images/momstandin02.png";
		img.alt = "Annoyed mom";
		document.getElementById("upper").appendChild(img);
		console.log("Annoyed Mom");
	}
	else if(momAnger < 100){
		img.src = "images/momstandin03.png";
		img.alt = "Angry mom";
		document.getElementById("upper").appendChild(img);
		console.log("Angry Mom");
	}
	else if(momAnger == 100){
		img.src = "images/momstandin04.png";
		img.alt = "Furious mom";
		document.getElementById("upper").appendChild(img);
		console.log("Furious Mom");
	}
}

function updateGame(){
	console.log("updateGame");
	drawMom();
	randomMomPhrase();
}

function calcScore(playerChoice){
	console.log("calcScore");
	console.log("playerChoice: " + playerChoice);
	calculation = playerChoice - momPoints;
	if(calculation >= 0){
		playerScore += playerChoice;
	}
	else if(calculation < 0){
		momAnger += playerChoice;
	}
	checkGameStatus();
}

function checkGameStatus(){
	console.log("checkGameStatus");
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
	console.log("randomMomPhrase");
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
	var randomPhrase = _.sample(justPhrases, 1);
	console.log("randomPhrase: " + randomPhrase[0]);
	// currentMomPhrase = randomPhrase;
	$("#bubble").append("<p class=\"" + randomPhrase[0].points + "\">" + randomPhrase[0].phrase + "</p>");
	console.log("New Phrase");
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
		console.log(randomChoice);
		for(var i = 0; i < 3; i++){
			console.log(randomChoice[i].choice);
			$("#choices").append("<h1 class=\"" + randomChoice[i].id + "\">" + randomChoice[i].choice + "</h1>");
		}
		console.log("New Choice");
		currentChoices.push(randomChoice);
		console.log(currentChoices);
}

function startGame(){
	console.log("startGame");
	console.log("calling drawMom");
	drawMom(momAnger);
	$.getJSON("/api/game.json", function(data){
		phrases.push(data.levels[0].phrases);
		choices.push(data.levels[0].choices);
		randomMomPhrase(phrases);
		placeChoices(choices);
	});

}

var Game = function(){
	console.log("Game");
	$("#start").css("display", "none");
	startGame();
	// gameTime = new Date().getTime();
	// console.log(gameTime);
}

function beginGame(){
	$(".start").on("click", this.Game.bind(this));
	console.log("Begin");
	$("#choices").on("click", function(event){
		var playerChoice = event.target.className;
		calcScore(playerChoice);
	} );
}

window.addEventListener("load", beginGame);
