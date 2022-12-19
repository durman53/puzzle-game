levels = {1: [], 2: [], 3: [], 4: []};
answers = {1: "ROLEX", 2: "VALENTINO", 3: "FENDI", 4: "BALENCIAGA"};
playerAnswers = {};
correctAnswers = 0;

var timer = 60;
var timerElement = document.getElementById("timer1");

for (let lvl = 1; lvl <= 4; lvl++) {
	tmp = document.getElementById("com" + lvl);
	for (let i = 0; i < answers[lvl].length; i++) {
		levels[lvl][i] = tmp.querySelector("#char" + (i+1));
	}
}

var pressed = [];

var currentLvl = 1;
var current = 0;

function setCurrent(clickedBtn) {
	pressed[pressed.length] = clickedBtn;
	clickedBtn.disabled = true;
	levels[currentLvl][current].innerHTML = clickedBtn.innerHTML;
	current++;
}

function erase() {
	if (current > 0) {
		pressed[pressed.length-1].disabled = false;
		pressed.splice(pressed.length-1, 1);
		current--;
		levels[currentLvl][current].innerHTML = "";
	}
}

function openNext() {
	current = 0;
	pressed = [];
	document.getElementById("com" + currentLvl).style.display = "none";
	currentLvl++;
	if (currentLvl == 5) {
		document.getElementById("end").style.display = "flex";
		timerElement.remove();
		updater = 0;
		document.getElementById("count").innerHTML = "Правильных ответов: " + correctAnswers;
		if (correctAnswers < 1) {
			document.getElementById("first-reward").style.display = "inline";
		}
		else if (correctAnswers < 3) {
			document.getElementById("second-reward").style.display = "inline";
		} else {
			document.getElementById("third-reward").style.display = "inline";
		}
		clearInterval(updater);
		audio.pause()
	}
	else {
		document.getElementById("com" + currentLvl).style.display = "flex";
		timer = 60;
		timerElement.innerHTML = timer;
		clearInterval(updater);
		updater = setInterval(timerUpdate, 1000);
	}
}

function confirm() {
	if (levels[currentLvl][levels[currentLvl].length-1].innerHTML != "") {
		var word = "";
		for (let i = 0; i < levels[currentLvl].length; i++) {
			word += levels[currentLvl][i].innerHTML;
		}
		if (word == answers[currentLvl]) {
			correctAnswers++;
		}
		playerAnswers[currentLvl] = word;
		openNext();
	}
}

function nextLevel() {
	var word = "";
	for (let i = 0; i < levels[currentLvl].length; i++) {
		word += levels[currentLvl][i].innerHTML;
	}
	console.log(word);
	if (word == answers[currentLvl]) {
		correctAnswers++;
	}
	playerAnswers[currentLvl] = word;
	openNext();
}

function timerUpdate() {
	timer--;
	timerElement.innerHTML = timer;
	if (timer < 1) {
		playerAnswers[currentLvl] = "";
		openNext();
	}
}

var updater = 0;
var audio = new Audio('../sounds/music1.mp3');

function startGame() {
	audio.loop = true;
	audio.play();
	timerElement.style.display = "flex";
	document.getElementById("start").remove();
	document.getElementById("com" + currentLvl).style.display = "flex";
	updater = setInterval(timerUpdate, 1000);
}