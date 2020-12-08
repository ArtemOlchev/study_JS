'use strict';

let startBtn = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    btnsPlus = document.getElementsByTagName('button'),
    incomePlus = btnsPlus[0],
    expensesPlus = btnsPlus[1],
    checkDeposit = document.querySelector('#deposit-check'),
    checkmarkDeposit = document.querySelector('.deposit-checkmark'),
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

        salaryAmount.disabled = true;
        incomesItems.forEach(function(item){
            item.querySelector('.income-title').disabled = true;
            item.querySelector('.income-amount').disabled = true;
        });
        incomePlus.disabled = true;
        additionalIncomeItem[0].disabled = true;
        additionalIncomeItem[1].disabled = true;

        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').disabled = true;
            item.querySelector('.expenses-amount').disabled = true;
        });
        expensesPlus.disabled = true;

        additionalExpensesItem.disabled = true;
        checkDeposit.disabled = true;
        targetAmount.disabled = true;

        console.log(checkDeposit.value);


        startBtn.style.display = 'none';
        cancel.style.display = 'block';


    },


    cancel: function(){
        appData.budget = 0;
        appData.income = {};
        appData.addIncome = [];
        appData.addExpenses = [];
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;
        appData.incomeMonth = 0;
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.expenses = {};

        salaryAmount.disabled = false;
        salaryAmount.value = '';
        incomesItems.forEach(function(item, i){
            item.querySelector('.income-title').disabled = false;
            item.querySelector('.income-amount').disabled = false;
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = '';
        });
        incomePlus.style.display = 'block';

        for (let i = 1; i < incomesItems.length; i++){
            incomesItems[i].remove();
        }

        incomePlus.disabled = false;
        additionalIncomeItem[0].disabled = false;
        additionalIncomeItem[1].disabled = false;
        additionalIncomeItem[0].value = '';
        additionalIncomeItem[1].value = '';

        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').disabled = false;
            item.querySelector('.expenses-amount').disabled = false;
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';
        });
        expensesPlus.style.display = 'block';

        for (let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
        }
        expensesPlus.disabled = false;

        additionalExpensesItem.disabled = false;
        additionalExpensesItem.value = '';
        checkDeposit.disabled = false;
        checkDeposit.value = '';
        checkmarkDeposit.value = '';
        targetAmount.disabled = false;
        targetAmount.value = '';

        periodSelector.value = 1;
        let periodAmount = document.querySelector('#pA');
        periodAmount.textContent = periodSelector.value;
        
        budgetMonthValue.value = '';
        budgetDayValue.value = '';
        expensesMonthValue.value = '';
        additionalExpensesValue.value = '';
        additionalIncomeValue.value = '';
        targetMonthValue.value = '';
        incomePeriodValue.value = '';
        incomePeriodValue.value = '';

        cancel.style.display = 'none';
        startBtn.style.display = 'block';
    },

    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
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

        for (let key in this.expenses){
            appData.expensesMonth += +this.expenses[key];
        }
    },
    getIncomeMonth: function(){

        for (let key in this.income){
            appData.incomeMonth += +this.income[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = +salaryAmount.value - this.expensesMonth + this.incomeMonth;
        appData.budgetDay = Math.floor(this.budgetMonth / 31);
    },
    getTargetMonth: function(){
        return Math.ceil(+targetAmount.value / this.budgetMonth);
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelector.value; 
    }
};



salaryAmount.addEventListener('change', function(){
    if(salaryAmount.value !== ''){
        startBtn.addEventListener('click', appData.start);
    }
});

cancel.addEventListener('click', appData.cancel);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelector.addEventListener('input', function(){
    let periodAmount = document.querySelector('#pA');
    periodAmount.textContent = periodSelector.value;
});
