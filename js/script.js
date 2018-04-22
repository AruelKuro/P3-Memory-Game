//List that holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];
const gameBoard = document.querySelector(".deck");

// Other variables
const stars = document.querySelectorAll('.fa-star');
let count = document.querySelector('.moves');
let cardsOpened = [];
let moves = 0;
let matchedCards = document.getElementsByClassName('match');
let showTime = document.querySelector('.show-timer');
let restart = document.querySelector('.fa-repeat');
var timeCount;
var second = 0;
var minute = 0;
let modal = document.getElementById('win-message');



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Function that starts the game
function startGame() {
    cardsOpened = [];
    count.innerHTML = 0;
    moves = 0;
    let shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        gameBoard.append(shuffleCards[i]);
        cards[i].classList.remove('open', 'show', 'match', 'disabled');
        cards[i].addEventListener('click', cardOpened);
        cards[i].addEventListener('click', cardClicked);
        cards[i].addEventListener('click', win);
    }
    second = 0;
    minute = 0;
    hour = 0;
    var showTime = document.querySelector('.show-timer');
    showTime.innerHTML = "0 mins 0 secs";
    clearInterval(timeCount);
    for (var i= 0; i < stars.length; i++){
    	stars[i].style.visibility = "visible";
    }
}


//Function to check up if cards matches or not
function cardClicked() {
    cardsOpened.push(this);
    let len = cardsOpened.length;
    if(len === 2) {
        moveCount();
        if (cardsOpened[0].type === cardsOpened[1].type) {
            matched();
        } else {
            notMatched();
        }
    }
}
// Function to show opened card
function cardOpened() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

// Function for a cards that matches
function matched() {
	cardsOpened[0].classList.add('match');
	cardsOpened[1].classList.add('match');
	cardsOpened[0].classList.remove('open', 'show');
	cardsOpened[1].classList.remove('open', 'show');
	cardsOpened = [];
}

// Function for cards that do not match
function notMatched() {
	cardsOpened[0].classList.add('notmatch');
	cardsOpened[1].classList.add('notmatch');
	disable();
	setTimeout(function() {
		cardsOpened[0].classList.remove('open', 'show', 'notmatch');
		cardsOpened[1].classList.remove('open', 'show', 'notmatch');
		enable();
		cardsOpened = [];
	}, 700);
}

//Temporary disabling cards
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add('disabled');
	});
}

//Enabling cards again
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCards.length; i++) {
			matchedCards[i].classList.add('disabled');
		}
	});
}

// Function for counting moves and controlling star rating
function moveCount() {
    moves+=1;
    count.innerHTML = moves;
    if (moves >=10 && moves <20) {
    	for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves >= 20) {
    	for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    if (moves == 1) {
    	timerStart();
    }
}


//Create function for winning
function win() {
	if (matchedCards.length == 16) {
		clearInterval(timeCount);
		modal.classList.add('show');
		finalTime = showTime.innerHTML;
		var starRate = document.querySelector('.stars').innerHTML;
		document.getElementById("msgMoves").innerHTML = moves;
		document.getElementById("msgTime").innerHTML = finalTime;
		document.getElementById("msgRating").innerHTML = starRate;
	}
}



// Function for the timer
function timerStart() {
	timeCount = setInterval(function() {
		showTime.innerHTML = minute + " mins " + second + " secs";
		second+=1;
		if (second == 60) {
			minute+=1;
			second = 0;
		} else if (minute == 60) {
			minute = 0;
		}
	}, 1000);

}

//Function for closing modal and restarting the game
function playAgain () {
	modal.classList.remove('show');
	startGame();
}

// Event listener for starting the game
document.addEventListener('DOMContentLoaded', startGame());

// Restart button activates startGame function
restart.onclick = startGame;

