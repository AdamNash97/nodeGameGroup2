import * as math from 'mathjs';
import * as inv from './inventory.js';
import {locationChoice} from './index.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});

//Allow user to make a bet in any of the games
function makeBet(pouch){
    inv.countMoney(pouch);
    if (pouch.gold == 0){
        console.log("You have no coins to bet, sorry you can't play! \n");
        locationChoice(3);
    } else {
    let wager = prompt('How much do you want to wager?')
    wager = Number(wager)
    if(wager <= pouch.gold && wager > 0){
    console.log("You've bet:" + wager + "\n")
    pouch.changeGold(-wager)}
    else {
        console.log(`You must bet something, but not more than the gold in your pouch! \n`)
        makeBet(pouch);
    }
}
}

// Roulette for casino
export function roulette(pouch) {
    console.log("Welcome to roulette!");
    console.log("");

    // Rules and play choice
    let ruleChoice = prompt("Would you like to hear the rules? (Y/N)")
    if (ruleChoice.toUpperCase() == "Y") {
        console.log("You can choose a number between 0 and 36, or odd or even.");
        console.log("The roulette will then spin, and if it's a match you win!");
        console.log("But be careful! If you choose odd or even and 0 comes up you lose either way...");
        console.log("Payouts:");
        console.log("Odds or Evens: double your money!");
        console.log("Single number: JACKPOT! 35 times your bet!!!");
        console.log("Alright lets play!");
    } else {
        console.log("Alright, lets play!");
    }

    //Bet and choice
    // inv.countMoney(pouch);
    // let bet = prompt('How much do you want to wager?')
    // console.log("You've bet:" + bet)
    // bet = Number(bet)
    // pouch.changeGold(-bet)
    makeBet(pouch);
    let choice = prompt('What would you like to choose? (0-36 or ODD or EVEN): ')
    console.log("You chose: " + choice);

    let result = math.randomInt(36);
    let winner = false
    let odds = 0
    console.log("The result was: " + result);

    //Win or lose
    if (choice.toUpperCase() == "ODD" && result != 0) {
        if (result % 2 == 1) {
            console.log("Nice. You win!");
            winner = true
            odds = 2
        }
        else {
            console.log("Oh no! You lose..");
        }

    }
    else if (choice.toUpperCase() == "EVEN" && result != 0) {
        if (result % 2 == 0) {
            console.log("Nice. You win!");
            winner = true
            odds = 2
        }
        else {
            console.log("Oh no! You lose..");
        }
    }
    else if (Number(choice) == result) {
        console.log("Nice. You win!");
        winner = true
        odds = 35    
    }
    else {
        console.log("Oh no! You lose..");
    }
    if (winner == true){
        pouch.changeGold((bet*odds))
    }
};


// Blackjack for Casino

export function blackjack(pouch){
    console.log("Welcome to blackjack!!");
    console.log("");

    let ruleChoice = prompt("Would you like to hear the rules? (Y/N)")
    if (ruleChoice.toUpperCase() == "Y") {
        console.log("The goal of blackjack is to beat the dealer's hand without going over 21.");
        console.log("Face cards are worth 10. Aces are worth 1 or 11 depending on which provides the optimum hand.");
        console.log("Each player starts with two cards, one of the dealer's cards is hidden until the end.");
        console.log("To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.");
        console.log("If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.");
        console.log("If you are dealt 21 from the start (Ace & 10), you got a blackjack.");
        console.log("Payout:");
        console.log("If you win the hand, you'll receive 2x your original stake! \n" );
    } else {
        console.log("Alright, lets play! \n");
    }
    makeBet(pouch);


//Number of card packs (52 cards each) to be used in game
var numPacks = 1;

//Each card object has a value (rank) and suit
class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
    show() {
      return `${this.rank}${this.suit}`; 
    }
  }

//Construct the range of ranks, 2 through 11, and face cards
function *iterateRanks() {
    for (let i = 2; i < 11; i++) {
      yield i;
    }
    yield "J";
    yield "Q";
    yield "K";
    yield "A";
  }

//Shuffling cards into random order
function shuffle(array) {
    var N = array.length;
    for (let i = 0; i < N; i++) {
      let r = Math.floor(Math.random() * (i + 1));
      let saved = array[i];
      array[i] = array[r];
      array[r] = saved;
    }
  }

//Construct the deck using new card object instances
function buildDeck(numPacks) { 
    var deck = [];
    var suits = ["♠", "♣", "♡", "♢"];
    for (let d = 0; d < numPacks; d++) {
      for (let s = 0; s < suits.length; s++) {
        for (let r of iterateRanks()) {
          deck.push(new Card(r, suits[s]));
        }
      }
    }
    console.log(`\n Deck contains: ${deck.length} cards
      `);
    shuffle(deck);
    return deck;
  }

//Create a player with the ability to build a hand of cards
class Player {

  constructor() {
    this.cards = [];
    this.hardTotal = 0;
    this.softTotal = 0;
    this.bust = false;
  }

