var opening_petrol = document.getElementById("o_ptr_l").value;
console.log("opening stock",opening_petrol);
//petrol sales
var petrol_payments = {
    "cash":[],
    "cards":[],
    "mobile money":[],
    "invoice":[]
}
for(var i=0;i<100;i++){
    var x = Math.floor(Math.random()*11);
    if(x<=4){
        petrol_payments["cash"].push(Math.floor(Math.random()*1000)+100);
    }
    else if(x>4 & x<=6){
        petrol_payments["cards"].push(Math.floor(Math.random()*1000)+100);
    }
    else if(x>6 & x<=9){
        petrol_payments["mobile money"].push(Math.floor(Math.random()*1000)+100);
    }
    else if(x>9 &x<=11){
        petrol_payments["invoice"].push(Math.floor(Math.random()*1000)+100);
    }
}
var total_petrol_sales = petrol_payments["cash"].reduce(function(a,b){return a + b},0) + petrol_payments["cards"].reduce(function(a,b){return a + b},0) + petrol_payments["mobile money"].reduce(function(a,b){return a + b},0) + petrol_payments["invoice"].reduce(function(a,b){return a + b},0);
console.log("cash: ",petrol_payments["cash"],petrol_payments["cash"].length);
console.log("cards: ",petrol_payments["cards"],petrol_payments["cards"].length);
console.log("mobile: ",petrol_payments["mobile money"],petrol_payments["mobile money"].length);
console.log("invoice: ",petrol_payments["invoice"],petrol_payments["invoice"].length);
console.log("total petrol sales =:", total_petrol_sales);

//diesel sales
var diesel_payments = {
    "cash":[],
    "cards":[],
    "mobile money":[],
    "invoice":[]
}
for(var i=0;i<38;i++){
    var x = Math.floor(Math.random()*11);
    if(x<=2){
        diesel_payments["cash"].push(Math.floor(Math.random()*2000)+500);
    }
    else if(x>2 & x<=6){
        diesel_payments["cards"].push(Math.floor(Math.random()*2000)+500);
    }
    else if(x>6 & x<=7){
        diesel_payments["mobile money"].push(Math.floor(Math.random()*2000)+500);
    }
    else if(x>7 &x<=11){
        diesel_payments["invoice"].push(Math.floor(Math.random()*2000)+500);
    }
}
var total_diesel_sales = diesel_payments["cash"].reduce(function(a,b){return a + b},0) + diesel_payments["cards"].reduce(function(a,b){return a + b},0) + diesel_payments["mobile money"].reduce(function(a,b){return a + b},0) + diesel_payments["invoice"].reduce(function(a,b){return a + b},0);

console.log("cash: ",diesel_payments["cash"],diesel_payments["cash"].length);
console.log("cards: ",diesel_payments["cards"],diesel_payments["cards"].length);
console.log("mobile: ",diesel_payments["mobile money"],diesel_payments["mobile money"].length);
console.log("invoice: ",diesel_payments["invoice"],diesel_payments["invoice"].length);
console.log("total diesel sales =:", total_diesel_sales);

getMpesaTransactions();

function getMpesaTransactions() {
    console.log('helloo world');
}
