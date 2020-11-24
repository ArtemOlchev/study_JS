'use strict';

function getExpensesMonth(a, b){
    return a + b;
}

function getAcumuletedMonth(income, expen){
    return income - expen;
}

function getTargetMonth(mis, acumMonth){
    return Math.ceil(mis / acumMonth);
}

function showTypeOf(variable){
    console.log(typeof(variable) + ": " + variable);
}

function getStatusIncome(budDay){
    if((budDay >= 0) & (budDay < 600)){
        console.log("К сожалению у вас уровень дохода ниже среднего.");
    } else if((budDay >= 600) & (budDay < 1200)){
        console.log("У вас средний уровень дохода");
    } else if(budDay >= 1200){
        console.log("У вас высокий уровень дохода!");
    }
}


let money = +prompt("Введите ваш месячный доход:");

let income = prompt("Введите ваш вид заработка:");

let mission = +prompt("Сколько вы хотите заработать за какое-то время?");

let addExpenses = (prompt("Перечислите возможные расходы за расчитываемый период через запятую")).split(',').join(', ');
console.log("Возможные расходы: " + addExpenses);

let deposit = confirm("Есть ли у вас депозит в банке?"); 

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt("Введите 1-ю обязательную статью расходов:");
let amount1 = +prompt("Во сколько это обойдётся в месяц?");
console.log("Первая обязательная статья расходов: " + expenses1 + " - это обойдётся в " + amount1 + " рублей");

let expenses2 = prompt("Введите 2-ю обязательную статью расходов:");
let amount2 = +prompt("Во сколько это обойдётся в месяц?");
console.log("Вторая обязательная статья расходов: " + expenses2 + " - это обойдётся в " + amount2 + " рублей");
console.log("Месячный бюджет составляет: " + getExpensesMonth(amount1, amount2));

let acumuletMonth = getAcumuletedMonth(money, getExpensesMonth(amount1, amount2));

console.log("Вы достигнете цели через " + getTargetMonth(mission, acumuletMonth) + " месяцев");

let budgetDay = (money - acumuletMonth) / 31;

getStatusIncome(budgetDay);


