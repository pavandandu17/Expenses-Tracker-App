function submitData() {
    var expenseType = document.getElementById('expenseType').value;
    var expenseDescription = document.getElementById('expenseDescription').value;
    var expenseAmount = document.getElementById('expenseAmount').value;
    var expenseDate = document.getElementById('expenseDate').value;

    var expenseData = {
        'expenseType': expenseType,
        'expenseDescription': expenseDescription,
        'expenseAmount': expenseAmount,
        'expenseDate': expenseDate
    }

    if(localStorage.getItem('data') == null)
        localStorage.setItem('data', JSON.stringify([expenseData]));
    else
    {
        const expenseToAdd = (JSON.parse(localStorage.getItem('data')));
        expenseToAdd.push(expenseData);
        localStorage.setItem('data', JSON.stringify(expenseToAdd));
    }
}

function displayExpenses() {

    const data = JSON.parse(localStorage.getItem('data'));
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