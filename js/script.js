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
var hour = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




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
    }
    second = 0;
    minute = 0;
    hour = 0;
    var showTime = document.querySelector('.show-timer');
    showTime.innerHTML = "0 mins 0 secs";
    clearInterval(timeCount);
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
//Create open card function
function cardOpened() {
    this.classList.toggle('open');
    this.classList.toggle('show');
}

//Create matched card function
function matched() {
	cardsOpened[0].classList.add('match');
	cardsOpened[1].classList.add('match');
	cardsOpened[0].classList.remove('open', 'show');
	cardsOpened[1].classList.remove('open', 'show');
	cardsOpened = [];
}

//Create unmatched card function
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

//Create move counter function
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

}

//Create function for starting timer
function timerStart() {
	timeCount = setInterval(function() {
		showTime.innerHTML = minute +"mins" + second +"secs";
		second+=1;
		if (second == 60) {
			minute+=1;
			second = 0;
		} else if (minute == 60) {
			hour+=1;
			minute = 0;
		}
	}, 1000);

}


//Create function for resetting timer for new game

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.addEventListener('DOMContentLoaded', startGame());
restart.onclick = startGame;