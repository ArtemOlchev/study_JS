'use strict';

let money = +prompt("Введите ваш месячный доход:");
console.log("Месячный доход: " + money);

let mission = +prompt("Сколько вы хотите заработать за какое-то время?");
console.log("Цель заработать: " + mission);

let addExpenses = (prompt("Перечислите возможные расходы за расчитываемый период через запятую")).split(',').join(', ');
console.log("Возможные расходы: " + addExpenses);

let deposit = confirm("Есть ли у вас депозит в банке?") ? "Депозит есть" : "Депозита нет";

let expenses1 = prompt("Введите 1-ю обязательную статью расходов:");
let amount1 = +prompt("Во сколько это обойдётся в месяц?");
console.log("Первая обязательная статья расходов: " + expenses1 + " - это обойдётся в " + amount1 + " рублей");

let expenses2 = prompt("Введите 2-ю обязательную статью расходов:");
let amount2 = +prompt("Во сколько это обойдётся в месяц?");
console.log("Вторая обязательная статья расходов: " + expenses2 + " - это обойдётся в " + amount2 + " рублей");

let budgetMonth = amount1 + amount2; 
console.log("Бюджет на месяц: " + budgetMonth);

let timeToMission = Math.ceil(mission / (money - budgetMonth));
console.log("Цель будет достигнута за: " + timeToMission + " месяцев");

let budgetDay = Math.floor(budgetMonth / 31);
console.log("Бюджет на день: " + budgetDay);

if((budgetDay >= 0) & (budgetDay < 600)){
    console.log("К сожалению у вас уровень дохода ниже среднего.");
} else if((budgetDay >= 600) & (budgetDay < 1200)){
    console.log("У вас средний уровень дохода");
} else if(budgetDay >= 1200){
    console.log("У вас высокий уровень дохода!");
}