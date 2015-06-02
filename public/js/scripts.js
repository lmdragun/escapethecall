var startButton = $(".start");
var momImage = $(".mom");
var momTalk = $(".mom-phrase");
var playerStatus = $(".current-status");
var imgPlace = $("#upper");
var currentChoices = [];
var currentMomPhrase = [];
var phrases = [];
var choices = [];

var gameTime = 0;


//
// function updateGame(){
// 	console.log("In updateGame");
// 	drawMom();
// 	randomMomPhrase();
// 	placeChoices(choices);
// }
//
//
//
//
// function checkGameStatus(){
// 	console.log("In checkGameStatus");
// 	if(gameTime < 5000 && momAnger < 100 && playerScore < 100){
// 		updateGame();
// 	}
// 	else if(gameTime == 5000){
// 		secondPlayerStatus();
// 	}
// 	else if(momAnger == 100){
// 		lostGame();
// 	}
// 	else if(playerScore == 100){
// 		wonLevel();
// 	}
// }
//
// function randomMomPhrase(){
// 	console.log("In randomMomPhrase");
// 	var justPhrases = [];
// 	var onlyPhrases = phrases[0];
// 	_.each(onlyPhrases, function(phrase){
// 		var momPhrase = {
// 			points: phrase.number,
// 			phrase: phrase.phrase,
// 			question: phrase.question
// 		};
// 		justPhrases.push(momPhrase);
// 	});
// 	currentMomPhrase = _.sample(justPhrases, 1);
// 	$("#bubble").empty();
// 	$("#bubble").append("<p class=\"" + currentMomPhrase[0].points + "\">" + currentMomPhrase[0].phrase + "</p>");
// }
//
// function placeChoices(choices){
// 		var justChoices = [];
// 		var onlyChoices = choices[0];
// 		_.each(onlyChoices, function(choice){
// 			var answer = {
// 				id: choice.number,
// 				choice: choice.choice
// 			};
// 			justChoices.push(answer);
// 		});
// 		var randomChoice = _.sample(justChoices, 3);
// 		$("#choices").empty();
// 		for(var i = 0; i < 3; i++){
// 			$("#choices").append("<h1 class=\"" + randomChoice[i].id + "\">" + randomChoice[i].choice + "</h1>");
// 			currentChoices.push(randomChoice[i]);
// 		}
// 		console.log("In placeChoices, these are the Choices: " + currentChoices[0].choice, currentChoices[1].choice, currentChoices[2].choice);
// }
//
// function startGame(){
// 	console.log("In startGame");
// 	drawMom(momAnger);
// 	$.getJSON("/api/game.json", function(data){
// 		phrases.push(data.levels[0].phrases);
// 		choices.push(data.levels[0].choices);
// 		randomMomPhrase(phrases);
// 		placeChoices(choices);
// 	});
//
// }
//
// var Game = function(){
// 	console.log("In Game");
// 	$("#start").css("display", "none");
// 	startGame();
// 	// gameTime = new Date().getTime();
// 	// console.log(gameTime);
// }

// function beginGame(){
// 	$(".start").on("click", this.Game.bind(this));
// 	console.log("In beginGame");
// 	$("#choices").on("click", function(event){
// 		var playerChoice = event.target.className;
// 		console.log("playerScore in beginGame: " + playerScore);
// 		calcScore(playerChoice);
// 	} );
// }

function Game(){
	this.momAngerPoints = 0;
	this.playerPoints = 0;
	this.currentMomPhrase = {};
}

