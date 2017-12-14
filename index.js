let keys = document.querySelectorAll("#calculator span");
keys.forEach(el => {
  el.addEventListener("click", activated);
});
const operators = ["+", "-", "x", "÷"];
let decimalAdded = false;
let openCount = 0;

function activated(e) {
  let input = document.querySelector(".screen");
  let btnVal = this.innerHTML;
  let lastChar = input.innerHTML.slice(-1);
  if (input.innerHTML.length >= 30) {
    limitedChars(input, lastChar, btnVal);
  } else {
    if (btnVal === "C") {
      clear(input, lastChar, btnVal);
    } else if (btnVal === "=") {
      solve(input, lastChar, btnVal);
    } else if (operators.indexOf(btnVal) > -1) {
      operat(input, lastChar, btnVal);
    } else if (btnVal === ".") {
      decim(input, lastChar, btnVal);
    } else if (btnVal === "(") {
      openBrack(input, lastChar, btnVal);
    } else if (btnVal === ")") {
      closBrack(input, lastChar, btnVal);
    } else if (btnVal === "DEL") {
      deleteChar(input, lastChar, btnVal);
    } else {
      otherExceptions(input, lastChar, btnVal);
    }
    e.preventDefault();
  }
}

function limitedChars(input, screenLastChar, btnVal) {
  if (btnVal === "C") {
    input.innerHTML = "";
  } else if (btnVal === "DEL") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
  } else alert("Limit of charachters!");
}

function clear(input, screenLastChar, btnVal) {
  input.innerHTML = "";
}

function solve(input, screenLastChar, btnVal) {
  let equation = input.innerHTML;
  let lastChar = equation[equation.length - 1];
  equation = equation.replace(/x/g, "*").replace(/÷/g, "/");
  if (operators.indexOf(screenLastChar) > -1) {
    alert("Wrong input!");
  } else if (equation) {
    input.innerHTML = eval(equation);
  }
}

function operat(input, lastChar, btnVal) {
  if (lastChar === "(" && btnVal === "-") {
    input.innerHTML += btnVal;
    decimalAdded = false;
  } else if (
    lastChar === "(" ||
    lastChar === "." ||
    input.innerHTML === "-" ||
    (input.innerHTML[input.innerHTML.length - 2] === "(" &&
      input.innerHTML[input.innerHTML.length - 1] === "-" &&
      btnVal != "-") ||
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infinity" ||
    input.innerHTML === "-Infinity"
  ) {
    if (btnVal === "-") {
      input.innerHTML = "-";
    }
    return;
  } else if (input.innerHTML.length === 0 && btnVal === "-") {
    input.innerHTML += btnVal;
    decimalAdded = false;
  } else if (operators.indexOf(lastChar) > -1) {
    input.innerHTML = input.innerHTML.replace(/.$/, btnVal);
    decimalAdded = false;
  } else if (input.innerHTML != "") {
    input.innerHTML += btnVal;
    decimalAdded = false;
  }
}

function decim(input, lastChar, btnVal) {
  if (
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infiinity" ||
    input.innerHTML === "-Infinity"
  ) {
    input.innerHTML = btnVal;
    decimalAdded = true;
  } else if (lastChar === ")" || lastChar === ".") {
    return;
  } else if (decimalAdded === false) {
    input.innerHTML += btnVal;
    decimalAdded = true;
  }
}

function openBrack(input, lastChar, btnVal) {
  if (
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infiinity" ||
    input.innerHTML === "-Infinity" ||
    lastChar === "("
  ) {
    input.innerHTML = btnVal;
  } else if (input.innerHTML === "") {
    input.innerHTML += btnVal;
    openCount++;
  } else if (isNaN(lastChar) === false) {
    input.innerHTML += "";
  } else if (lastChar === ")") {
    input.innerHTML += "";
  } else {
    openCount++;
    input.innerHTML += btnVal;
  }
}

function closBrack(input, lastChar, btnVal) {
  if (
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infiinity" ||
    input.innerHTML === "-Infinity"
  ) {
    input.innerHTML = "";
  } else if (
    operators.indexOf(lastChar) > -1 ||
    openCount <= 0 ||
    lastChar === "("
  ) {
    return;
  } else if (openCount > 0) {
    input.innerHTML += btnVal;
    openCount--;
  }
}

function deleteChar(input, lastChar, btnVal) {
  if (lastChar === "(") {
    openCount--;
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
  } else if (lastChar === ")") {
    openCount++;
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
  } else if (
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infiinity" ||
    input.innerHTML === "-Infinity"
  ) {
    return;
  } else if (lastChar === ".") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
    decimalAdded = false;
  } else if (operators.indexOf(lastChar) > -1) {
    decimalAdded = true;
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);

    if (input.innerHTML.search(".") === -1) {
      decimalAdded = false;
    }
  } else {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
  }
}

function otherExceptions(input, lastChar, btnVal) {
  if (lastChar === ")") {
    return;
  } else if (
    input.innerHTML === "NaN" ||
    input.innerHTML === "Infinity" ||
    input.innerHTML === "-Infinity"
  ) {
    input.innerHTML = btnVal;
  } else input.innerHTML += btnVal;
}
