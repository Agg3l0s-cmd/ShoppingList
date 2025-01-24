import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://shoppinglist-8fbfb-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartItems = ref(database, "cart-items");

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const list = document.getElementById('shopping-list');

addButton.addEventListener('click', function(){
  let inputValue = inputField.value;

  if (inputValue !== '') {
    push(cartItems, capitalize(inputValue));
  }

  inputField.value = '';

});

onValue(cartItems, function(snapshot){
  list.innerHTML = '';

  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
  
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      let currItemID = currentItem[0];
      let currItemValue = currentItem[1];

      add(currentItem);
    }
  }
  else{
    list.innerHTML = 'No items in the list...';
  }
  
});

function capitalize(s)
{
  return s && String(s[0]).toUpperCase() + String(s).slice(1);
}

function add(item){
  let itemID = item[0]
  let itemValue = item[1];

  let newEL = document.createElement('li');

  newEL.textContent = itemValue;

  newEL.addEventListener('click', function(){
    let exactLoc = ref(database, `cart-items/${itemID}`);
    remove(exactLoc);
  });

  list.appendChild(newEL);
};