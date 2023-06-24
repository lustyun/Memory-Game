const cards = document.querySelectorAll(".card");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const resetButton = document.getElementById("reset-button");
const player1Div = document.querySelector(".player1");
const player2Div = document.querySelector(".player2");
let score1 = 0;
let score2 = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentPlayer = 1;
shuffle();

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add("flip");
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	hasFlippedCard = false;
	checkForAMatch();
}

function checkForAMatch() {
	if (firstCard.dataset.name === secondCard.dataset.name) {
		incrementScore(currentPlayer);
		disableCards();
		setWinner();
		return;
	}
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

function setWinner() {
	const totalCards = cards.length;
	const flippedCards = document.querySelectorAll(".card.flip");

	if (flippedCards.length == totalCards) {
		if (score1 > score2) {
			announceWinner("Player 1 Wins!");
		} else if (score2 > score1) {
			announceWinner("Player 2 Wins!");
		} else {
			announceWinner("It's a tie");
		}
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

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		lockBoard = false;
	}, 1000);
}

function shuffle() {
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 1000);
		card.style.order = ramdomPos;
	});
}

function incrementScore(player) {
	if (player === 1) score1++;
	else score2++;
	player1Score.textContent = score1;
	player2Score.textContent = score2;
}

function resetGame() {
	score1 = 0;
	score2 = 0;
	player1Score.textContent = score1;
	player2Score.textContent = score2;
	cards.forEach((card) => {
		card.classList.remove("flip");
		card.addEventListener("click", flipCard);
	});
	lockBoard = false;
	player2Div.style.backgroundColor = "white";
	player1Div.style.backgroundColor = "#01FF95";
	currentPlayer = 1;
	announceWinner("")
	setTimeout(() => {
		shuffle();
	}, 1000);
}

resetButton.addEventListener("click", resetGame);
cards.forEach((card) => card.addEventListener("click", flipCard));
