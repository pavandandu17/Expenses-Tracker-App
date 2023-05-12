const localStorageKey = 'expensesTrackerAppData';
const expenseTypes = ['Food', 'Petrol/Gas', 'Entertainment', 'Fitness/Gym', 'Transport', 'Taxes', 'Investment', 'Shopping', 'Groceries', 'Bills', 'Books', 'Rent', 'EMI', 'Others'];
let today = new Date();

window.onload = showTodayMonthExpense;

async function sendData(data) {
    const res = await axios.post('http://localhost:3000/api/endpoint', data);
}

async function getData() {
    const data = 5;
    const res = await axios.get('http://localhost:3000/api/endpoint', data);
}

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

function addExpense() {
    let expenseType = document.getElementById('expenseType').value;
    let expenseDescription = document.getElementById('expenseDescription').value;
    let expenseAmount = Number(document.getElementById('expenseAmount').value);
    let expenseDate = new Date(document.getElementById('expenseDate').value);

    let dataToSend = {
        'expenseType': expenseType,
        'expenseDescription': expenseDescription,
        'expenseAmount': expenseAmount,
        'year': Number(expenseDate.getFullYear()),
        'month': Number(expenseDate.getMonth()),
        'date': Number(expenseDate.getDate())
    }

    sendData(dataToSend);
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

function enableChartTypeInput() {
    const chartTypeEle = document.getElementById('chartType');
    chartTypeEle.disabled = false;
}

function displayChart() {
    const chartType = document.getElementById('chartType').value;
    if (chartType == "bar") {
        const pieChartEle = document.getElementById('pieChart');
        pieChartEle.style.display = "none";
        displayBarChart();
    } else {
        const barChartEle = document.getElementById('barChart');
        barChartEle.style.display = "none";
        displayPieChart();
    }
}
function displayBarChart() {
    const chartMonth = document.getElementById('chartMonth').value;
    const daysInMonth = new Date(2023, chartMonth, 0).getDate();

    const barChartEle = document.getElementById('barChart');
    barChartEle.style.display = "block";

    let labels = [];
    for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i)
    }

    let yValues = [];
    for (let i = 1; i <= daysInMonth; i++) {
        yValues.push(Math.floor(Math.random() * 500) + 1);
    }

    const barChart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: yValues,
                label: 'Expense in Rs.',
                backgroundColor: 'blue',
                hoverBackgroundColor: 'green',
            }]
        },
        options: {}
    });
}

function displayPieChart() {
    const chartMonth = document.getElementById('chartMonth').value;
    let yValues = [];
    for (let i = 0; i < expenseTypes.length; i++) {
        yValues.push(Math.floor(Math.random() * 100) + 1);
    }
    const colors = ['#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f39c12'];

    const pieChartEle = document.getElementById('pieChart');
    pieChartEle.style.display = "block";

    new Chart('pieChart', {
        type: "doughnut",
        data: {
            labels: expenseTypes,
            datasets: [{
                data: yValues,
                backgroundColor: colors,
            }]
        },
        options: {
            title: {
                display: true,
                text: "Text to be displayed"
            }
        }
    });
}

function getExpenseType(typeIndex) {
    return expenseTypes[typeIndex];
}