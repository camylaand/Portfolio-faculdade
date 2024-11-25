const cartas = document.querySelectorAll('.carta');
let primeiraCarta = null;
let segundaCarta = null;
let bloquearTabuleiro = false;
let tentativas = 0;

function virarCarta() {
    if (bloquearTabuleiro || this === primeiraCarta) return;

    this.classList.add('virada');

    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    bloquearTabuleiro = true;
    verificarPar();
}

function verificarPar() {
    const ehPar = primeiraCarta.querySelector('.carta-frente').src === segundaCarta.querySelector('.carta-frente').src;

    if (ehPar) {
        desativarCartas();
    } else {
        desvirarCartas();
    }
    atualizarTentativas();
}

function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarTabuleiro();
}

function desvirarCartas() {
    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        resetarTabuleiro();
    }, 1000);
}

function atualizarTentativas() {
    tentativas++;
    document.querySelector('.contador-tentativas').textContent = `Tentativas: ${tentativas}`;
}

function resetarTabuleiro() {
    [primeiraCarta, segundaCarta, bloquearTabuleiro] = [null, null, false];
}

document.querySelector('.botao-reiniciar').addEventListener('click', () => {
    cartas.forEach(carta => carta.classList.remove('virada'));
    tentativas = 0;
    document.querySelector('.contador-tentativas').textContent = 'Tentativas: 0';
    embaralhar();
    cartas.forEach(carta => carta.addEventListener('click', virarCarta));
    resetarTabuleiro();
});

cartas.forEach(carta => carta.addEventListener('click', virarCarta));

function embaralhar() {
    cartas.forEach(carta => {
        const posicaoAleatoria = Math.floor(Math.random() * cartas.length);
        carta.style.order = posicaoAleatoria;
    });
}
embaralhar();
