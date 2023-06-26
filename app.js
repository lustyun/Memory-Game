const cards = document.querySelectorAll(".card");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const resetButton = document.getElementById("reset-button");
const player1Div = document.querySelector(".player1");
const player2Div = document.querySelector(".player2");
const roundh1 = document.querySelector(".round");
let score1 = 0;
let score2 = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentPlayer = 1;
let round = 1;
let player1Round = 0;
let player2Round = 0;

shuffle();

function flipCard() {
	if (lockBoard) return; // If the board is locked, exit function
	if (this === firstCard) return; // If the 2nd card clicked is the 1st card, exit function
	this.classList.add("flip");
	if (!hasFlippedCard) {
		// If there are no flipped card, set "this" clicked card as first card and exit function
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	// This runs when you already flipped the 1st card and then checks for a match
	secondCard = this;
	hasFlippedCard = false;
	checkForAMatch();
}

function checkForAMatch() {
	// If the cards match, give current player a point and make those cards unclickable
	if (firstCard.dataset.name === secondCard.dataset.name) {
		incrementScore(currentPlayer);
		disableCards();
		setWinner();
		return;
	}
	// Swap current player
	if (currentPlayer == 1) {
		player2Div.style.backgroundColor = "#01FF95";
		player1Div.style.backgroundColor = "white";
		currentPlayer = 2;
	} else {
		player2Div.style.backgroundColor = "white";
		player1Div.style.backgroundColor = "#01FF95";
		currentPlayer = 1;
	}
	unflipCards();
}
// Check score after all cards are flipped and announce the player with the most points
function setWinner() {
	const flippedCards = document.querySelectorAll(".card.flip");

	if (flippedCards.length === cards.length) {
		if (score1 > score2) {
			announceWinner("Player 1 Wins!");
			player1Round++;
			rounds();
		} else if (score2 > score1) {
			announceWinner("Player 2 Wins!");
			player2Round++;
			rounds();
		} else {
			announceWinner("It's a tie");
		}
	}
}

function rounds() {
	round++;

	roundh1.textContent = `Round: ${round}`;
	if (player1Round == 2) {
		announceWinner("Player 1 Wins the Game!");
		round = 1;
		roundh1.textContent = "";
		player1Round = 0;
	}
	if (player2Round == 2) {
		announceWinner("Player 2 Wins the Game!");
		round = 1;
		roundh1.textContent = "";
		player2Round = 0;
	}
}

function announceWinner(winner) {
	const winnerText = document.querySelector(".winner-text");
	winnerText.textContent = `${winner}`;
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
}
// Lock the board for 1 sec and unflip the current two cards then unlock the board
function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		firstCard = null;
		lockBoard = false;
	}, 1000);
}
// Randomly change the order of the cards
function shuffle() {
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 1000);
		card.style.order = ramdomPos;
	});
}

// Give the current player +1 point
function incrementScore(player) {
	if (player === 1) score1++;
	else score2++;
	player1Score.textContent = score1;
	player2Score.textContent = score2;
}

// Reset the score, unflip all cards and make all cards clickable again then shuffle after 1 sec delay
function resetGame() {
	lockBoard = true;
	score1 = 0;
	score2 = 0;
	roundh1.textContent = `Round: ${round}`;
	player1Score.textContent = score1;
	player2Score.textContent = score2;
	cards.forEach((card) => {
		card.classList.remove("flip");
		card.addEventListener("click", flipCard);
	});
	player2Div.style.backgroundColor = "white";
	player1Div.style.backgroundColor = "#01FF95";
	currentPlayer = 1;
	announceWinner("");
	setTimeout(() => {
		shuffle();
		lockBoard = false;
	}, 1000);
}

resetButton.addEventListener("click", resetGame);
cards.forEach((card) => card.addEventListener("click", flipCard));
