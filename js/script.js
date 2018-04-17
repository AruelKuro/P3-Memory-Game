//List that holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];
const gameBoard = document.querySelector(".deck");

// Other variables
let stars = document.getElementsByClassName('fa-star');
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
let closeModal = document.querySelector('.close');
let playAgain = document.getElementById('play-again');



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
        cards[i].classList.remove('open', 'show', 'match');
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
    stars[0].classList.remove('decrease');
    stars[1].classList.remove('decrease');
}


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

function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add('disabled');
	});
}

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
    	stars[0].classList.add('decrease');
    } else if (moves >= 20) {
    	stars[1].classList.add('decrease');
    }
    if (moves == 1) {
    	timerStart();
    }
}


//Create function for winning
function win() {
	if (matchedCards.length === 16) {
		clearInterval(timeCount);
		finalTime = showTime.innerHTML;
		modal.style.display = "block";
		starRate = stars.innerHTML;
		document.querySelector('.msg-moves').innerHTML = moves;
		document.querySelector('.msg-time').innerHTML = finalTime;
		document.querySelector('.msg-rating').innerHTML = starRate;
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



// Event listener for starting the game
document.addEventListener('DOMContentLoaded', startGame());

// Restart button activates startGame function
restart.onclick = startGame;
playAgain.onclick = startGame;
