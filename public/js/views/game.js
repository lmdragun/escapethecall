
function GameView(model){
	var startButton = $(".start");
	var momImage = $(".mom");
	var momTalk = $(".mom-phrase");
	var playerStatus = $(".current-status");
	var imgPlace = $("#upper");
	this.model = model;
	var calcScore = {};

	$(".start").on("click", function(){
		$("#start").css("display", "none");
		this.model.getDetails(this.showDetails);
		this.gameLoop();
	}.bind(this));
	$("#choices").on("click", function(event){
		console.log("playerScore: " + this.model.playerPoints);
		calcScore = this.model.calcScore(event.target.className);
		this.drawPoints(calcScore);
		this.gameLoop();
	}.bind(this));
	$("#hangup").on("click", function(event){
		this.gameOver();
	}.bind(this));
}

GameView.prototype = {
	gameLoop: function(){
		// this.model.checkGameStatus();
		// 		this.model.getMomAngerStatus(this.drawMom);
		// 		this.model.getChoices(this.showChoices);
		// 		this.model.getPhrases().done(function(){
		// 			this.showPhrase(this.model.currentMomPhrase);
		// 		}.bind(this));
			var gameStatus = this.model.checkGameStatus();
				console.dir("gamestatus in gameloop: " + gameStatus);

			// this.model.getMomAngerStatus(this.drawMom);
			// this.model.getChoices(this.showChoices);
			// this.model.getPhrases().done(function(){
			// 	this.showPhrase(this.model.currentMomPhrase);
			// }.bind(this));

				switch(gameStatus){
					case 1:
						this.model.getMomAngerStatus(this.drawMom);
						this.model.getChoices(this.showChoices);
						this.model.getPhrases().done(function(){
							this.showPhrase(this.model.currentMomPhrase);
						}.bind(this));
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
						break;
				}

	},
	drawMom: function(momAngerStatus){
		$("#mom-pic").empty();
		var img = document.createElement("IMG");
		img.className = "mom";
		img.src = momAngerStatus.src;
		img.alt = momAngerStatus.alt;
		document.getElementById("mom-pic").appendChild(img);
		$(".mom").css("background-color", momAngerStatus.bg);
		$("#bubble").css("font-family", momAngerStatus.font).css("font-size", momAngerStatus.fontSize);
	},
	drawPoints: function(calcScore){
		$("#point-count").empty();
		$("#point-count").append("<div>" + calcScore.playerPoints + "</div>");
		$("#mom-anger").empty();
		console.log("playerPoints: " + calcScore.playerPoints);
		console.log("momAngerPoints: " + calcScore.momAngerPoints);
		for(var i = 0; i < calcScore.momAngerPoints; i++){
			$("#mom-anger").append("<div>" + "" + "</div>");
			console.log("mom points");
		}
	},
	showChoices: function(choices){
		$("#choices").empty();
		for(var i = 0; i < choices.length; i++){
			$("#choices").append("<h1 class=\"" + choices[i].id + "\">" + choices[i].choice + "</h1>");
		}
	},
	showDetails: function(details){
		console.log("in showDetails");
		$("#current-status").empty();
		$("#current-status").append("<p>" + details[0].detail + "</p>");
		// var timer = new Timer({
	  //   tick : 1,
	  //   ontick : function (sec) {
	  //       console.log('interval', sec);
	  //   },
	  //   onstart : function() {
	  //       console.log('timer started');
	  //   }
		// });
		// // defining options using on
		// timer.on('end', function () {
		//     console.log('timer ended');
		//     this.start(4).off('end');
		// });
		// //start timer for 10 seconds
		// timer.start(status[0].time);
		// console.log(timer);
	},
	showPhrase: function(phrase){
		$("#bubble").empty();
		$("#bubble").append("<p class=\"" + phrase[0].points + "\">" + phrase[0].phrase + "</p>");
	},
	gameOver: function(){
		$("#start").empty();
		// $("body").rotate({
		// 	animateTo:360,
		// 	duration: 2500
		// 	// callback: function(){
		// 	// 	$("html").rotate(0);
		// 	// }
		// });
		function barrelRoll(x){
			x = parseInt(x);
			document.body.setAttribute('style', ' -moz-transform: rotate('+x+'deg); -moz-transform-origin: 50% 50%; -webkit-transform: rotate('+x+'deg); -webkit-transform-origin: 50% 50%; -o-transform: rotate('+x+'deg); -o-transform-origin:50% 50%; -ms-transform: rotate('+x+'deg); -ms-transform-origin: 50% 50%; transform: rotate('+x+'deg); transform-origin: 50% 50%;');
			}
			for(i=0;i<=360;i++){
				setTimeout("rotateit("+i+")",i*40);
				}void(0);
		$("#start").css("display", "inline").append("<h1>GAME OVER</h1>");
		$("#start").append("<p>Play again?</p>").append("<button class=\"start\">Start the Game</button>");
	}

}
