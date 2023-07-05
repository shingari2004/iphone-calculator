const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const valueEl = document.querySelector('.value')
const calcEl = document.querySelector('.calculate-container')

const acEl = document.querySelector('.ac')
const pmEl = document.querySelector('.pm')
const percentEl = document.querySelector('.percent')

const additionEl = document.querySelector('.addition')
const subtractionEl = document.querySelector('.subtraction')
const multiplicationEl = document.querySelector('.multiplication')
const divisionEl = document.querySelector('.division')
const equalEl = document.querySelector('.equal')

const decimalsEl = document.querySelector('.decimal')
const number1El = document.querySelector('.number-1')
const number2El = document.querySelector('.number-2')
const number3El = document.querySelector('.number-3')
const number4El = document.querySelector('.number-4')
const number5El = document.querySelector('.number-5')
const number6El = document.querySelector('.number-6')
const number7El = document.querySelector('.number-7')
const number8El = document.querySelector('.number-8')
const number9El = document.querySelector('.number-9')
const number0El = document.querySelector('.number-0')

const numberElArray = [number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El];

valueEl.style.f

// variables

let valueStrInMemory = null;
let operatorInMemory = null;

//functions 



const getValueAsStr = ()=>{
    const currentValueStr = valueEl.textContent;
    return currentValueStr.split(',').join('');
}

const getValueAsNumber = ()=>{
    return parseFloat(getValueAsStr());
}

const setStrAsValue =(valueStr) =>{
    if(valueStr[valueStr.length-1]=='.'){
        valueEl.textContent += '.';
        return;
    }
    minSize(valueStr);

    const [wholeNumberStr , decimalStr] = valueStr.split('.');
    
    if(decimalStr){
        valueEl.textContent = parseFloat(wholeNumberStr).toLocaleString() + '.' + decimalStr ; 
    }
    else{
        valueEl.textContent = parseFloat(wholeNumberStr).toLocaleString();
    }

};


const handleNumberClick = (numStr)=>{
    const currentValueStr = getValueAsStr();
    if(currentValueStr =="0"){
        setStrAsValue(numStr);
    }
    else{
        setStrAsValue(currentValueStr + numStr);
    }
}

const minSize = (valueStr)=>{
    if(valueStr.length > 6){
        valueEl.style.fontSize = "50px";
        calcEl.style.transform = "translateY(29px)";
    }
    else {
        valueEl.style.fontSize = "75px";
        calcEl.style.transform = "translateY(0px)";
    }
}


const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNumber();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
      newValueNum = valueNumInMemory + currentValueNum;
    } else if (operatorInMemory === 'subtraction') {
      newValueNum = valueNumInMemory - currentValueNum;
    } else if (operatorInMemory === 'multiplication') {
      newValueNum = valueNumInMemory * currentValueNum;
    } else if (operatorInMemory === 'division') {
      newValueNum = valueNumInMemory / currentValueNum;
    }
  
    return newValueNum.toString();
  };
  
const handleOperatorClick = (operation) => {

    const currentValueStr = getValueAsStr();
  
    if (!valueStrInMemory) {
      valueStrInMemory = currentValueStr;
      operatorInMemory = operation;
      setStrAsValue('0');
      return;
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
  };



//add event listeners to operators

additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
  });
  subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
  });
  multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
  });
  divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
  });
  equalEl.addEventListener('click', () => {
    if (valueStrInMemory) {
      setStrAsValue(getResultOfOperationAsStr());
      valueStrInMemory = null;
      operatorInMemory = null;
    }
  });

//add event listeners to functions



acEl.addEventListener('click' , () =>{
    setStrAsValue('0');
})

pmEl.addEventListener('click' , () =>{
    const currentValueNum = getValueAsNumber();
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
      }
      if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
      } else {
        setStrAsValue(currentValueStr.substring(1));
      }
})

percentEl.addEventListener('click' , () =>{
    const currentValueNum = getValueAsNumber();
    const newValueNum = currentValueNum/100;
    setStrAsValue(newValueNum.toString());
})


//add event listeners to numbers and decimal

for(let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click',() =>{
        handleNumberClick(i.toString());
    })
}


decimalsEl.addEventListener('click',() =>{
    const currentValueStr = getValueAsStr();
    if(!currentValueStr.includes('.')){
        setStrAsValue(currentValueStr + '.');
        valueEl.textContent = currentValueStr + '.';
    }
});

// minimum keywords







//get time

let updateTime = () => {

    const currentTime = new Date();
    let currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    if(currentHours >12){
        currentHours -= 12;
    }
    hourEl.textContent = currentHours.toString();
    minuteEl.textContent = currentMinutes.toString().padStart(2 , '0');
}

setInterval(updateTime,1000);
updateTime();