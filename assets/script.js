class Calculator {
    constructor(perviousOperandTextElement, currentOperandTextElement) {
        this.perviousOperandTextElement = perviousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.perviousOperand = ''
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.perviousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.perviousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation;
        const prev = parseFloat(this.perviousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+' :
                computation = prev + current
                break;
            case '-' :
                computation = prev - current
                 break;
            case '*' :
                computation = prev * current
                break;   
            case '÷' :
            case '/' :
                computation = prev / current
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined
        this.perviousOperand = this.currentOperand;
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.perviousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.perviousOperand)} ${this.operation}`
        } else {
            this.perviousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const perviousOperandTextElement = document.querySelector('[data-previousOperand]')
const currentOperandTextElement = document.querySelector('[data-currentOperand]')


const calculator = new Calculator(perviousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (/[\d.]/.test(key)) {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calculator.chooseOperation(key);
        calculator.updateDisplay();
    } else if (key === 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (key === 'Escape' || key === 'c') {
        calculator.clear();
        calculator.updateDisplay();
    } else if (key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
});