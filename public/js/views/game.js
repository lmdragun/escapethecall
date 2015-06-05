
function GameView(model){
	var startButton = $(".start");
	var momImage = $(".mom");
	var momTalk = $(".mom-phrase");
	var playerStatus = $(".current-status");
	var imgPlace = $("#upper");
	this.detailsFollowUp = "";
	this.model = model;
	var calcScore = {};
	var timerSeconds;

	$(".start").on("click", function(){
		$("#start").empty();
		$("#start").css("display", "none");
		this.model.getDetails(this.showDetails.bind(this));
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
			var gameStatus = this.model.checkGameStatus();
				console.dir("gamestatus in gameloop: " + gameStatus);

				switch(gameStatus){
					case 1: // means keep playing
						this.model.getMomAngerStatus(this.drawMom);
						this.model.getChoices(this.showChoices);
						this.model.getPhrases().done(function(){
							this.showPhrase(this.model.currentMomPhrase);
						}.bind(this));
						break;
					case 2: // means the player is out of time
						this.outOfTime();
						break;
					case 3: // means the mom is too angry
					console.log("in case 3");
						this.furiousMom();
						break;
					case 4: // means the player won
						this.win();
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
		$("#mom-anger").append("<div class=\"anger-points\"></div>");
		var height = 200 - (calcScore.momAngerPoints * 2 ) + "px";
		$(".anger-points").css("height", height);
	},
	showChoices: function(choices){
		$("#choices").empty();
		for(var i = 0; i < choices.length; i++){
			$("#choices").append("<h1 class=\"" + choices[i].id + "\">" + choices[i].choice + "</h1>");
		}
	},
	showDetails: function(details){
		console.log("in showDetails");
		$("#current-detail").empty();
		$("#current-detail").append("<p>" + details[0].detail + "</p>");
		this.detailsFollowUp = details[0].followup;
		var time = details[0].time;
		console.log(this);
		this.model.setTime(this.renderTime.bind(this));
	},
	renderTime: function(time){
		console.log("in renderTime");
		var timer = document.getElementById("timer");
		timerSeconds = setInterval(function () {
			timer.innerHTML = --time;
			if (time <= 0) {
				clearInterval(timerSeconds);
				this.outOfTime();
			}
		}.bind(this), 1000);
	},

	showPhrase: function(phrase){
		$("#bubble").empty();
		$("#bubble").append("<p class=\"" + phrase[0].points + "\">" + phrase[0].phrase + "</p>");
	},
	outOfTime: function(){
		clearInterval(timerSeconds);
		$("#start").empty();
		$("#start").css("display", "inline").append("<br><br><h1>You Lose!</h1><h2>" + this.detailsFollowUp + "</h2>");
	},
	furiousMom: function(){
		clearInterval(timerSeconds);
		$("#start").css("display", "inline").append("<h1>Uhoh, mom's angry now!</h1><h2>I hope you remember her favorite flowers!</h2>").append("<div id=\"phone-handle\"><img src=\"/images/phonehandle.png\"></div>");
		var phone = document.getElementById("phone-handle");
		console.log(phone);
		var distance = 20;
		  setInterval(function() {
		    phone.style.webkitTransform = 'rotate('+-distance*2+'deg)';
				phone.style.left = distance + 'px';
		    phone.style.top = (distance  + 'px');
		    if (distance == window.innerWidth) {
		      distance = 0;
		    } else {
		      distance += 2;
		    }
		  }, 10);
	},
	win: function(){
		clearInterval(timerSeconds);
		$("#bubble").empty();
		$("#choices").empty();
		$("#current-status").empty();
		$("#bubble").css("font-family", "emmasophia").css("font-size", "16 px");
		$("#bubble").append("<p>Oh, look at the time! I should let you go. I love you, honey.</p>");
		$("#current-status").append("<p>You got off the phone with your mom!</p>").css("color", "green").css("font-size", "40px").css("font-family", "vtc_screamitloud").css("text-shadow", "5px 5px 5px #FFF").css("background-color", "rgba(0,0,0,.5)");
		$("#status").css("background", "url('/images/confetti01.gif')");
	},
	gameOver: function(){
		clearInterval(timerSeconds);
		$("#bubble").empty();
		$("#choices").empty();
		$("#current-status").empty();
		$("#point-count").empty();
		$("#timer").empty();
		$("#start").css("display", "block").append("<h1>GAME OVER</h1>");
		$("#start").append("<p>Play again?</p>").append("<button class=\"restart\">Start the Game</button>");
		$(".restart").on("click", function(){
			$("#start").empty();
			$("#start").css("display", "none");
			this.model.getDetails(this.showDetails.bind(this));
			this.gameLoop();
		}.bind(this));
		//attempting a barrel roll and then just simple spinning, not really working the way I want it to
		var distance = 20;
		// for(i = 0; i<=360; i++){
		// 	setTimeout("rotateit("+i+")",i*40);
		// }void(0);
			// setInterval(function() {
			// 	rotate = "rotate(" +- distance * 2 + "deg)";
			// 	$("#start").css("webkitTransform", rotate);
			// 	if(distance == 12){
			// 		distance = 0;
			// 	}
			// 	else{
			// 		distance += 2;
			// 	}
			// 	}, 70);

	}

}
