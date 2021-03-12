import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as ind from './index.js';

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
      displayItems(inv.shopInventory);
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
            inv.pouch.changeGold(-inv.shopInventory[itemBuying].value);
            inv.playersInventory.push(inv.shopInventory[itemBuying]);
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
    } else if (shopPrompt == 2){
      displayItems(inv.playersInventory);
      const sellItem = prompt("what would you like to sell? (Press 'x' to cancel: )");
      if (sellItem == 'x'){
        shop();
      }
      else if (inv.playersInventory.includes(inv.playersInventory[sellItem])){
        console.log(`\n`);
        console.log(`You have sold your ${inv.playersInventory[Number(sellItem)].name} for ${inv.playersInventory[Number(sellItem)].value} gold.`)
        inv.pouch.changeGold(inv.playersInventory[Number(sellItem)].value);
        inv.playersInventory.splice(Number(sellItem),1);
        shop();
      } else {
        console.log("Invalid input, sorry.\n");
        shop();
      }
    } else {
      console.log("Invalid input, sorry.\n");
      shop();
    }
  }

//function to display items in shop
export function displayItems(Inventory) {
    console.log(`
    Shop Inventory:
    --------------------------------`);
    for (let i in Inventory) {
      console.log(`${i} : ${Inventory[i].name}, Price: ${Inventory[i].value}`);
    }
  }