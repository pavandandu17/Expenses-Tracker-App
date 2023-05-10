const localStorageKey = 'expensesTrackerAppData';

window.onload = showCurrMonthTotalExpense;
window.addEventListener('storage', showCurrMonthTotalExpense);

let today = new Date();

function showCurrMonthTotalExpense() {
    let temp = document.getElementById('todaysExpense');
    const appData = JSON.parse(localStorage.getItem(localStorageKey));
    temp.innerText = (appData.expenses[today.getFullYear()][today.getMonth()][today.getDate()].totalSum) + "/- Rs";
    temp = document.getElementById('thisMonthsExpense');
    temp.innerText = (appData.expenses[today.getFullYear()][today.getMonth()].totalSum) + "/- Rs";
}

function submitData() {
    event.preventDefault();
    let expenseType = document.getElementById('expenseType').value;
    let expenseDescription = document.getElementById('expenseDescription').value;
    let expenseAmount = Number(document.getElementById('expenseAmount').value);
    let expenseDate = new Date(document.getElementById('expenseDate').value);

    let expenseData = {
        'expenseType': expenseType,
        'expenseDescription': expenseDescription,
        'expenseAmount': expenseAmount,
        'expenseDate': expenseDate
    }

    //If no record of expenses
    if(localStorage.getItem(localStorageKey) == null) {
        let appData = {
            userName:"Pavan", 
            expenses:{}
        };

        //Storing initial object
        localStorage.setItem(localStorageKey, JSON.stringify(appData));
    }

    addExpense(expenseData);
}

function addExpense(expenseData) {
    let appData = JSON.parse(localStorage.getItem(localStorageKey));

    let year = Number(expenseData.expenseDate.getFullYear());
    let monthIndex = Number(expenseData.expenseDate.getMonth());
    let date = Number(expenseData.expenseDate.getDate());
    
    let expenses = appData.expenses;
    //Adding year if not present
    if(!expenses.hasOwnProperty(year)) {
        expenses[year] = {
            totalSum:0
        };
    }
    //Adding month if not present
    if(!expenses[year].hasOwnProperty(monthIndex)) {
        expenses[year][monthIndex] = {
            totalSum:0
        };
    }
    //Adding date if not present
    if(!expenses[year][monthIndex].hasOwnProperty(date)) {
        expenses[year][monthIndex][date] = {
            totalSum: 0,
            list:[]
        };
    }
    
    //Adding current expense data
    expenses[year][monthIndex][date].list.push(expenseData);

    //Updating total Sums
    expenses[year][monthIndex][date].totalSum += expenseData.expenseAmount;
    expenses[year][monthIndex].totalSum += expenseData.expenseAmount;
    expenses[year].totalSum += expenseData.expenseAmount;

    localStorage.setItem(localStorageKey, JSON.stringify(appData));

    showCurrMonthTotalExpense();
}

function clearData() {
    localStorage.clear();
    displayExpenses();
}