const ul = document.querySelector('ul');
const form = document.querySelector('#item-form');
const submitBtn = document.querySelector('#submitBtn');
const itemInput = document.querySelector('#item-input');
const filterInput = document.querySelector('#filter');
const clearButton = document.getElementById('clear');
const li = document.querySelector('ul li');

/* // ADD ITEM FIRST WAY

function addListItem(name) {
  const li = document.createElement('li');
  li.innerHTML = `${name}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>`;
  document.querySelector('ul').appendChild(li);
}

addListItem('Bananas'); */

// ADD ITEM SECOND WAY, BETTER WAY.

function createListItem(item) {  // RETURNS CREATED ITEM WIRH "item" CONTENT
  const a = item[0].toUpperCase() + item.slice(1).toLowerCase(); //Capitalized text
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(a));

  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  button.appendChild(icon);
  li.appendChild(button);

  return (li);
}

function addShoppingItem(item, recur) {
  if (!isDuplicate(item)) {
    const ul = document.querySelector('ul');
    const li = createListItem(item)

    let listOfItems = [];
    if (localStorage.getItem('items') === null) {
      listOfItems = [];
    } else {
      listOfItems = JSON.parse(localStorage.getItem('items'));
    }

    if (recur) {
      li.classList.add('btn-recur');

      listOfItems.push('1' + item);
      localStorage.setItem('items', JSON.stringify(listOfItems));

      ul.insertAdjacentElement('afterbegin', li);

    } else {
      listOfItems.push('0' + item);
      localStorage.setItem('items', JSON.stringify(listOfItems));

      ul.appendChild(li);
    }
    checkUiColors();
  }
}

/* // INSERTING ITEMS

h1 = document.createElement('h1');
h1.appendChild(document.createTextNode('sanatate'));
const h1c = h1.cloneNode(true);
document.querySelector('ul').insertBefore(h1, document.querySelector('li:nth-child(3)'));

function insertAfter(item, anchor) {
  const goodAnchor = anchor.nextElementSibling;
  goodAnchor.parentElement.insertBefore(item, goodAnchor);
}

const li = document.createElement('li');
li.textContent = 'Insert Me After!';
const firstItem = document.querySelector('li:first-child');
insertAfter(li, firstItem); */

// CLEAR LIST FUNCTION

/* function clearList() {
  const list = document.querySelector('ul').children;
  listConverted = Array.from(list);
  listConverted.forEach(item => item.remove());
  hideFilterIfNoItems();
} */

// document.querySelector('#clear').addEventListener('click', clearList);

function clearList1() {
  const items = document.querySelectorAll('ul li');
  items.forEach(item => { if (!item.classList.contains('btn-recur')) { item.remove() } });
  hideFilterIfNoItems();

  const itemsToClear = JSON.parse(localStorage.getItem('items'));

  let i = 0;
  while (itemsToClear[i] !== undefined) {   // DELETE NON-RECURRING ITEMS FROM LOCAL STORAGE
    if (itemsToClear[i].slice(0, 1) === '0') {
      itemsToClear.splice(i, 1);
      i--;  // PUSH INDEX BACK ONE POSITION AFTER REMOVING ITEM
    }
    i++;
  }
  localStorage.setItem('items', JSON.stringify(itemsToClear));
}
document.querySelector('#clear').addEventListener('click', clearList1);

function onNightDayModeStyle() {
  const body = document.querySelector('body');
  const recurs = document.querySelectorAll('ul li.btn-recur');
  if (body.style.backgroundColor === 'black') {
    body.style.backgroundColor = '#f5f5f5';
    body.style.color = 'black';
    document.querySelector('#clear').style.color = 'black';
    document.querySelector('#filter').style.color = 'black';
    if (recurs) {
      for (elem of recurs) {
        elem.style.backgroundColor = '#dedede';
        elem.style.borderColor = 'black';
      }
    }
  }
  else {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    document.querySelector('#clear').style.color = 'white';
    document.querySelector('#filter').style.color = 'white';
    if (recurs) {
      for (elem of recurs) {
        elem.style.backgroundColor = '#4d4d4d';
        elem.style.borderColor = 'white';
      }
    }
  }
}

document.querySelector('img').addEventListener('click', onNightDayModeStyle);

// ADD PRODUCTS VISUALLY IN THE LIST

