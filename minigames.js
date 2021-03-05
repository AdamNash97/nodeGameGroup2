import * as math from 'mathjs';
import * as inv from './inventory.js';

export function roulette(pouch) {
    console.log("Welcome to roulette!");
    console.log("");

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
    let bet = prompt('How much do you want to wager?')
    console.log("You've bet:" + bet)
    bet = Number(bet)
    let choice = prompt('What would you like to choose? (0-36 or ODD or EVEN)')
    console.log("You chose: " + choice);
    choice = Number(choice)

    let result = math.randomInt(36);
    let winner = false
    let odds = 0
    console.log("The result was: " + result);

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
    } else{
        pouch.changeGold(-bet)
    }
    locationChoice(3);
};

export function hangman() {

}




















////////////////////////////////////////////////
//Blackjack

