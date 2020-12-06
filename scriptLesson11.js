'use strict';

let start = document.querySelector('#start'),
    btnsPlus = document.getElementsByTagName('button'),
    incomePlus = btnsPlus[0],
    expensesPlus = btnsPlus[1],
    checkDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomesItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelector = document.querySelector('.period-select');


let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    addExpenses: [],
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expenses: {},
    start: function(){

        appData.budget = salaryAmount.value;
        appData.getIncome();
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelector.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addIncomeBlock: function(){
        let cloneIncomeItems = incomesItems[0].cloneNode(true);
        incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomesItems = document.querySelectorAll('.income-items');

        if(incomesItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
        incomesItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){

            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){

        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomeMonth: function(){

        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = +salaryAmount.value - appData.expensesMonth + appData.incomeMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 31);
    },
    getTargetMonth: function(){
        return Math.ceil(+targetAmount.value / appData.budgetMonth);
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelector.value; 
    }
};

salaryAmount.addEventListener('change', function(){
    if(salaryAmount.value !== ''){
        start.addEventListener('click', appData.start);
    }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelector.addEventListener('input', function(){
    let periodAmount = document.querySelector('#pA');
    periodAmount.textContent = periodSelector.value;
});
