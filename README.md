# Expenses-Tracker-App

## Structure of JSON Object 

```javascript

expensesTrackerAppData = {
    userName:"",
    expenses: {
        year1 : {
            monthIndex1: {
                date1: {
                    list: [{expenseRec1}, {expenseRec2}, ....],
                    totalSum: 0
                },
                .
                .
                dateN: {

                }
            },
            .
            .
            monthIndexN: {
                
            }
            totalSum:0
        },
        year2: {

        },
        .
        .
        yearN: {
            
        }
        totalSum: 0
    }
}

```