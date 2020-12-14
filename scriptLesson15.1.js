'use strict';

const startBtn = document.querySelector('#start'),
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
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelector = document.querySelector('.period-select'),
    periodAmount = document.querySelector('#pA'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
let incomesItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


class AppData{
    constructor(){
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
    }

    cancel(){
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
        depositPercent.style.display = 'none';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
    
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
        depositPercent.value = '';
        depositAmount.value = '';
    
        cancel.style.display = 'none';
        startBtn.style.display = 'block';
    }
    
    showResult(){
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
    }
    addIncomeBlock(){
        const cloneIncomeItems = incomesItems[0].cloneNode(true);
        incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomesItems = document.querySelectorAll('.income-items');
    
        if(incomesItems.length === 3){
            incomePlus.style.display = 'none';
        }
    }
    getIncome(){
        const _this = this;
        incomesItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
            }
        });
    }
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
    
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses(){
        const _this = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getAddExpenses(){
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
    
            item = item.trim();
            if(item !== ''){
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth(){
    
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }
    getIncomeMonth(){
    
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +salaryAmount.value - this.expensesMonth + this.incomeMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 31);
    }
    getTargetMonth(){
        return Math.ceil(+targetAmount.value / this.budgetMonth);
    }
    calcPeriod(){
        return this.budgetMonth * periodSelector.value; 
    }
    
    start(){
    
        if (depositPercent.value < 0 || depositPercent.value > 100){
            alert('Процент депозита должен быть не меньше 0 и не больше 100!');
            depositPercent.value = 0;
            return;
        }

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
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    
    
    }

    getInfoDeposit(){
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent(){
        const valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';
            depositPercent.value = 0;
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    depositHandler(){
        if (checkDeposit.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeaddEventListener('change', this.changePercent);
        }
    }
    
    eventListeners(){
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

        checkDeposit.addEventListener('change', this.depositHandler.bind(_this));
    }

    
}


const appData = new AppData();

console.log(appData);

appData.eventListeners();

