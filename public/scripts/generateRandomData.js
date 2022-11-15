const { json } = require("express");

let totalKsh = 200000;
let time = 720;
//let costPerLitre = 175;
//let numberOfTransactions = 100
let minNumber = 50;
let maxNumber = 4000;
let transArray = [];
let transTime = {
    startTime: new Date('12/12/2020 11:00').getTime(),
    endTime: new Date('12/12/2020 23:00').getTime()
};
let total = 0;
let num = 0;


generateRandomTransactions();//function to autogenerate random data(cash or mpesa)

//Display the random data to the console
transArray.forEach(element => {
    console.log(element);
});

//function to send generated random data to mongoDb database
function sendToDataBase(data) {
    fetch('http://localhost:4444/confirmation', {
        method: 'POST', 
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(transArray)
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            //response from the database
            console.log(res);
        })
        .catch(res => {
            console.log(res.message);
        })
    
}


//get random transactions
function generateRandomTransactions() {
    let randomNumber = {
        value: Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
    }

    checkLastDigit(randomNumber);
    getRandomTime(randomNumber.value);
    totalKsh -= randomNumber.value;


    if (totalKsh < 4000) {
        getRandomTime(totalKsh);
        return;
    }

    generateRandomTransactions();
}


function checkLastDigit(number) {//checks if the last digit is 0, if the last digit is not 0 then assigns it to 0

    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    let toStr = number.value.toString()
    
    if (toStr.charAt(toStr.length - 1) !== "0") {
        toStr = setCharAt(toStr, toStr.length - 1, "0");
    }

    number.value = parseInt(toStr);

}

//function to generate random time within a perticular range
function getRandomTime(amount) {
    let output;
    if (transTime.startTime > transTime.endTime) {
        return false;
    }
    let randomTransaction = Math.floor(Math.random() * 2);
    if (randomTransaction === 0) {
        output = {
            time: transTime.startTime,
            Amount: amount,
            PaymentType: "Cash"
        };
    } else {
        output = getJsonToSend(transTime.startTime, amount);
    }
    

    transArray.push(output);
    range = transTime.endTime - transTime.startTime;
    let randomTime = Math.floor(range / Math.floor(Math.random() * (120 -70) + 70));
    transTime.startTime += randomTime;


}

//generateMpesa random transactions
function getJsonToSend(time, amount) {

    let json = {
        "TransactionType": "Pay Bill",
        "TransID": `${generateRandomName(10).toUpperCase()}`,
        "TransTime": time,
        "Amount": amount,
        "BusinessShortCode": "600638",
        "BillRefNumber": "A123",
        "InvoiceNumber": "",
        "OrgAccountBalance": "49197.00",
        "ThirdPartyTransID": "",
        "MSISDN": `2547${generateNumber(8)}`,
        "FirstName": `${generateRandomName(8)}`
    }
    
    return json;
}

function generateNumber(num) {
    let amount = "";
    for (let i = 1; i < num; i++) {
        amount += Math.floor(Math.random() * 9).toString();
    }
    return amount;

}

function generateRandomName(num) {
    let res = '';
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 26);
        res += String.fromCharCode(97 + random);
    };

    return res;
}