Game.prototype = {
	getMomAngerStatus: function(callback){
		var momAngerStatus = {};
		var img = document.createElement("IMG");
		img.className = "mom";
		if(this.momAngerPoints < 35){
			momAngerStatus = {
				src: "images/momstandin01.png",
				alt: "Happy mom"
			};
		}
		else if(this.momAngerPoints < 70){
			momAngerStatus = {
				src: "images/momstandin02.png",
				alt: "Annoyed mom"
			};
		}
		else if(this.momAngerPoints < 100){
			momAngerStatus = {
				src: "images/momstandin03.png",
				alt: "Angry mom"
			};
		}
		else if(this.momAngerPoints == 100){
			momAngerStatus = {
				src: "images/momstandin04.png",
				alt: "Furious mom"
			};
			}
		callback(momAngerStatus);
	},
	getChoices: function(callback){
		var neaterChoices = []; //collection of choices separated into objects
		var randomChoices = []; //collection of three random choices
		$.getJSON("/api/game.json", function(data){
			phrases.push(data.levels[0].phrases);
			choices.push(data.levels[0].choices);
			_.each(choices[0], function(choice){
				neaterChoices.push({
					id: choice.number,
					choice: choice.choice
				});
			});
		randomChoices = _.sample(neaterChoices, 3);
		callback(randomChoices);
		});
	},
	getPhrases: function(){
		var neaterPhrases = []; //collection of phrases separated into objects
		var randomPhrase = []; //one random phrase
		return $.getJSON("/api/game.json", function(data){
			phrases.push(data.levels[0].phrases);
			_.each(phrases[0], function(phrase){
				neaterPhrases.push({
					points: phrase.number,
					phrase: phrase.phrase
				});
			});
			this.currentMomPhrase = _.sample(neaterPhrases, 1);
			console.dir(this);
		}.bind(this));
	},
	calcScore: function(newPlayerPoints){
		console.log("this.currentMomPhrase.points: " + this.currentMomPhrase[0].points);
		var calculatedScore = newPlayerPoints - this.currentMomPhrase[0].points;
		console.log("calculatedScore in calcScore: " + calculatedScore);
		if(calculatedScore >= 0){
			this.playerPoints += calculatedScore;
		}
		else{
			this.momAngerPoints -= calculatedScore;
		}
		var points = {
			momAngerPoints: this.momAngerPoints,
			playerPoints: this.playerPoints
		}
		console.log("calcScore, momAngerPoints: " + this.momAngerPoints + ", playerPoints: " + this.playerPoints);
		return points
		// drawPoints(playerPoints, momAngerPoints)
	},
	checkGameStatus: function(){
		console.log("In checkGameStatus");
		if(this.gameTime < 5000 && this.momAngerPoints < 100 && this.playerPoints < 100){
			updateGame();
		}
		else if(this.gameTime == 5000){
			secondPlayerStatus();
		}
		else if(this.momAngerPoints == 100){
			lostGame();
		}
		else if(this.playerPoints == 100){
			wonLevel();
		}
	}
}

function GameView(model){
	this.model = model;
	var calcScore = {};
	$(".start").on("click", function(){
		$("#start").css("display", "none");
	});
	$("#choices").on("click", function(event){
		console.log("playerScore in beginGame: " + this.model.playerPoints);
		calcScore = this.model.calcScore(event.target.className);
		this.drawPoints(calcScore);
		this.model.checkGameStatus();
	}.bind(this));

	console.dir(calcScore);

	this.model.getMomAngerStatus(this.drawMom);
	this.model.getChoices(this.showChoices);
	this.model.getPhrases().done(function(){
		this.showPhrase(this.model.currentMomPhrase);
	}.bind(this));

}

GameView.prototype = {
	drawMom: function(momAngerStatus){
		var img = document.createElement("IMG");
		img.className = "mom";
		img.src = momAngerStatus.src;
		img.alt = momAngerStatus.alt;
		document.getElementById("upper").appendChild(img);
	},
	drawPoints: function(calcScore){
		$("#player-points").empty();
		$("#player-points").append("<div>" + calcScore.playerPoints + "</div>");
		$("#mom-anger").empty();
		console.log("playerPoints: " + calcScore.playerPoints);
		console.log("momAngerPoints: " + calcScore.momAngerPoints);
		for(var i = 0; i < calcScore.momAngerPoints; i++){
			$("#mom-anger").append("<div>" + "" + "</div>");
			console.log("mom points");
		}
	},
	showChoices: function(choices){
		for(var i = 0; i < choices.length; i++){
			$("#choices").append("<h1 class=\"" + choices[i].id + "\">" + choices[i].choice + "</h1>");
		}
	},
	showPhrase: function(phrase){
		$("#bubble").empty();
		$("#bubble").append("<p class=\"" + phrase[0].points + "\">" + phrase[0].phrase + "</p>");
	}

}

var currentGame = new Game();
var currentGameView = new GameView(currentGame);

// window.addEventListener("load", beginGame);
