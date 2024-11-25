var caracter = ""
var auxiliar = ""
var display = document.getElementById("display")
display.innerHTML = "0"

function add(caracter){
    auxiliar += caracter;
    display.innerHTML = auxiliar;
}

function clearDisplay() {
    caracter = "";
    auxiliar = "";
    display.innerHTML = "";
}

function calculate(){
    auxiliar = eval(auxiliar);
    display.innerHTML = auxiliar
}

function backspace() {
    auxiliar = auxiliar.slice(0, -1)
   display.innerHTML = auxiliar;
}