import promptSync from 'prompt-sync';
import {locationChoice} from './index.js';
import hangmanAscii from 'hangman-ascii';
import * as ind from './index.js';
import * as com from './combat.js';
import * as inv from './inventory.js';
const prompt = promptSync({sigint: true});

// GALLOWS
export function gallows() {
  console.log("")
  console.log("Welcome to the gallows");
  console.log("What do you wanna do?");
  console.log("1: Watch the hanging");
  console.log("2: Try and stop the hanging")
  console.log("0: Go back to village square");
  let gallowsPrompt = prompt("Pick a number: ");
  gallowsPrompt = Number(gallowsPrompt);
  if (gallowsPrompt == 0){
    ind.locationChoice(0);
  }
  else if (gallowsPrompt == 1){
    initiateHanging();
  }
  else if (gallowsPrompt == 2){
    let hangmanSuccess = hangmanGame();
    if (hangmanSuccess) {
      console.log('Criminal: Oh wow, you saved me ' + com.player.name + '! I don\'t have much but I owe you everything!')
      inv.pouch.changeGold(3)
      ind.locationChoice(0)
    }
    else {
      console.log('Executioner: "He got what he deserved... don\'t meddle next time."')
      ind.locationChoice(0)
    }

  } else {
    console.log("Invalid input, sorry.");
    gallows();
  }

};

//HANGMAN ANIMATION
export function initiateHanging(){

console.log(`
----------------------------------------------
Welcome to the gallows, cameras at the ready!'
`);    

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
console.log('Today you\'re just a spectator, but it\'s a fine line!');
hangmanAscii.drawLevel(0, 'green');
await sleep(3000)
console.log('This man broke the law, so in return we break his neck!');
hangmanAscii.drawLevel(1, 'cyan');
await sleep(3000)
console.log('And so it begins!');
hangmanAscii.drawLevel(2, 'magenta');
await sleep(3000)
console.log('He deserves it!');
hangmanAscii.drawLevel(3, 'yellow');
await sleep(3000)
console.log('He\'s starting to look a little gray!');
hangmanAscii.drawLevel(4, 'gray');
await sleep(3000)
console.log('Damn, he\'s white as a sheet!');
hangmanAscii.drawLevel(5, 'white');
await sleep(3000)
console.log('We just gave a whole new meaning to \'hanging out\'! lol');
hangmanAscii.drawLevel(6, 'red');
await sleep(3000)
console.log('Well thanks for watching, be sure to recycle your popcorn boxes!');
console.log('Let this be a lesson: jaywalking can be lethal! \n')
await sleep(2000)
const gallowsPrompt = prompt("Enter 0 to return to the village, be sure to use the zebra crossings though!");
if (gallowsPrompt == 0){
  locationChoice(0);
}
else {
  console.log("I'm not sure what you input, but you don't want to see that again, surely?!");
  locationChoice(0);
}
})();

}

// HANGMAN FUNCTION WIP
export function hangmanGame() {
  let targetWord = '';
  let dArray = [];
  let failCount = 0;
  let success = false;

  // List of possible words to be selected
  const words = ['Tavern','Shop','Casino','Forest','Temple','Gallows','Cannibal','Retribution','Shia','Hobbit','Dragon','Wizard','Lizard',
                'Brother','Weapon','War','Warrior','Potion','Booze','Trebuchet','Gun','Jellybean','Pouch','Sword','Satan','Orb','Truth',
                'Zombie','Pigeon','Squirrel','Bamboozle']

  // Colours for hangmanASCII
  const hangmanColours = ['green','cyan','magenta','yellow','gray','white','red']

  function init() {
    console.log('Executioner: "So you wanna try and save this criminal scum? Well, if you can win my game I\'ll let him go..."\n');
    console.log('Executioner: "I am going to give you some empty dashes ' +
      'guess the word in question by typing one letter at a time,' + 
      ' but if you can\'t get it in time he\'s gonna swing"');

    targetWord = words[getRandom(words.length)];
    dArray = Array(targetWord.length);
    failCount = 0;
    let success = letterLoop()
    return success
  }

  function letterLoop() {

    let letter = prompt("Enter a letter: ");
    checkword(letter); 
  }

  function checkword(letter) {
    let tick;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i].toLowerCase() === letter) {
        dArray[i] = targetWord[i];
        tick = true;
      } else if (dArray[i] === undefined) {
        dArray[i] = '_';
      }
    }

    tick ? tick = false : failCount++;
    
    if (failCount === 6) {
      hangmanAscii.drawLevel(failCount, hangmanColours[failCount]);
      console.log('Game over, he\'s hanged');
      console.log('The word was', targetWord);
    } else {
      hangmanAscii.drawLevel(failCount, hangmanColours[failCount]);
      console.log(dArray.join(' '));
    }
    while (failCount < 6) {
      if (dArray.includes('_')) {
        letterLoop()
      } else {
        console.log('Executioner: "Ahh you got it... Alright you scum, you\'re free, now get out of my sight!\n');
        failCount = 7;
        success = true;
      }
    }

  }

  //for getting random things
  function getRandom(max) {
    return Math.floor(Math.random() * (max));
  }

  init();
  return success;
}