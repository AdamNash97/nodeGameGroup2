import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as ind from './index.js';


export class Shop{
  constructor(shopInventory,playersInventory){
    this.shopInventory = shopInventory;
    this.playersInventory = playersInventory;
  }
  transaction(pouch, goldDiff){
    pouch.changeGold(goldDiff);
  }
  addItem(inventory, Item){
    inventory.push(Item);
  }
  removeItem(inventory, ItemIndex){
    inventory.splice(ItemIndex,1);
  }
  displayItems(Inventory) {
    for (let i in Inventory) {
      console.log(`${i} : ${Inventory[i].name}, Price: ${Inventory[i].value}`);
    }
  } 
}

export class BrowseOrBuy extends Shop{
  constructor(shopInventory,playersInventory){
    super();
  } 
  browseOrBuy() {
    console.log(`
    Shop Inventory:
    --------------------------------`);
    this.displayItems(inv.shopInventory);
        console.log(`\n`);
        console.log("You have " + inv.pouch.gold + " gold.")
        const browseOrBuy = prompt("Enter 1 to buy an item or Enter 2 to examine an item: ");
        if(browseOrBuy == 1){   
          const itemBuying = prompt("What item do you want to buy? (Press 'x' to cancel): ");
          if (itemBuying == 'x'){
            shop();
          }
          else if (inv.shopInventory.includes(inv.shopInventory[itemBuying])) {
            inv.shopInventory[Number(itemBuying)];
            if ((inv.pouch.gold - inv.shopInventory[itemBuying].value) < 0 ){
            console.log(`\n`);
            console.log("You are too poor!");
            shop();
            }
            else {
              console.log(`\n`);
              //inv.pouch.changeGold(-inv.shopInventory[itemBuying].value);
              this.transaction(inv.pouch, (-inv.shopInventory[itemBuying].value))
              //inv.playersInventory.push(inv.shopInventory[itemBuying]);
              this.addItem(inv.playersInventory, inv.shopInventory[Number(itemBuying)]);
              if(inv.shopInventory[itemBuying].name != "health regeneration potion" ){
                this.removeItem(inv.shopInventory, Number(itemBuying));
                }

         
             
              console.log("Your inventory now contains: ");
              for (let i in inv.playersInventory){
              console.log(inv.playersInventory[i].name);
              };
              shop();
            }
          } else{
            console.log(`\n`);
            console.log("Invalid input, sorry.\n");
            shop();
          };
        }
    else if(browseOrBuy == 2){
      const selectItemToBrowse = prompt("Give the number of the item you want described: ");
      if(inv.shopInventory.includes(inv.shopInventory[selectItemToBrowse])){
        inv.examineItem(inv.shopInventory[Number(selectItemToBrowse)])
        shop();
      } else{
        console.log(`\n`);
        console.log("Invalid input, sorry.\n");
        shop();
      };
    } else{
      console.log(`\n`);
      console.log("Invalid input, sorry.\n");
      shop();
    }
  }
}

//Sell function
export class Sell extends Shop {
  constructor(shopInventory,playersInventory){
    super();
  }
  sell(){
    console.log(`
    Player's Inventory:
    --------------------------------`);
    this.displayItems(inv.playersInventory);
    //displayItems(playersInventory){
      const sellItem = prompt("what would you like to sell? (Press 'x' to cancel: )");
      if (sellItem == 'x'){
        shop();
      }
      else if (inv.playersInventory.includes(inv.playersInventory[sellItem])){
        console.log(`\n`);
        console.log(`You have sold your ${inv.playersInventory[Number(sellItem)].name} for ${inv.playersInventory[Number(sellItem)].value} gold.`)
        //inv.pouch.changeGold(inv.playersInventory[Number(sellItem)].value);
        this.transaction(inv.pouch, inv.playersInventory[Number(sellItem)].value)
        if(inv.shopInventory.includes(inv.playersInventory[Number(sellItem)]) == false){
          this.addItem(inv.shopInventory, (inv.playersInventory[Number(sellItem)]));
        }
        //inv.playersInventory.splice(Number(sellItem),1);
        this.removeItem(inv.playersInventory,Number(sellItem))
        shop();
      } else {
        console.log("Invalid input, sorry.\n");
        shop();
      }
      shop();
    //}
  }
}


//Instances of classes
let sellInstance = new Sell();
let browseInstance = new BrowseOrBuy();

// SHOP
export function shop() {
  console.log("")
  console.log("Welcome to the shop");
  console.log("1: Browse or Buy");
  console.log("2: Sell");
  console.log("0: Go back to village square");
  let shopPrompt = prompt("Pick a number: ");
  shopPrompt = Number(shopPrompt);
  if (shopPrompt == 0){
    ind.locationChoice(0);
  }
  else if (shopPrompt == 1){
    browseInstance.browseOrBuy();
  } else if (shopPrompt == 2){
    sellInstance.sell();
} else {
  console.log("Invalid input, sorry.\n");
  shop();
}
}

