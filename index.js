var keys = document.querySelectorAll("#calculator span");
var operators = ["+", "-", "x", "÷"];
var decimalAdded = false;
var openBrack = false;
var openCount = 0;
var numbersIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
for (var i = 0; i < keys.length; i++) {
  keys[i].onclick = function(e) {
    debugger;
    var input = document.querySelector(".screen");
    var inputVal = input.innerHTML;
    var btnVal = this.innerHTML;
    if (input.innerHTML.length >= 30) {
      if (btnVal === "C") {
        input.innerHTML = "";
      } else if (btnVal === "DEL") {
        input.innerHTML = input.innerHTML.substring(
          0,
          input.innerHTML.length - 1
        );
      } else alert("Limit of charachters!");
    } else {
      if (btnVal === "C") {
        input.innerHTML = "";
      } else if (btnVal === "=") {
        var equation = inputVal;
        var lastChar = equation[equation.length - 1];
        equation = equation.replace(/x/g, "*").replace(/÷/g, "/");
        if (operators.indexOf(lastChar) > -1 || lastChar === ".") {
          equation = equation.replace(/.$/, "");
        }
        if (equation) {
          input.innerHTML = eval(equation);
        }
      } else if (operators.indexOf(btnVal) > -1) {
        var lastChar = inputVal[inputVal.length - 1];
        if (lastChar === ".") {
          return;
        } else if (input.innerHTML === "-") {
          return;
        } else if (input.innerHTML === "NaN") {
          input.innerHTML =
            btnVal === "-" ? (input.innerHTML = "-") : (input.innerHTML = "");
        } else if (
          input.innerHTML === "Infinity" ||
          input.innerHTML === "-Infinity"
        ) {
          input.innerHTML =
            btnVal === "-" ? (input.innerHTML = "-") : (input.innerHTML = "");
        } else if (input.innerHTML != "") {
          input.innerHTML += btnVal;
        } else if (inputVal.length === 0 && btnVal === "-") {
          input.innerHTML += btnVal;
        }
        if (operators.indexOf(lastChar) > -1 && input.innerHTML.length > 1) {
          input.innerHTML = inputVal.replace(/.$/, btnVal);
        }
      } else if (btnVal === ".") {
        var lastChar = inputVal[inputVal.length - 1];
        if (lastChar === ")" || lastChar === ".") {
          return;
        } else if (input.innerHTML === "Infinity") {
          input.innerHTML = "";
        } else if (operators.indexOf(lastChar) > -1) {
          return;
        } else if (!decimalAdded && inputVal.length > 0) {
          input.innerHTML += btnVal;
          decimalAdded = true;
        }
      } else if (btnVal === "(") {
        var lastChar = input.innerHTML[inputVal.length - 1];
        if (input.innerHTML === "") {
          input.innerHTML += btnVal;
          openCount++;
        } else if (isNaN(lastChar)===false) {
          input.innerHTML += "";
        } else if (lastChar === ")") {
          input.innerHTML += "";
        } else {
          openCount++;
          input.innerHTML += btnVal;
        }
      } else if (btnVal === ")") {
        var lastChar = input.innerHTML[inputVal.length - 1];
        if (openCount <= 0) {
          input.innerHTML += "";
        } else if (lastChar === "(") {
          input.innerHTML += "";
        } else if (openCount > 0) {
          input.innerHTML += btnVal;
          openCount--;
        }
      } else if (btnVal === "DEL") {
        if (
          input.innerHTML === "NaN" ||
          input.innerHTML === "Infiinity" ||
          input.innerHTML === "-Infinity"
        ) {
          input.innerHTML = "";
        } else {
          input.innerHTML = input.innerHTML.substring(
            0,
            input.innerHTML.length - 1
          );
        }
      } else {
        if (input.innerHTML === "Infinity") {
          input.innerHTML = "";
        }
        input.innerHTML += btnVal;
      }
      e.preventDefault();
    }
  };
}
