
function Game(){
	this.momAngerPoints = 0;
	this.playerPoints = 0;
	this.currentMomPhrase = {};
	this.playerStatus = {};
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
				src: "images/mombasic01b.png",
				alt: "Happy mom",
				bg: "#58C1BC",
				font: "emmasophia",
				fontSize: "12px"
			};
		}
		else if(this.momAngerPoints < 70){
			momAngerStatus = {
				src: "images/mombasic01b.png",
				alt: "Annoyed mom",
				bg: "#F8CD5B",
				font: "the_betty_font",
				fontSize: "20px"
			};
		}
		else if(this.momAngerPoints < 90){
			momAngerStatus = {
				src: "images/mombasic01b.png",
				alt: "Angry mom",
				bg: "#F38715",
				font: "irregularis",
				fontSize: "20px"
			};
		}
		else if(this.momAngerPoints >= 90){
			momAngerStatus = {
				src: "images/mombasic01b.png",
				alt: "Furious mom",
				bg: "#F00A30",
				font: "evil_bunny",
				fontSize: "18px"
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
					choice: choice.choice
				});
			});
		randomChoices = _.sample(neaterChoices, 3);
		callback(randomChoices);
		});
	},
	getStatus: function(callback){
		console.log("in getStatus");
		var neaterStatuses = [];

		return $.getJSON("/api/game.json", function(data){
			var statuses = [];
			statuses.push(data.levels[0].statuses);
			_.each(statuses[0], function(status){
				neaterStatuses.push({
					firstStatus: status.status,
					secondStatus: status.followup,
					time: status.time
				});
			});
			this.playerStatus = _.sample(neaterStatuses, 1);
			console.log(this.playerStatus);
			callback(this.playerStatus);
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
			return gameStatus; //if game is still going, gameStatus doesn't change
		}
		else if(this.gameTime == 5000){
			return gameStatus += 1; //if player has run out of time, playerStatus is updated and game is lost
			// secondPlayerStatus();
		}
		else if(this.momAngerPoints == 100){
			return gameStatus += 2; //if player enrages mom, player loses game
			// lostGame();
		}
		else if(this.playerPoints == 100){
			return gameStatus += 3; //if player makes enough points before the last two options, player wins
			// wonLevel();
		}
	}
}
