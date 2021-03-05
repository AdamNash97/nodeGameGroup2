import * as math from 'mathjs';
import * as inv from './inventory.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});


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
    inv.countMoney(pouch);
    let bet = prompt('How much do you want to wager?')
    console.log("You've bet:" + bet)
    bet = Number(bet)
    pouch.changeGold(-bet)
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

export function hangman() {

}






// Blackjack for Casino

export function blackjack(pouch){
    console.log("Welcome to blackjack!!");
    console.log("");

    let ruleChoice = prompt("Would you like to hear the rules? (Y/N)")
    if (ruleChoice.toUpperCase() == "Y") {
        console.log("The goal of blackjack is to beat the dealer's hand without going over 21.");
        console.log("Face cards are worth 10. Aces are worth 1 in this version of the game");
        console.log("Each player starts with two cards, one of the dealer's cards is hidden until the end.");
        console.log("To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.");
        console.log("If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.");
        console.log("If you are dealt 21 from the start (Ace & 10), you got a blackjack.");
        console.log("Payout:");
        console.log("If you win the hand, you'll receive 1.5x your original stake!");
    } else {
        console.log("Alright, lets play!");
    }
    inv.countMoney(pouch);
    let bet = prompt('How much do you want to wager?')
    console.log("You've bet:" + bet)
    bet = Number(bet)
    pouch.changeGold(-bet)




}

