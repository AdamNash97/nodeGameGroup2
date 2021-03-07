import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as ind from './index.js';

// VILLAGE SQUARE
export function villageSquare() {
    console.log("")
    console.log("Welcome to the village square! You see many interesting places around you...");
    console.log("Where would you like to go?");
    console.log("1 : Shop");
    console.log("2 : Tavern");
    console.log("3 : Casino");
    console.log("4 : Gallows");
    console.log("5 : Forest");
    console.log("6 : Temple");
    const villageSquarePrompt = prompt("Please pick a number (1-6) to travel to your destination: ");
    var locArr = ["1","2","3","4","5","6"];
    if(locArr.includes(villageSquarePrompt)){
    ind.locationChoice(villageSquarePrompt);
    } else {
      console.log("Invalid input, sorry.");
      villageSquare();
    }
  }