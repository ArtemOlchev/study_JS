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
    periodSelector = document.querySelector('.period-select'),
    periodAmount = document.querySelector('#pA');


const AppData = function(){
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.expenses = {};
    
};

AppData.prototype.cancel = function(){
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.expenses = {};

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
    checkDeposit.checked = false;
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
};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelector.addEventListener('input', function(){
        incomePeriodValue.value = _this.calcPeriod();
    });
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItems = incomesItems[0].cloneNode(true);
    incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomesItems = document.querySelectorAll('.income-items');

    if(incomesItems.length === 3){
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomesItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){

        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){

    for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function(){

    for (let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = +salaryAmount.value - this.expensesMonth + this.incomeMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 31);
};
AppData.prototype.getTargetMonth = function(){
    return Math.ceil(+targetAmount.value / this.budgetMonth);
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelector.value; 
};

AppData.prototype.start = function(){


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


    startBtn.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();


};

AppData.prototype.eventListeners = function(){
    const _this = this;
    salaryAmount.addEventListener('change', function(){
        if(salaryAmount.value !== ''){
            startBtn.addEventListener('click', _this.start.bind(_this));
        }
    });
    cancel.addEventListener('click', _this.cancel.bind(_this));
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    periodSelector.addEventListener('input', function(){
        periodAmount.textContent = periodSelector.value;
    });
};

const appData = new AppData();

console.log(appData);

appData.eventListeners();

