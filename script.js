const localStorageKey = 'expensesTrackerAppData';

window.onload = showTodayMonthExpense;

let today = new Date();

function showTodayMonthExpense() {
    let todayDisplayElement = document.getElementById('todaysExpense');
    monthDisplayElement = document.getElementById('thisMonthsExpense');

    const appData = JSON.parse(localStorage.getItem(localStorageKey));

    if (appData == null) {
        todayDisplayElement.innerText = "0/- Rs";
        monthDisplayElement.innerText = "0/- Rs";
    } else {
        let todayDate = appData.expenses[today.getFullYear()][today.getMonth()][today.getDate()];
        let currMonth = appData.expenses[today.getFullYear()][today.getMonth()];
        if (todayDate == undefined)
            todayDisplayElement.innerText = "0/- Rs";
        else
            todayDisplayElement.innerText = (appData.expenses[today.getFullYear()][today.getMonth()][today.getDate()].totalSum) + "/- Rs";
        if (currMonth == undefined)
            monthDisplayElement.innerText = "0/- Rs";
        else
            monthDisplayElement.innerText = (appData.expenses[today.getFullYear()][today.getMonth()].totalSum) + "/- Rs";
    }
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
    if (localStorage.getItem(localStorageKey) == null) {
        let appData = {
            userName: "Pavan",
            expenses: {}
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
    if (!expenses.hasOwnProperty(year)) {
        expenses[year] = {
            totalSum: 0
        };
    }
    //Adding month if not present
    if (!expenses[year].hasOwnProperty(monthIndex)) {
        expenses[year][monthIndex] = {
            totalSum: 0
        };
    }
    //Adding date if not present
    if (!expenses[year][monthIndex].hasOwnProperty(date)) {
        expenses[year][monthIndex][date] = {
            totalSum: 0,
            list: []
        };
    }

    //Adding current expense data
    expenses[year][monthIndex][date].list.push(expenseData);

    //Updating total Sums
    expenses[year][monthIndex][date].totalSum += expenseData.expenseAmount;
    expenses[year][monthIndex].totalSum += expenseData.expenseAmount;
    expenses[year].totalSum += expenseData.expenseAmount;

    localStorage.setItem(localStorageKey, JSON.stringify(appData));

    showTodayMonthExpense();
}

function clearData() {
    localStorage.clear();
    // displayExpenses();

    showTodayMonthExpense();
}


function enableMonthDateInputs() {
    const monthInputEle = document.getElementById('month');
    const dateInputEle = document.getElementById('date');
    const submitBtn = document.getElementById('form2SubmitButton');

    monthInputEle.disabled = false;
    dateInputEle.disabled = false;
    submitBtn.disabled = false;
}

function updateDateInput() {
    const yearInputEle = document.getElementById('year');
    const monthInputEle = document.getElementById('month');
    const dateInputEle = document.getElementById('date');

    const year = Number(yearInputEle.value);
    const month = Number(monthInputEle.value);

    const daysInMonth = new Date(year, month, 0).getDate();
    dateInputEle.max = daysInMonth;
}

function submitForm2() {
    event.preventDefault();

    const yearInputEle = document.getElementById('year');
    const monthInputEle = document.getElementById('month');
    const dateInputEle = document.getElementById('date');

    const year = Number(yearInputEle.value);
    const month = Number(monthInputEle.value);
    const date = Number(dateInputEle.value);

    //If date given, but not month
    if (month == "" && date != "") {
        alert("Year, date select chesthe ae month dhi display cheyyali ra erri na modda");
        return;
    }

    const appData = JSON.parse(localStorage.getItem(localStorageKey));
    //If only year is selected
    if (month == "") {
        const data = appData.expenses[year];

        const tableEle = document.getElementById('displayTable');
        const tHead = tableEle.querySelector('thead');
        tHead.style.display = "table-header-group";
        const tBody = tableEle.querySelector('tbody');
        tBody.innerHTML = '';
        let no = 1;
        for (let month in data) {
            if (month == 'totalSum')
                continue;
            for (let date in data[month]) {
                if (date == 'totalSum')
                    continue;
                for (let expense of data[month][date].list) {
                    let row = tBody.insertRow();

                    row.insertCell().innerText = no++;
                    row.insertCell().innerText = expense.expenseDate;
                    row.insertCell().innerText = expense.expenseType;
                    row.insertCell().innerText = expense.expenseDescription;
                    row.insertCell().innerText = expense.expenseAmount;
                }
            }
        }
    }
}