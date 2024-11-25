const whiteCar = document.getElementById('white');
const redCar = document.getElementById('red');
const resultDiv = document.getElementById('result');
const headerTitle = document.querySelector('header h1');
const resetBtn = document.getElementById('resetar');
const accelerateBtn = document.getElementById('acelerar');
const decelerateBtn = document.getElementById('desacelerar');
const whiteCircle = document.getElementById('branco');
const redCircle = document.getElementById('vermelho');

let currentCar = null;
let currentCarColor = ''; // Armazena a cor do carro selecionado
let positionY = 0; // Posição vertical inicial do carro
const maxYPosition = -30; // Limite máximo para frente
const minYPosition = 30; // Limite mínimo para trás
let movementInterval = null; // Intervalo para movimento contínuo

// Função para selecionar um carro e mudar a cor de fundo
function selectCar(car, colorName, bgColor) {
  currentCar = car;
  currentCarColor = colorName;
  resultDiv.textContent = colorName;
  headerTitle.textContent = `Carro selecionado: ${colorName}`;
  document.body.style.backgroundColor = bgColor;
}

// Eventos de clique para selecionar os carros
whiteCar.addEventListener('click', () => selectCar(whiteCar, 'Branco', 'lightgray'));
redCar.addEventListener('click', () => selectCar(redCar, 'Vermelho', 'darkred'));

// Eventos de clique para selecionar pela cor no rodapé
whiteCircle.addEventListener('click', () => selectCar(whiteCar, 'Branco', 'lightgray'));
redCircle.addEventListener('click', () => selectCar(redCar, 'Vermelho', 'darkred'));

// Função para mover o carro automaticamente para frente
function startMovingForward() {
  if (currentCar) {
    stopMoving(); // Para qualquer movimento anterior
    movementInterval = setInterval(() => {
      if (positionY > maxYPosition) { // Verifica o limite superior
        positionY -= 1;
        currentCar.style.transform = `translateY(${positionY}px)`;
      }
    }, 30); // Ajuste a velocidade conforme necessário
  }
}

// Função para mover o carro automaticamente para trás
function startMovingBackward() {
  if (currentCar) {
    stopMoving(); // Para qualquer movimento anterior
    movementInterval = setInterval(() => {
      if (positionY < minYPosition) { // Verifica o limite inferior
        positionY += 1;
        currentCar.style.transform = `translateY(${positionY}px)`;
      }
    }, 30); // Ajuste a velocidade conforme necessário
  }
}

// Função para parar o movimento
function stopMoving() {
  clearInterval(movementInterval);
}

// Função para resetar a posição e o estado do carro
function reset() {
  stopMoving();
  if (currentCar) {
    positionY = 0; // Reseta a posição
    currentCar.style.transform = 'translateY(0)';
    currentCar = null; // Desseleciona o carro
    resultDiv.textContent = '?';
    headerTitle.textContent = 'Selecione a cor do carro';
    document.body.style.backgroundColor = 'black';
  }
}

// Eventos de clique para os botões
accelerateBtn.addEventListener('click', startMovingForward);
decelerateBtn.addEventListener('click', startMovingBackward);
resetBtn.addEventListener('click', reset);

// Eventos de teclado para controlar aceleração e desaceleração
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    startMovingForward();
  } else if (event.key === 'ArrowDown') {
    startMovingBackward();
  }
});
