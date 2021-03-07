import * as ind from './index.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});

//Set initial number of orbs touched to zero before entering temple
var orbsTouched = 0;

// TEMPLE
export function temple() {
    console.log("")
    console.log("Welcome to the temple");
    console.log("In the centre there is a mysterious glowing orb on a pillar...")
    console.log("What do you want to do?");
    console.log("1: Touch the orb");
    console.log("0: Go back to village square");
    const templePrompt = prompt("Pick a number: ");
    if (templePrompt == 0){
      ind.locationChoice(0);
    }else if (templePrompt == 1){
      if (orbsTouched == 0){
          orbsTouched = 1
          touchOrb1();
      }else if (orbsTouched == 1){
          touchOrb2()
      }
    }
    else {
      console.log("Invalid input, sorry.");
      temple();
    }
  };

// TOUCH ORB
export async function touchOrb1(){
    console.log('Unknown voice: "HEY! WHAT DO YOU THINK YOU\'RE DOING!!!"');
    console.log('');
    await ind.sleep(2000);
    console.log('A robed man with a hood covering his face appears from behind a pillar.');
    console.log('')
    await ind.sleep(2000);
    console.log('Robed man: "I am the robed man, guardian of...');
    console.log('');
    await ind.sleep(2000);
    console.log('Robed man: "THE ORB OF TRUTH"')
    console.log('');
    await ind.sleep(2000);
    console.log('Maybe this will reveal how you got here, and who sent you...')
    console.log('');
    await ind.sleep(2000);
    console.log('Robed man: "I see much confusion in you... perhaps I\'ll let you use the orb...')
    console.log('');
    await ind.sleep(2000);
    console.log('Robed man: "FOR A PRICE!!! MWAHAHAHAHA *cough* *cough* excuse me..')
    console.log('');
    await ind.sleep(2000);
    console.log('Robed man: "Yes, uhhh 100 gold should do it..."')
    console.log('');
    await ind.sleep(2000);
    console.log('You leave with more questions than answers... but perhaps you\'re on the right track')
    console.log('');
    await ind.sleep(4000);
    ind.locationChoice(0);
}

  // TOUCH ORB 2
export async function touchOrb2(){
  console.log('Robed man: "Oh. You\'re back...');
  console.log('');
  await ind.sleep(2000);
  console.log('Robed man: Well, do you have the moolah, uh, I mean gold..?')
  console.log('');
  await ind.sleep(2000);
  let orbPrompt = prompt("Hand over gold? (Y/N)")
  if (orbPrompt.toUpperCase() == "Y"){
    if (inv.pouch.gold >= 100){
      winnerWinnerChickenDinner()
    }else{
      console.log('Robed man: "Do you think I am a fool? Fool.')
      console.log('');
      await ind.sleep(2000);
      console.log('Robed man: "Come back when you\'re less disgustingly poor or don\' come back at all!')
      console.log('');
      await ind.sleep(2000);
      console.log('That was rude, you head back to the square...')
      ind.locationChoice(0)
    };

  } else {
    console.log('Robed man: "THEN SCRAM!!! Pathetic...')
    await ind.sleep(2000)
    ind.locationChoice(0)
  };

}

// WIN CONDITION
export async function winnerWinnerChickenDinner() {
  console.log('Robed man: "WAIT WHAT! How\'d someone like you actually get that kind of gold???')
  console.log('');
  await ind.sleep(2000);
  console.log('Robed man: "Gods, they\'re not gonna be happy with me now..."')
  console.log('');
  await ind.sleep(2000);
  console.log('Robed man: "Oh well, a promise is a promise..."')
  console.log('');
  await ind.sleep(2000);
  console.log('Robed man: "Go on then, have at it."')
  console.log('');
  await ind.sleep(2000);
  console.log('You reach out and touch the orb...')
  console.log('');
  await ind.sleep(2000);
  console.log('A flash of blinding light! A sense of fury and rage overcomes you!')
  console.log('');
  await ind.sleep(2000);
  console.log('You see three faces, recognisable to you...')
  console.log('');
  await ind.sleep(2000);
  console.log('Mysterious ominous voice: "NOW YOU SEE THE TRUTH"')
  console.log('');
  await ind.sleep(2000);
  console.log('Mysterious ominous voice: "LOOK DEEPER INSIDE YOURSELF"')
  console.log('');
  await ind.sleep(2000);
  console.log('The memories come rushing back.')
  console.log('');
  await ind.sleep(2000);
  console.log('NO! It can\'t be!')
  console.log('');
  await ind.sleep(2000);
  console.log('Mysterious ominous voice: "DO NOT FEAR THE TRUTH"')
  console.log('');
  await ind.sleep(2000);
  console.log('You can see clearly now...')
  console.log('');
  await ind.sleep(2000);
  console.log('It was them who sent you here...')
  console.log('');
  await ind.sleep(2000);
  console.log('Harry, Matt and Adam!!!')
  console.log('');
  await ind.sleep(2000);
  console.log('Those bastards...')
  console.log('');
  await ind.sleep(2000);
  console.log('To be continued..?')
  console.log('');
  await ind.sleep(2000);
  ind.locationChoice(0)
}