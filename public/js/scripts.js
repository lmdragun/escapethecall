var startButton = $(".start");
var momImage = $(".mom");
var momTalk = $(".mom-phrase");
var playerStatus = $(".current-status");
var imgPlace = $("#upper");
var currentChoices = [];
var currentMomPhrase = [];


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
//
// function Game(){
// 	this.momAngerPoints = 0;
// 	this.playerPoints = 0;
// 	this.currentMomPhrase = {};
// 	this.playerStatus = {};
// 	this.gameStatus = 1;
// 	this.phrases = [];
// 	this.choices = [];
// 	this.statuses = [];
// }
//
// Game.prototype = {
// 	getMomAngerStatus: function(callback){
// 		var momAngerStatus = {};
// 		var img = document.createElement("IMG");
// 		img.className = "mom";
// 		if(this.momAngerPoints < 35){
// 			momAngerStatus = {
// 				src: "images/mombasic01b.png",
// 				alt: "Happy mom",
// 				bg: "#58C1BC"
// 			};
// 		}
// 		else if(this.momAngerPoints < 70){
// 			momAngerStatus = {
// 				src: "images/mombasic01b.png",
// 				alt: "Annoyed mom",
// 				bg: "#F8CD5B"
// 			};
// 		}
// 		else if(this.momAngerPoints < 100){
// 			momAngerStatus = {
// 				src: "images/mombasic01b.png",
// 				alt: "Angry mom",
// 				bg: "#F38715"
// 			};
// 		}
// 		else if(this.momAngerPoints === 100){
// 			momAngerStatus = {
// 				src: "images/mombasic01b.png",
// 				alt: "Furious mom",
// 				bg: "#F00A30"
// 			};
// 			}
// 		callback(momAngerStatus);
// 	},
// 	getChoices: function(callback){
// 		var neaterChoices = []; //collection of choices separated into objects
// 		var randomChoices = []; //collection of three random choices
// 		$.getJSON("/api/game.json", function(data){
// 			// this.phrases.push(data.levels[0].phrases);
// 			var choices = [];
// 			choices.push(data.levels[0].choices);
// 			_.each(choices[0], function(choice){
// 				neaterChoices.push({
// 					id: choice.number,
// 					choice: choice.choice
// 				});
// 			});
// 		randomChoices = _.sample(neaterChoices, 3);
// 		callback(randomChoices);
// 		});
// 	},
// 	getStatus: function(callback){
// 		console.log("in getStatus")
// 		var neaterStatuses = [];
// 		return $.getJSON("/api/game.json", function(data){
// 			var statuses = [];
// 			statuses.push(data.levels[0].statuses);
// 			_.each(statuses[0], function(status){
// 				neaterStatuses.push({
// 					firstStatus: status.status,
// 					followUpStatus: status.followup,
// 					time: status.time
// 				});
// 				console.dir("nearStatuses firststatus" + neaterStatuses.firstStatus);
// 			});
// 			this.playerStatus = _.sample(neaterStatuses, 1);
// 			console.log("this.playerStatus.firstStatus: " + this.playerStatus.firstStatus);
// 			callback(this.playerStatus);
// 		}.bind(this));
// 	},
// 	getPhrases: function(){
// 		var neaterPhrases = []; //collection of phrases separated into objects
// 		var randomPhrase = []; //one random phrase
// 		return $.getJSON("/api/game.json", function(data){
// 			var phrases = [];
// 			phrases.push(data.levels[0].phrases);
// 			_.each(phrases[0], function(phrase){
// 				neaterPhrases.push({
// 					points: phrase.number,
// 					phrase: phrase.phrase
// 				});
// 			});
// 			this.currentMomPhrase = _.sample(neaterPhrases, 1);
// 			console.dir(this);
// 		}.bind(this));
// 	},
// 	calcScore: function(newPlayerPoints){
// 		console.log("this.currentMomPhrase.points: " + this.currentMomPhrase[0].points);
// 		var calculatedScore = newPlayerPoints - this.currentMomPhrase[0].points;
// 		console.log("calculatedScore in calcScore: " + calculatedScore);
// 		if(calculatedScore >= 0){
// 			this.playerPoints += calculatedScore;
// 		}
// 		else{
// 			this.momAngerPoints -= calculatedScore;
// 		}
// 		var points = {
// 			momAngerPoints: this.momAngerPoints,
// 			playerPoints: this.playerPoints
// 		}
// 		console.log("calcScore, momAngerPoints: " + this.momAngerPoints + ", playerPoints: " + this.playerPoints);
// 		return points
// 		// drawPoints(playerPoints, momAngerPoints)
// 	},
// 	checkGameStatus: function(){
// 		console.log("In checkGameStatus");
// 		if(this.gameTime < 5000 && this.momAngerPoints < 100 && this.playerPoints < 100){
// 			return gameStatus; //if game is still going, gameStatus doesn't change
// 		}
// 		else if(this.gameTime == 5000){
// 			return gameStatus += 1; //if player has run out of time, playerStatus is updated and game is lost
// 			// secondPlayerStatus();
// 		}
// 		else if(this.momAngerPoints == 100){
// 			return gameStatus += 2; //if player enrages mom, player loses game
// 			// lostGame();
// 		}
// 		else if(this.playerPoints == 100){
// 			return gameStatus += 3; //if player makes enough points before the last two options, player wins
// 			// wonLevel();
// 		}
// 	}
// }
//
// function GameView(model){
// 	this.model = model;
// 	var calcScore = {};
//
// 	$(".start").on("click", function(){
// 		$("#start").css("display", "none");
// 		console.log(this)
// 		this.model.getStatus(this.showStatus);
// 		this.gameLoop();
// 	}.bind(this));
// 	$("#choices").on("click", function(event){
// 		console.log("playerScore: " + this.model.playerPoints);
// 		calcScore = this.model.calcScore(event.target.className);
// 		this.drawPoints(calcScore);
// 		this.gameLoop();
// 	}.bind(this));
// }
//
// GameView.prototype = {
// 	gameLoop: function(){
// 		this.model.checkGameStatus()
// 				this.model.getMomAngerStatus(this.drawMom);
// 				this.model.getChoices(this.showChoices);
// 				this.model.getPhrases().done(function(){
// 					this.showPhrase(this.model.currentMomPhrase);
// 				}.bind(this));
//
// 				// console.log(gameStatus);
// 				// switch(gameStatus){
// 				// 	case 1:
// 				// 		this.model.getMomAngerStatus(this.drawMom);
// 				// 		this.model.getChoices(this.showChoices);
// 				// 		this.model.getPhrases().done(function(){
// 				// 			this.showPhrase(this.model.currentMomPhrase);
// 				// 		}.bind(this));
// 				// 		break;
// 				// 	case 2:
// 				// 		break;
// 				// 	case 3:
// 				// 		break;
// 				// 	case 4:
// 				// 		break;
// 				// }
//
// 	},
// 	drawMom: function(momAngerStatus){
// 		$("#mom-pic").empty();
// 		var img = document.createElement("IMG");
// 		img.className = "mom";
// 		img.src = momAngerStatus.src;
// 		img.alt = momAngerStatus.alt;
// 		document.getElementById("mom-pic").appendChild(img);
// 		$(".mom").css("background-color", momAngerStatus.bg);
// 	},
// 	drawPoints: function(calcScore){
// 		$("#point-count").empty();
// 		$("#point-count").append("<div>" + calcScore.playerPoints + "</div>");
// 		$("#mom-anger").empty();
// 		console.log("playerPoints: " + calcScore.playerPoints);
// 		console.log("momAngerPoints: " + calcScore.momAngerPoints);
// 		for(var i = 0; i < calcScore.momAngerPoints; i++){
// 			$("#mom-anger").append("<div>" + "" + "</div>");
// 			console.log("mom points");
// 		}
// 	},
// 	showChoices: function(choices){
// 		$("#choices").empty();
// 		for(var i = 0; i < choices.length; i++){
// 			$("#choices").append("<h1 class=\"" + choices[i].id + "\">" + choices[i].choice + "</h1>");
// 		}
// 	},
// 	showStatus: function(status){
// 		console.log("in showStatus");
// 		console.log("Status.time: " + status.time);
// 		$("current-status").empty();
// 		$("current-status").append("<p>" + status.firstStatus + "</p>");
// 	},
// 	showPhrase: function(phrase){
// 		$("#bubble").empty();
// 		$("#bubble").append("<p class=\"" + phrase[0].points + "\">" + phrase[0].phrase + "</p>");
// 	}
//
// }

var currentGame = new Game();
var currentGameView = new GameView(currentGame);

// window.addEventListener("load", beginGame);