  addCard(card) {

    this.cards.push(card);

    // update hardTotal, softTotal
    if (card.rank === "A") {
      // Ace
      this.hardTotal += 1;
      this.softTotal += 11;
      if (this.softTotal > 21) {
        this.softTotal -= 10;
      }
    } else if (typeof card.rank === "string") {
      // Face cards
      this.hardTotal += 10;
      this.softTotal += 10;
    } else {
      // Non-face cards
      this.hardTotal += card.rank;
      this.softTotal += card.rank;
    }
    // Check if bust
    if (this.hardTotal > 21) {
      console.log(`${this.name} busts!
        `);
      this.bust = true;
      throw this;
    }
  }

  getTotal() {
    if (this.hardTotal === 21 || this.softTotal === 21) {
      return 21;
    } else if (this.softTotal > 21) {
      return this.hardTotal;
    } else {
      return this.softTotal;
    }
  }
}

//Create a dealer and automate the hitting and showing of cards
class Dealer extends Player {
    constructor() {
      super();
      this.name = "Dealer";
    }
    hit() {
      if (this.hardTotal < 17) {
        return Promise.resolve(true); // hit
      } else {
        return Promise.resolve(false); // stand
      }
    }
    showCards() {
      var output = "XX"; // first card is face down
      for (let i = 1; i < this.cards.length; i++) { 
        output += ` ${this.cards[i].show()}`; 
      }
      return output;
    }
    revealAllCards() {
      var output = this.cards[0].show();
      for (let i = 1; i < this.cards.length; i++) { 
        output += ` ${this.cards[i].show()}`; 
      }
      return output;
    }
  }

//Create a user to allow input
class User extends Player { // "INHERITANCE"

  constructor(prompt) {
    super();
    this.name = "User";
    this.prompt = prompt;
  }

  hit() {
    return new Promise( (resolve, reject) => {
      const question = prompt("Hit? > ");
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        if (yes.test(question)) {
          resolve(true);
        } else if (no.test(question)) {
          resolve(false);
        } else {
          console.log("Please answer 'yes' or 'no.'");
          resolve(this.hit());
        }
      
    });
  }

  showCards() {
    var output = this.cards[0].show();
    for (let i = 1; i < this.cards.length; i++) { 
      output += ` ${this.cards[i].show()}`; 
    }
    return output;
  }
}

//Deal two cards to player in their original hand
function deal(players, deck) {
    console.log(`The deal...
      `);
    for (let i = 0; i < 2; i++) {
      for (let p = 0; p < players.length; p++) {
        players[p].addCard(deck.pop());
      }
    }
    players.forEach( (player) => {
      console.log(`${player.name}'s cards: ${player.showCards()}`);
    });
  }

//Allowing the player to continuously hit until they want to stand
function turnLoop(player) {
    console.log(`
    ${player.name}'s turn...
    `);
    return player.hit().then(function(hit) {
      if (!hit) {
        // base case
        console.log(`${player.name} stands.`);
        return;
      } else {
        // recursive case
        console.log(`${player.name} hits.`);
        player.addCard(deck.pop());
        console.log(`${player.name}'s cards: ${player.showCards()}`);
        return Promise.resolve(player).then(turnLoop); // TAIL RECURSION
      }
    });
  }
  
//Determine the winner by calculating the sum of the cards for player and dealer
function determineWinner(players) {
    var highScore = 0;
    var winner;
    var tie = false;
    for (let i = 0; i < players.length; i++) {
      if (!players[i].bust) {
        let score = players[i].getTotal();
        if (score > highScore) {
          winner = players[i];
          highScore = score;
        } else if (score === highScore) {
          tie = true;
        }
      }
    }
    console.log(`Dealer's cards: ${players[players.length - 1].revealAllCards()}`);
    if (tie) {
      console.log(`
    It's a tie at ${highScore}!
      `);
    } else {
      if(winner.name == "User"){
        var winnerReturn = 2;
        pouch.changeGold((wager*winnerReturn))
      }
      console.log(`
    ${winner.name} wins with a total of ${highScore}!
      `);
    }
  }


//Run a loop for the game's sequence of events
function game(deck) {

  console.log(`
--------------------------
Let's play some Blackjack!
    `);

  // initialization

  var players = [new User(prompt), new Dealer()];
  deal(players, deck);

  // game loop

  Promise.resolve().then(function() {
    return players.reduce( (sequence, player) => {
      return sequence.then(function() {
        return Promise.resolve(player).then(turnLoop);
      });
    }, Promise.resolve());
  })
  .catch( () => {
    return Promise.resolve();
  })
  
  .then( () => {
    determineWinner(players);
    const question2 = prompt("Play again? > ");
      var yes = /^y(?:es)?/i;
      if (!yes.test(question2)) {
        locationChoice(3);
      } else {
        blackjack(pouch); 
      }
    
  });
};

//Create a new deck and run the game
var deck = buildDeck(numPacks);
game(deck);

}
