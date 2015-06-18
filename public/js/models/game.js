
function Game(){
	this.momAngerPoints = 0;
	this.playerPoints = 99;
	this.gameTime = 60;
	this.currentMomPhrase = {};
	this.playerDetails = {};
	this.gameStatus = 1;
	this.phrases = [];
	this.choices = [];
	this.statuses = [];
}

Game.prototype = {
	getMomAngerStatus: function(callback){
		var momAngerStatus = {};
		var img = document.createElement("IMG");
		img.className = "mom";
		if(this.momAngerPoints < 35){
			momAngerStatus = {
				src: "images/mom01.png",
				alt: "Happy mom",
				bg: "#58C1BC",
				font: "emmasophia",
				fontSize: "12px"
			};
		}
		else if(this.momAngerPoints < 70){
			momAngerStatus = {
				src: "images/mom02.png",
				alt: "Annoyed mom",
				bg: "#F8CD5B",
				font: "emmasophia",
				fontSize: "12px"
			};
		}
		else if(this.momAngerPoints < 90){
			momAngerStatus = {
				src: "images/mom03.png",
				alt: "Angry mom",
				bg: "#F38715",
				font: "emmasophia",
				fontSize: "12px"
			};
		}
		else if(this.momAngerPoints >= 90){
			momAngerStatus = {
				src: "images/mom04.png",
				alt: "Furious mom",
				bg: "#F00A30",
				font: "the_betty_font",
				fontSize: "20px"
			};
			}
		callback(momAngerStatus);
	},
	getChoices: function(callback){
		var neaterChoices = []; //collection of choices separated into objects
		var randomChoices = []; //collection of three random choices
		$.getJSON("/api/game.json", function(data){
			// this.phrases.push(data.levels[0].phrases);
			var choices = [];
			choices.push(data.levels[0].choices);
			_.each(choices[0], function(choice){
				neaterChoices.push({
					id: choice.number,
					choice: choice.choice,
					attempt: choice.attempt
				});
			});
		randomChoices = _.sample(neaterChoices, 3);
		callback(randomChoices);
		});
	},
	getDetails: function(callback){
		this.playerPoints = 0;
		this.momAngerPoints = 0;
		var neaterDetails = [];
		return $.getJSON("/api/game.json", function(data){
			var details = [];
			details.push(data.levels[0].details);
			_.each(details[0], function(detail){
				neaterDetails.push({
					detail: detail.detail,
					followup: detail.followup,
					time: detail.time
				});
			});
			this.playerDetails = _.sample(neaterDetails, 1);
			callback(this.playerDetails);
		}.bind(this));
	},
	getPhrases: function(){
		var neaterPhrases = []; //collection of phrases separated into objects
		// var randomPhrase = []; //one random phrase
		return $.getJSON("/api/game.json", function(data){
			var phrases = [];
			phrases.push(data.levels[0].phrases);
			_.each(phrases[0], function(phrase){
				neaterPhrases.push({
					points: phrase.number,
					phrase: phrase.phrase
				});
			});
			this.currentMomPhrase = _.sample(neaterPhrases, 1);
			// console.dir(this);
		}.bind(this));
	},
	setTime: function(callback){
		console.log("in setTime, time: " + this.playerDetails[0].time);
		var seconds = this.playerDetails[0].time;
		callback(seconds);
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
		};
		console.log("calcScore, momAngerPoints: " + this.momAngerPoints + ", playerPoints: " + this.playerPoints);
		return points;
		// drawPoints(playerPoints, momAngerPoints)
	},
	checkGameStatus: function(){
		console.dir("in checkGameStatus -- gameTime: " + this.gameTime + ", momAngerPoints: " + this.momAngerPoints + ", playerPoints: " + this.playerPoints);
		console.log("this.gameStatus above if: " + this.gameStatus);
		if(this.gameTime > 0 && this.momAngerPoints < 100 && this.playerPoints < 100){
			this.gameStatus = 1; //if game is still going, gameStatus doesn't change
			console.log("gameStatus in checkGameStatus 1: " + this.gameStatus);
		}
		else if(this.gameTime === 0){
			this.gameStatus = 2; //if player has run out of time, playerStatus is updated and game is lost
			// secondPlayerStatus();
		}
		else if(this.momAngerPoints >= 100){
			this.gameStatus = 3; //if player enrages mom, player loses game
			// lostGame();
			console.log("gameStatus in checkGameStatus 3: " + this.gameStatus);
		}
		else if(this.playerPoints >= 100){
			this.gameStatus = 4; //if player makes enough points before the last two options, player wins
			// wonLevel();
		}
		console.log("this.gameStatus: " + this.gameStatus);
		return this.gameStatus;
	}
};
