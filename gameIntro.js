import * as ind from './index.js';
import * as inv from './inventory.js';
import * as com from './combat.js';

// GAME INTRO
export async function gameIntro() {
    console.log('You\'re in a daze, unsure of your surroundings... your head is ringing.');
    console.log('');
    await ind.sleep(2000);
    console.log('Your leg hurts like hell...');
    console.log('');
    await ind.sleep(2000);
    console.log('You look down and there is a BITE!');
    console.log('');
    await ind.sleep(2000);
    console.log('Carriage Driver: "Oh yeah... don\'t worry about that... it\'ll heal in no time!"');
    console.log('');
    await ind.sleep(2000);
    console.log('Carriage Driver: "Alright.. this is where they paid me to drop you off"');
    console.log('');
    await ind.sleep(2000);
    console.log('Horrified, you look around but don\'t recognise this town.');
    console.log('');
    await ind.sleep(2000);
    console.log('Carriage Driver: "Well, good luck out there ' + com.player.name + '."');
    console.log('');
    await ind.sleep(2000);
    console.log('You wonder if anyone in town might be able to help you...');
    console.log('');
    await ind.sleep(2000);
    console.log('You start stumbling towards the village square.');
    console.log('');
    await ind.sleep(2000);
    console.log('Carriage Driver: "HEY!! Don\'t forget your things!"');
    console.log('');
    await ind.sleep(2000);
    for (let i in inv.playersInventory) {
      console.log('You have: ' + inv.playersInventory[i].name + ' in your inventory.')
    };
    console.log('The leather pouch contains ' + inv.pouch.gold + ' gold.')
    await ind.sleep(2000);
    console.log("");
    console.log('Carriage Driver: "Oh and one last thing. If it all gets too much you can press ctrl-c to quit at anytime!"')
    await ind.sleep(2000);
    console.log("");
    console.log('You\'re not sure what he\'s talking about but carry on into the town anyway...');
    await ind.sleep(4000);
    ind.locationChoice(0);
  }