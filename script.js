const ul = document.querySelector('ul');
const form = document.querySelector('#item-form');
const submitBtn = document.querySelector('#submitBtn');
const itemInput = document.querySelector('#item-input');
const filterInput = document.getElementById('filter');
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

function addShoppingItem(item, recur) {
  const ul = document.querySelector('ul');
  const a = item[0].toUpperCase() + item.slice(1).toLowerCase();
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(a));

  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  button.appendChild(icon);
  li.appendChild(button);


  if (recur) {
    li.classList.add('btn-recur');
    ul.insertAdjacentElement('afterbegin', li);
  } else {
    ul.appendChild(li);
  }

}

addShoppingItem('Brezels');
addShoppingItem('chOCoLAtE');

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
  hideItems();
} */

// document.querySelector('#clear').addEventListener('click', clearList);

function clearList1() {
  const items = document.querySelectorAll('ul li');
  items.forEach(item => { if (!item.classList.contains('btn-recur')) { item.remove() } });
  hideItems();
}
document.querySelector('#clear').addEventListener('click', clearList1);

function nightDayModeStyle() {
  const body = document.querySelector('body');

  if (body.style.backgroundColor === 'black') {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    document.querySelector('#clear').style.color = 'black';
  }
  else {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    document.querySelector('#clear').style.color = 'white';
  }
}

document.querySelector('img').addEventListener('dblclick', nightDayModeStyle);

// ADD PRODUCTS VISUALLY IN THE LIST

function addVisualItem(e) {
  e.preventDefault();
  if (itemInput.value === null || itemInput.value === '') {
    alert('Fill in the item field first');
  }
  else {
    const isChecked = document.getElementById('checkbox').checked;
    showItems();
    addShoppingItem(itemInput.value, isChecked);
  }
}

submitBtn.addEventListener('click', addVisualItem);

// FILTER PRODUCTS

function filterItems(e) {
  const items = document.querySelectorAll('ul li');
  console.log(e.target.value);
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
  if (e.target.tagName === 'I')
    e.target.parentElement.parentElement.remove();
  hideItems();
}

document.querySelector('ul').addEventListener('click', removeShoppingItem);

// NO ITEMS ON SCREEN

function hideItems() {
  const hasChild = ul.children.length > 0 ? true : false;
  if (!hasChild) {
    li.classList.add('invisible');
    ul.classList.add('invisible');
    filterInput.classList.add('invisible');
    clearButton.classList.add('invisible');
  }
}

function showItems() {
  li.classList.remove('invisible');
  ul.classList.remove('invisible');
  filterInput.classList.remove('invisible');
  clearButton.classList.remove('invisible');
}

