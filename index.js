const numberButtons = document.querySelectorAll('[data-numbers]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousTextArea = document.querySelector('[data-previous-value]')
const currentTextArea = document.querySelector('[data-current-value]')

class Calculator {

  name = "suhumar";

  constructor (previousTextArea , currentTextArea){

    console.log(this)
    this.previousTextArea = previousTextArea;
    this.currentTextArea = currentTextArea;
    this.clear();
  }
  clear(){
    this.currentTextOperant = ''
    this.previousTextOperant = ''
    this.operation = undefined
  }
  delete(){
    console.log(this.currentTextOperant)
    this.currentTextOperant = this.currentTextOperant.toString().slice(0, -1);
   // this.currentTextOperant = this.currentTextOperant.slice(0, -1);
    //this.currentTextOperant = calculation
  }
  appendNumber(number){
  this.currentTextOperant = this.currentTextOperant.toString() + number.toString();
  }

  chooseOperator(operator){
   if ( this.currentTextOperant === '') return
  // if (this.previousTextOperant === ''){
    // this.calculate();
   //}
  this.operation = operator
  this.previousTextOperant = this.currentTextOperant
  this.currentTextOperant = ''
  }
  calculate(){
    const prevvalue = parseFloat(this.previousTextOperant);
    const currentvalue = parseFloat(this.currentTextOperant);
    let calculation
    if (isNaN(prevvalue) || isNaN(currentvalue)) return
  
    switch (this.operation) {
      case '+':
        calculation = prevvalue + currentvalue
        break;
        case '-':
        calculation = prevvalue - currentvalue
        break;
        case '*':
        calculation = prevvalue * currentvalue
        break;
        case '÷':
        calculation = prevvalue / currentvalue
        break;
        case '%':
        calculation = prevvalue % currentvalue
        break;
      default:
        return 
    }
    console.log(calculation)
   this.currentTextOperant = calculation
   this.operation = undefined
   this.previousTextOperant = ''
   
  }
  getComma(param){
    if(param === '') return ''
  const floatNum = parseFloat(param)
  const val =  floatNum.toLocaleString('en')
  return val
  }
  updateDisplay(){
  //console.log(this.getComma(this.currentTextOperant))
  this.currentTextArea.innerText = this.getComma(this.currentTextOperant) 
  if(this.operation !== undefined){
    console.log('working')
  this.previousTextArea.innerText =`${this.getComma(this.previousTextOperant)} ${this.operation}`
}else this.previousTextArea.innerText = this.previousTextOperant
}
}
const calculator = new Calculator(previousTextArea, currentTextArea)

numberButtons.forEach(button => {
  button.addEventListener('click', () =>{
   calculator.appendNumber(button.innerText)
   calculator.updateDisplay()
  }); 
});
operatorButtons.forEach(button => {
  button.addEventListener('click', () =>{
   calculator.chooseOperator(button.innerText)
   calculator.updateDisplay()
  });  
});
allClearButton.addEventListener('click', () =>{
  calculator.clear();
  calculator.updateDisplay();
});
equalsButton.addEventListener('click', ()=> {
  calculator.calculate();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', ()=> {
  calculator.delete();
  calculator.updateDisplay();
});
