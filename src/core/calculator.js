let a = '';
let b = '';
let sign = '';
let finish = false;

const MAX_LENGTH = 16;

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

function updateView(content) {
  view.textContent = content;

  const length = content.toString().length;
  const baseSize = 2;
  const minSize = 1;
  const viewContent = document.querySelector('.view_content');

  if (length <= 14) {
    viewContent.style.fontSize = `${baseSize}rem`;
  } else {
    const newSize = Math.max(minSize, baseSize - (length - 14) * 0.1);
    viewContent.style.fontSize = `${newSize}rem`;
  }
}

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  updateView(0);
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
      if (y === 0) {
        return 'Error';
      }
      return x / y;
    default:
      return b;
  }
}

function handleEqual() {
  if (!a || !sign || !b) return;

  const result = calculate(a, b, sign);

  if (result === 'Error') {
    alert('You cannot divide on 0');
    clearAll();
  } else {
    a = result.toString();
    b = '';
    sign = '';
    finish = true;
    updateView(a);
  }
}

function inputDigit(value) {
  if (value === '.') {
    if (b === '' && sign === '') {
      if (!a.includes('.')) {
        a = a === '' ? '0.' : a + '.';
        updateView(a);
        return;
      }
    } else if (a !== '' && sign !== '') {
      if (!b.includes('.')) {
        if (finish) {
          b = '0.';
          finish = false;
        } else {
          b = b === '' ? '0.' : b + '.';
        }
        updateView(b);
        return;
      }
    }
    return;
  }
  if (b === '' && sign === '') {
    if (a.length >= MAX_LENGTH) return;
    a += value;
    updateView(a);
  } else if (a !== '' && sign !== '' && finish) {
    b = value;
    finish = false;
    updateView(b);
  } else {
    if (b.length >= MAX_LENGTH) return;
    b += value;
    updateView(b);
  }
  console.log(a, b, sign);
}

function handleSpecial(value) {
  if (value === actionsEnum.TOGGLE_SIGN) {
    if (b && !finish) {
      b = (-parseFloat(b)).toString();
      updateView(b);
    } else if (a) {
      a = (-parseFloat(a)).toString();
      updateView(a);
    }
  }

  if (value === actionsEnum.PERCENT) {
    if (b && !finish) {
      b = (parseFloat(b) / 100).toString();
      updateView(b);
    } else if (a) {
      a = (parseFloat(a) / 100).toString();
      updateView(a);
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
      updateView(sign);
      return;
    }

    inputDigit(value);
  });
