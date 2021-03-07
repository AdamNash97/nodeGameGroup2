import * as ind from './index.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as game from './minigames.js';

// CASINO
export function casino() {
    console.log("")
    console.log("Welcome to the casino");
    console.log("What do you wanna do?");
    console.log("1: Play Blackjack");
    console.log("2: Play Roulette")
    console.log("0: Go back to village square");
    let casinoPrompt = prompt("Pick a number: ");
    casinoPrompt = Number(casinoPrompt);
    if (casinoPrompt == 0){
      ind.locationChoice(0);
    }
    else if (casinoPrompt == 1){
      game.blackjack(inv.pouch);
    }
    else if (casinoPrompt == 2){
      game.roulette(inv.pouch);
      ind.locationChoice(3);
    } else {
      console.log("Invalid input, sorry.");
      casino();
    }
  }
  