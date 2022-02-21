// Selecting the elements
const btn = document.getElementById('reset');
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const rdButtons = document.getElementsByName('tip');
const tipPrice = document.querySelector('.tip-price');
const totalPrice = document.querySelector('.total-price');

//checking the costume input
function checkCostumeInput(e) {
  if (e.key !== 'Backspace') {
    //accept the just numbers and dot
    ![
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '.',
      'Backspace'
    ].includes(e.key) && e.preventDefault();

    //check the value is between 100 and 0
    if (
      parseFloat(this.textContent + e.key) < 0 ||
      parseFloat(this.textContent + e.key) > 100
    ) {
      e.preventDefault();
    }

    //prevent user from entering multiple dots
    this.textContent.includes('.') && e.key === '.' && e.preventDefault();

    //accept just two numbers after dot
    const val = this.textContent.split('.')[1] || '';
    if (val.length >= 2) {
      e.preventDefault();
    }
  }
}

function calc() {
  let perCent;
  let bill = parseFloat(billInput.value);
  let people = parseInt(peopleInput.value);

  //   get the perCent value
  rdButtons.forEach((rdBtn, idx) => {
    //   if the first five radio button we return the data attribute value
    if (idx !== 5 && rdBtn.checked === true) {
      perCent = parseFloat(rdBtn.dataset.tip);
    } else if (idx === 5 && rdBtn.checked === true) {
      // if the last one is checked we return the text content of his label
      perCent = parseFloat(rdBtn.nextElementSibling.textContent);
    }
  });

  //   calculation
  const tip = (perCent * bill) / 100 / people;
  const total = bill / people + tip;

  // set the result
  tipPrice.textContent = `$${tip.toFixed(2)}`;
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

function check(e) {
  //check if no radio button has been selected
  let noOneChecked = true;
  rdButtons.forEach((rd) => {
    if (rd.checked === true) {
      noOneChecked = false;
    }
  });

  //disable btn if one of the input is empty
  billInput.value === '' ||
  peopleInput.value === '' ||
  noOneChecked ||
  (this.id === 'people' && this.value < 1)
    ? (btn.disabled = true)
    : (btn.disabled = false);

  //check if people <1
  if (this.id === 'people') {
    const changeClass = this.value >= 1 ? 'remove' : 'add';
    document.querySelector('#people').classList[changeClass]('warning');
    document.querySelector('[for="people"]').classList[changeClass]('warning');
  }

  //stop typing if the character not number
  !['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(e.key) &&
    e.preventDefault();

  //prevent user from entering multiple dots
  this.value.includes('.') && e.key === '.' && e.preventDefault();
}

btn.addEventListener('click', calc);
billInput.addEventListener('keypress', check);
billInput.addEventListener('keyup', check);
peopleInput.addEventListener('keypress', check);
peopleInput.addEventListener('keyup', check);
// rdButtons[5].nextElementSibling.addEventListener('keyup', checkCostumeInput);
// rdButtons[5].nextElementSibling.addEventListener('keypress', checkCostumeInput);
// rdButtons[5].nextElementSibling.addEventListener('keydown', checkCostumeInput);
// rdButtons[5].nextElementSibling.addEventListener('change', checkCostumeInput);
['keypress', 'keyup', 'keydown', 'change'].forEach((listener) => {
  rdButtons[5].nextElementSibling.addEventListener(listener, checkCostumeInput);
});

rdButtons.forEach((rd) => rd.addEventListener('change', check));
window.onload = function () {
  // clear inputs and custom input
  [billInput, peopleInput, rdButtons[5].nextElementSibling].forEach(
    (element) => {
      try {
        element.value = '';
      } catch (e) {
        element.textContent = '';
      }
    }
  );

  //uncheck checked radio button
  rdButtons.forEach((rd) => (rd.checked = false));

  //disabled the button
  btn.disabled = true;
};
