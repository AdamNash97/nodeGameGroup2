//Importing modules for each location in game:
import * as gal from './gallows.js';
import * as sh from './shop.js';
import * as te from './temple.js';
import * as ta from './tavern.js';
import * as ca from './casino.js';
import * as fo from './forest.js';
import * as vs from './villageSquare.js';
import * as gi from './gameIntro.js';

//INITIALIZING AND STARTING GAME
gi.gameStart();

// LOCATION SELECTOR
export function locationChoice (locationIndex){
    switch (Number(locationIndex)){ //Location Indexes
      case 0: //0 : Village Square
        vs.villageSquare();
        break;
      case 1: //1 : Shop
        sh.shop();
        break;
      case 2: //2 : Tavern
        ta.tavern();
        break;
      case 3: //3 : Casino
        ca.casino();
        break;
      case 4: //4 : Gallows
        gal.gallows();
        break;
      case 5: //5 : Forest
        fo.forest();
        break;
      case 6: //6 : Temple 
        te.temple();
        break;
    }
}

// GLOBAL SCOPE FUNCTION: 
// Allows waiting between executing lines using async functions eg. building suspense in dialog
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


