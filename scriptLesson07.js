'use strict';

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function start(){
    let mon;
    while (!isNumber(mon)){
        mon = +prompt("Введите ваш месячный доход:");
    }
    
    return mon;
}

function cost(){
    let mon;
    while (!isNumber(mon)){
        mon = +prompt("Во сколько это обойдётся в месяц?");
    }
    
    return mon;
}



let money = start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    mission: 0,
    expenses: {},
    getExpensesMonth: function(a, b){
        let sum = 0;
        for (let key in appData.expenses){
            sum += appData.expenses[key];
        }
        return sum;
    },
    getBudget: function(){
        appData.budgetMonth = appData.expensesMonth;
        appData.budgetDay = appData.expensesMonth / 31;
    },
    getTargetMonth: function(mis, expens, income){
        return Math.ceil(mis / (income - expens));
    },
    getStatusIncome: function(budDay){
        if((budDay >= 0) & (budDay < 600)){
            console.log("К сожалению у вас уровень дохода ниже среднего.");
        } else if((budDay >= 600) & (budDay < 1200)){
            console.log("У вас средний уровень дохода");
        } else if(budDay >= 1200){
            console.log("У вас высокий уровень дохода!");
        }
    },
    asking: function(){
        let income = prompt("Введите ваш вид заработка:");
            appData.mission = +prompt("Сколько вы хотите заработать за какое-то время?");
        let addExpenses = (prompt("Перечислите возможные расходы за расчитываемый период ")).split(',').join(', '),
            deposit = confirm("Есть ли у вас депозит в банке?");
        for(let i = 1; i <= 2; i++){
            appData.expenses[prompt("Введите " + i + "-ю статью расходов")] = cost();
        }

        appData.expensesMonth = appData.getExpensesMonth();
        console.log("Расходы за месяц" + appData.expensesMonth);
        appData.getBudget();
        console.log(appData.getTargetMonth(appData.mission, appData.expensesMonth, appData.budget));
        appData.getStatusIncome(appData.budgetDay);
    }
};

appData.asking();