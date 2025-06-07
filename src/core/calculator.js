let a = '';
let b = '';
let sign = '';
let finish = false;

const actionsEnum = Object.freeze({
  DIVIDE: '/',
  MULTIPLY: '*',
  SUBTRACT: '-',
  TOGGLE_SIGN: '+/-',
  ADD: '+',
  PERCENT: '%',
});

const actions = Object.values(actionsEnum);
const view = document.querySelector('.view_container p');

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  view.textContent = 0;
}

function calculate(a, b, sign) {
  const x = +a;
  const y = +b;

  switch (sign) {
    case actionsEnum.ADD:
      return x + y;
    case actionsEnum.SUBTRACT:
      return x - y;
    case actionsEnum.MULTIPLY:
      return x * y;
    case actionsEnum.DIVIDE:
      if (y === 0) return 'Error';
      return x / y;
    default:
      return b;
  }
}

function handleEqual() {
  if (!a || !sign || !b) return;

  const result = calculate(a, b, sign);

  if (result === 'Error') {
    view.textContent = 'Error';
    clearAll();
  } else {
    a = result.toString();
    b = '';
    sign = '';
    finish = true;
    view.textContent = a;
  }
}

function inputDigit(value) {
  if (b === '' && sign === '') {
    a += value;
    view.textContent = a;
  } else if (a !== '' && sign !== '' && finish) {
    b = value;
    finish = false;
    view.textContent = b;
  } else {
    b += value;
    view.textContent = b;
  }
}

function handleSpecial(value) {
  if (value === actionsEnum.TOGGLE_SIGN) {
    if (b && !finish) {
      b = (-parseFloat(b)).toString();
      view.textContent = b;
    } else if (a) {
      a = (-parseFloat(a)).toString();
      view.textContent = a;
    }
  }

  if (value === actionsEnum.PERCENT) {
    if (b && !finish) {
      b = (parseFloat(b) / 100).toString();
      view.textContent = b;
    } else if (a) {
      a = (parseFloat(a) / 100).toString();
      view.textContent = a;
    }
  }
}

document
  .querySelector('.keyboard_container')
  .addEventListener('click', event => {
    const btn = event.target;

    if (!btn.classList.contains('keyboard_button') || !btn.dataset.value)
      return;

    const value = btn.dataset.value;

    if (value === 'AC') {
      clearAll();
      return;
    }

    if (value === '=') {
      handleEqual();
      return;
    }
    if (value === actionsEnum.TOGGLE_SIGN || value === actionsEnum.PERCENT) {
      handleSpecial(value);
      return;
    }

    if (actions.includes(value)) {
      sign = value;
      view.textContent = sign;
      return;
    }

    inputDigit(value);
  });
