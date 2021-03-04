//Allows users to exit at anytime from prompt line
import promptSync from 'prompt-sync';
const prompt = promptSync();
import {Item, Wallet, Weapon} from './inventory.js';

//Intro function
function startGame() {
    console.log('Welcome to Cannibal Retribution!')
    const wantToPlay = prompt("Do you want to play? (Y/N)");
    if (wantToPlay == "Y") {
      locationChoice(0);
    }
    else {
      console.log("Okay, no worries!");
    }
};

function locationChoice (locationIndex){
    /* Location Indexes
        0 : Hub
        1 : Shop
        2 : Tavern
        3 : Casino
        4 : Gallows
        5 : Forest      */
    switch (Number(locationIndex)){
      case 0:
        hub();
        break;
      case 1:
        shop();
        break;
      case 2:
        tavern();
        break;
      case 3:
        casino();
        break;
      case 4:
        gallows();
        break;
      case 5:
        forest();
        break;

    }
}

function hub() {
  console.log("")
  console.log("Welcome to the hub! You see many interesting places around you...");
  console.log("Where would you like to go?");
  console.log("1 : Shop");
  console.log("2 : Tavern");
  console.log("3 : Casino");
  console.log("4 : Gallows");
  console.log("5 : Forest");
  const hubPrompt = prompt("Please pick a number (1-5) to travel to your destination...");
  locationChoice(hubPrompt); 
}

function shop() {
  console.log("")
  console.log("Welcome to the shop");
  console.log("What do you wanna do?");
  console.log("1: ");
  console.log("0: Go back to hub");
  const shopPrompt = prompt("Pick a number");
  if (shopPrompt == 0){
    locationChoice(0);
  }
}


function casino() {
  console.log("")
  console.log("Welcome to the casino");
  console.log("What do you wanna do?");
  console.log("1: Play Blackjack");
  console.log("0: Go back to hub");
  const casinoPrompt = prompt("Pick a number");
  if (casinoPrompt == 0){
    locationChoice(0);
  }
}

function gallows() {
  console.log("")
  console.log("Welcome to the gallows");
  console.log("What do you want to do?");
  console.log("1: Play Hangman");
  console.log("0: Go back to hub");
  const gallowsPrompt = prompt("Pick a number");
  if (gallowsPrompt == 0){
    locationChoice(0);
  };
};

function tavern() {
  console.log("")
  console.log("Welcome to the tavern");
  console.log("What do you want to do?");
  console.log("1: get booze");
  console.log("0: Go back to hub");
  const tavernPrompt = prompt("Pick a number");
  if (tavernPrompt == 0){
    locationChoice(0);
  };
};

function forest() {
  console.log("")
  console.log("Welcome to the forest");
  console.log("What do you want to do?");
  console.log("1: Play Hangman");
  console.log("0: Go back to hub");
  const forestPrompt = prompt("Pick a number");
  if (forestPrompt == 0){
    locationChoice(0);
  };
};

{startGame();}

