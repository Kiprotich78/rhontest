//Get Data from the database
async function fetchData() {
    let authToken;
    let Data;
    //get Auth Token
    await fetch('http://localhost:4444/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "phoneNumber": "0716009182",
            "password": "*123HYhKUHh"
        })
    })
        .then((res) => {
            return res.json();
        })
        .then(res => {
            authToken = res.accessToken;
        })
        .catch(res => {
            console.log(res.message)
        })
    
    //Get Records
    await fetch('http://localhost:4444/records', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + authToken,
        }
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            Data = res;
        })
        .catch(res => console.log(res.message))
    
    return Data; //returns a promise

}

fetchData().then(res => {
    //output json data from the database
    console.log(res);
});

/*
* Simulatae data to be Sent to database by Safaricom
*/

//simulateDataFromSafaricomApi();
//fetchResults();

function fetchResults() {
    fetch('http://localhost:4444/confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getJsonToSend())
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.message);
        });
}

