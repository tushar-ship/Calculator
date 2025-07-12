const expressionDisplay = document.querySelector('.display .expression');
const resultDisplay = document.querySelector('.display .result');
let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay() {
  expressionDisplay.textContent = previousInput + (operator || '') + currentInput;
  resultDisplay.textContent = currentInput || '0';
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') compute();
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function compute() {
  if (!previousInput || !currentInput || !operator) return;
  let computation;
  const prev = parseFloat(previousInput);
  let curr = parseFloat(currentInput);

  // Handle percentage logic
  if (currentInput.includes('%')) {
    curr = prev * (curr / 100);
  }

  switch (operator) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '×':
      computation = prev * curr;
      break;
    case '÷':
      computation = prev / curr;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function handlePercent() {
  if (currentInput === '') return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (button.classList.contains('number')) {
      appendNumber(value);
    } else if (button.classList.contains('operator')) {
      chooseOperator(value);
    } else if (button.classList.contains('function')) {
      if (value === 'AC') clearAll();
      else if (value === '⌫') backspace();
      else if (value === '%') handlePercent();
    } else if (button.classList.contains('equal')) {
      compute();
    }
  });
});

updateDisplay();