function addVisualItem(e) {
  e.preventDefault();
  if (itemInput.value === null || itemInput.value === '') {
    alert('Fill in the item field first');
  }
  else {
    const isChecked = document.getElementById('checkbox').checked;
    showFilter();
    addShoppingItem(itemInput.value, isChecked);
  }
}

submitBtn.addEventListener('click', addVisualItem);

// FILTER PRODUCTS

function filterItems(e) {
  const items = document.querySelectorAll('ul li');
  items.forEach(element => {
    if (!(element.childNodes[0].nodeValue.toLowerCase().includes(e.target.value.toLowerCase()))) {
      element.classList.add('invisible');
    } else {
      element.classList.remove('invisible');
    }
  });
}

filterInput.addEventListener('input', filterItems);

// DELETE EACH PRODUCT

function removeShoppingItem(e) {
  const targetedItem = e.target.parentElement.parentElement;
  let isRecur;
  if (targetedItem.classList.contains('btn-recur')) {
    isRecur = '1';
  } else {
    isRecur = '0';
  }
  if (e.target.tagName === 'I') {
    const itemsFromStorage = JSON.parse(localStorage.getItem('items'));

    for (index in itemsFromStorage) {
      if ((itemsFromStorage[index].slice(1).toLowerCase() === targetedItem.textContent.toLowerCase()) &&
        (itemsFromStorage[index].slice(0, 1) === isRecur)) {
        itemsFromStorage.splice(index, 1);
        break;
      }
    }
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

    targetedItem.remove();
    hideFilterIfNoItems();
  }
}

document.querySelector('ul').addEventListener('click', removeShoppingItem);

// NO ITEMS ON SCREEN

function hideFilterIfNoItems() {
  const hasChild = ul.children.length > 0 ? true : false;
  if (!hasChild) {
    ul.classList.add('invisible');
    filterInput.classList.add('invisible');
    clearButton.classList.add('invisible');
  }
}

// UN-HIDE SOME ELEMENTS 

function showFilter() {
  ul.classList.remove('invisible');
  filterInput.classList.remove('invisible');
  clearButton.classList.remove('invisible');
}

// UN-HIDE SOME ELEMENTS IF NO ITEMS IN LIST

function showFilterIfItems() {
  const hasChild = ul.children.length > 0 ? true : false;
  if (hasChild) {
    showFilter();
  }
}

// ADD SHOPPING ITEM WITHOUT INSERTING TO MEMORY

function addShoppingItemFromStorage(item, recur) {
  const ul = document.querySelector('ul');
  const li = createListItem(item)

  if (recur) {
    li.classList.add('btn-recur');
    ul.insertAdjacentElement('afterbegin', li);
  } else {
    ul.appendChild(li);
  }
}

// LOADING ITEMS FROM LOCAL STORAGE

function loadItemsFromStorage() {
  const itemsToLoad = JSON.parse(localStorage.getItem('items'));
  if (itemsToLoad.length > 0) {
    for (elem of itemsToLoad) {
      if (elem.slice(0, 1) === '1') {
        addShoppingItemFromStorage(elem.slice(1), true);
      } else {
        addShoppingItemFromStorage(elem.slice(1), false);
      }
    }
    showFilter();
  }
}

// CHECK FOR DUPLICATE ITEM

function isDuplicate(itemName) {
  for (elem of document.querySelectorAll('ul li')) {
    if (elem.textContent.toLowerCase() === itemName.toLowerCase()) {
      alert('The item ' + elem.textContent + ' already exists.');
      return 1;
    }
  }
  return 0;
}

// CHECK UI FOR NIGHT MODE

function checkUiColors() {
  const body = document.querySelector('body');
  const recurs = document.querySelectorAll('ul li.btn-recur');
  if (body.style.backgroundColor === 'black') {
    body.style.color = 'white';
    document.querySelector('#clear').style.color = 'white';
    document.querySelector('#filter').style.color = 'white';
    if (recurs) {
      for (elem of recurs) {
        elem.style.backgroundColor = '#4d4d4d';
        elem.style.borderColor = 'white';
      }
    }
  } else {
    document.querySelector('#clear').style.color = 'black';
    document.querySelector('#filter').style.color = 'black';
    if (recurs) {
      for (elem of recurs) {
        elem.style.backgroundColor = '#dedede';
        elem.style.borderColor = 'black';
      }
    }
  }
}


loadItemsFromStorage();
showFilterIfItems();