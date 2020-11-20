//1)

let money = 20000;
let income = 5000;
let addExpenses = "еда, Интернет, БЕНЗИН, обслуживание авто, плата за общежитие";
let deposit = true;
let mission = 100000;
let period = 10;

//2)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log((addExpenses.toLowerCase()).split(", "));

let budgetDay = 500;
console.log(budgetDay);