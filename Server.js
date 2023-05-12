const express = require("express");
const app = express();
const mongoose = require('mongoose');

const AppData = require("./models/AppData");

//to allow Access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//to parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//for connecting to database
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/AppData');


}
console.log("Connected.....")

//Routes
app.get('/', (req, res) => {
    res.send("Hello");
})

app.get("/deleteAll", async (req, res) => {
    await AppData.deleteMany();
});

app.post("/getExpenses", async (req, res) => {
    // console.log(req.ye/);
    const datatoFilter = req.body;
    const filteredData = await AppData.find(datatoFilter);
    res.send(filteredData);
    //    console.log(filteredData);

})

app.post("/getAmount", async (req, res) => {
    const records = await AppData.find(req.body);
    const Amount = calculate(records);
    res.send({ data: Amount });
})
app.post('/addExpense', async (req, res) => {
    const dataToAdd = req.body;
    const data = new AppData(dataToAdd);
    const x = await data.save();
});

app.listen(3000, (req, res) => {
    console.log("Listening on POrt 3000");
});

function calculate(Array) {
    let amount = 0;
    for (let i of Array) {
        amount += i.expenseAmount;
    }
    return amount;
}