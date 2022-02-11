const numbersContainer = document.querySelector(".calculator__numbers");
const resultElement = document.querySelector(".calculator__result");
const add = document.querySelector(".add");
const sub = document.querySelector(".sub");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");
const equals = document.querySelector(".equals");
const remove = document.querySelector(".delete");
const reset = document.querySelector(".reset");

let value = "";
let isCharPlaced = false;

const operations = [
    { element: add, char: '+' },
    { element: sub, char: "-" },
    { element: multiply, char: "x" },
    { element: divide, char: "÷" },
]

const isOperationChar = txt => /[-,+, x, ÷]/.test(txt);

const createNumberButton = ( number ) => {
    const el = document.createElement("button");
    el.classList.add("calculator__button", number);
    el.innerText = number;

    el.addEventListener("click", () => addValue(number));

    return el;
}

const addNumberButtons = () => {
    for(let i = 1; i <= 11; i++){
        if(i == 10) numbersContainer.appendChild(createNumberButton(0));
        else if(i == 11) numbersContainer.appendChild(createNumberButton("."));
        else numbersContainer.appendChild(createNumberButton(i));
    }
}

const addValue = ( txt ) => {
    value += txt
    resultElement.innerHTML = value;
}

const calculate = () => {
    if(!(/[-,+, x, ÷]/.exec(value)))
        return;

    const char = /[-,+, x, ÷]/.exec(value)[0];

    let [ firstNumber, secondNumber ] = value.split(char);
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    switch(char){
        case "+":
            value = firstNumber + secondNumber;
            break;
        case "-":
            value = firstNumber - secondNumber;
            break;
        case "x":
            value = firstNumber * secondNumber;
            break;
        case "÷":
            value = firstNumber / secondNumber;
            break;
    }

    value = value.toString();
    resultElement.innerHTML = value;
    isCharPlaced = false;
}

operations.forEach(({ element, char }) => {
    element.addEventListener("click", () => {
        const lastChar = value.charAt(value.length - 1);

        if(isOperationChar(lastChar)) return;

        if(!isCharPlaced){
            addValue(`${char}`);
            isCharPlaced = true;

            return;
        }

        calculate();
        addValue(char);
        isCharPlaced = true;
    })
})

reset.addEventListener("click", () => {
    isCharPlaced = false;
    value = "";
    resultElement.innerText = value;
})

remove.addEventListener("click", () => {
    const lastChar = value.charAt(value.length - 1);

    value = value.slice(0, -1);
    resultElement.innerText = value;

    if(isOperationChar(lastChar)) isCharPlaced = false;
})

equals.addEventListener("click", calculate);

addNumberButtons();



