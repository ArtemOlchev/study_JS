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
    income: {},
    addExpenses: "",
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 0,
    expenses: {},
    checkNum: function(message){
        let n;
        do {
            n = +prompt(message);
        } while (!(!isNaN(parseFloat(n)) && isFinite(n)));
        return n;
    },
    checkStr: function(message){
        let str;
        do{
            str = prompt(message);
        }while (isNumber(Number(str)) || !str.trim());
        return str;
    },
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
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = appData.checkNum("Какой годовой процент у вашего депозита");
            appData.moneyDeposit = appData.checkNum("Сколько денег вы внесли в депозит");
        }
    },
    asking: function(){

        if(confirm("У вас есть дополнительный заработок?")){
            let itemIncome = appData.checkStr("Какой у вас дополнительный заработок?");
            let cashIncome = appData.checkNum("Сколько в месяц вы зарабатываете дополнительным заработком?");
            appData.income[itemIncome] = cashIncome;
        }
        appData.mission = +prompt("Сколько вы хотите заработать за какое-то время?");
        appData.addExpenses = (prompt("Перечислите возможные расходы за расчитываемый период ")).split(', ');

        for (let i = 0; i < appData.addExpenses.length; i++){
            appData.addExpenses[i] = (appData.addExpenses[i])[0].toUpperCase() + (appData.addExpenses[i]).substr(1);
        }

        console.log("Возможные расходы: " + appData.addExpenses.join(", "));
        
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        appData.getInfoDeposit();

        for(let i = 1; i <= 2; i++){
            appData.expenses[appData.checkStr("Введите " + i + "-ю статью расходов")] = appData.checkNum("Во сколько это обойдётся в месяц?");
        }

        appData.expensesMonth = appData.getExpensesMonth();
        console.log("Расходы за месяц " + appData.expensesMonth);
        appData.getBudget();
        console.log(appData.getTargetMonth(appData.mission, appData.expensesMonth, appData.budget));
        appData.getStatusIncome(appData.budgetDay);
    }
};

appData.asking();