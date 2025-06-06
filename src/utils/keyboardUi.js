const keyboardContainer = document.querySelector('.keyboard_container');

const buttons = [
  '1',
  '2',
  '3',
  '/',
  '4',
  '5',
  '6',
  '*',
  '7',
  '8',
  '9',
  '-',
  '+/-',
  '0',
  '.',
  '+',
  'C',
  '=',
  'AC',
];

export function getKeyBoard() {
  buttons.forEach(value => {
    const btn = document.createElement('button');
    btn.textContent = value;
    btn.className = 'keyboard_button';
    btn.dataset.value = value;
    keyboardContainer.appendChild(btn);
  });
}
