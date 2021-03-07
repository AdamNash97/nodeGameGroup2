import promptSync from 'prompt-sync';
import {locationChoice} from './index.js';
import hangman from 'hangman-ascii';
const prompt = promptSync({sigint: true});


export function initiateHanging(){

console.log(`
----------------------------------------------
Welcome to the gallows, cameras at the ready!'
`);
    
var hangmanAscii = hangman;

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