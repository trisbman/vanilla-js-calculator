class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement; // reference to HTMl Obj
    this.previousOperandTextElement = previousOperandTextElement; // reference to HTMl Obj
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
    this.afterCompute = false;
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }
  delete() {
    if (!this.currentOperand) return;
    this.currentOperand = this.currentOperand.toString();
    this.currentOperand = this.currentOperand.split("");
    this.currentOperand.pop();
    this.currentOperand = this.currentOperand.join("");
  }
  appendNumber(number) {
    if (number === "0" && !this.currentOperand) return;
    if (number === "." && this.currentOperand.includes(".")) return;
    this.afterCompute ? this.clear() : null;
    this.afterCompute = false;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (!this.currentOperand) return;
    if (!this.operation) {
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
    this.compute(true);
    this.afterCompute = false;
  }
  compute(operation = false) {
    if (!this.operation || !this.currentOperand) return;
    switch (this.operation) {
      case "+":
        this.currentOperand =
          parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
        break;
      case "-":
        this.currentOperand =
          parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
        break;
      case ":":
        this.currentOperand =
          parseFloat(this.previousOperand) / parseFloat(this.currentOperand);
        break;
      case "*":
        this.currentOperand =
          parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
        break;
      default:
        break;
    }
    if (!operation) {
      this.previousOperand = "";
      this.operation = "";
      this.afterCompute = true;
      return;
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  getDisplayNumber(number) {
    return number;
  }
  updateDisplay() {
    this.currentOperand = this.currentOperand.toString();
    if (this.currentOperand.length >= 12) {
      const adaptiveFontSize = 36 / this.currentOperand.length;
      this.currentOperandTextElement.style.fontSize =
        adaptiveFontSize.toString() + "rem";
    } else {
      this.currentOperandTextElement.style.fontSize = "3.5rem";
    }
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    this.previousOperandTextElement.innerText =
      this.previousOperand + (this.operation || "");
  }
}

const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear-all]");
const equalsButton = document.querySelector("[data-equals]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement
);

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

operationButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
);
