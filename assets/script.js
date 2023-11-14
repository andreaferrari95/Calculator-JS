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
        let compuation 
        const prev = parseFloat(this.perviousOperand)
        const current = parseFloat(tjis.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+' :
                compuation = prev + current
                break
            case '-' :
                compuation = prev - current
                 break
            case '*' :
                compuation = prev * current
                break     
            case '÷' :
                compuation = prev / current
                break
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.perviousOperandTextElement.innerText = this.perviousOperand
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