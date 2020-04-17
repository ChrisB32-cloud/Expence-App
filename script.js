// 1 start
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 2
// const dummyTransactions = [
//   { id: 1, text: 'flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

// 28
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// 3
// let transactions = dummyTransactions;

// 29
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// 18 Add transaction
function addTransaction(e) {
  e.preventDefault();

  // 19
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add text and amount');
  } else {
    // 20
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value // <--- + sign will turn string into number
    };
    // 22
    transactions.push(transaction);
    // 23
    addTransactionDOM(transaction);
    // 24
    updateValues();
    // 30
    updateLocalStorage();
    // 25
    text.value = '';
    amount.value = '';
  }
}

// 21 Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// 4 Add transactionns to DOM list
function addTransactionDOM(transaction) {
  // 5 Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // 6 Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // 7
  item.innerHTML = `        
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${
          transaction.id
        })">x</button>
    `; // 26 add onclick for delete button

  // 8
  list.appendChild(item);
}

// 11 Update the balance income and expence
function updateValues() {
  //12
  const amounts = transactions.map(transaction => transaction.amount);

  // 14
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // 15
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // 16
  const expence = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expence}`;
}

// 27 Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  // 31
  updateLocalStorage();

  init();
}

// 29 Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactionns', JSON.stringify(transactions));
}

// 9 Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  // 13
  updateValues();
}

// 10
init();

// 17
form.addEventListener('submit', addTransaction);
