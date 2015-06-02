function GameView(model){
	this.model = model;
	var startButton = $(".start");
	var momImage = $(".mom");
	var momTalk = $(".mom-phrase");
	var playerStatus = $(".current-status");
	var imgPlace = $("#upper");
	var calcScore = {};

	$("#choices").on("click", function(event){
		console.log("playerScore in beginGame: " + this.model.playerPoints);
		calcScore = this.model.calcScore(event.target.className);
		this.drawPoints(points);
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
	drawPoints: function(playerPoints, momAngerPoints){
		$("#player-points").empty();
		$("#player-points").append("<div>" + playerPoints + "</div>");
		$("#mom-anger").empty();
		for(var i = 0; i < momAngerPoints; i++){
			$("#mom-anger").append("<div>" + "" + "</div>");
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



// window.addEventListener("load", beginGame);
