const localStorageKey = 'expensesTrackerAppData';

function submitData() {
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
        expenses[year] = {}
    }
    //Adding month if not present
    if(!expenses[year].hasOwnProperty(monthIndex)) {
        expenses[year][monthIndex] = {}
    }
    //Adding date if not present
    if(!expenses[year][monthIndex].hasOwnProperty(date)) {
        expenses[year][monthIndex][date] = []
    }
    
    //Adding current expense data
    expenses[year][monthIndex][date].push(expenseData);
    localStorage.setItem(localStorageKey, JSON.stringify(appData));
}

function displayExpenses() {

    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if(data == null)
        return;
    const ul = document.getElementById('displayList');
    ul.innerHTML = '';
    for(expense of data)
    {
        let x = document.createElement('li');
        x.innerHTML = JSON.stringify(expense);
        
        ul.appendChild(x);
    }

    document.getElementById('displayList').style.display = "block";
    document.getElementById('displayList').style.transition = "0.5s";
}

function clearData() {
    localStorage.clear();
    displayExpenses();
}