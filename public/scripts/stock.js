var opening_stock_petrol = 20000;
document.getElementById("petrolstock").innerHTML=opening_stock_petrol;
var opening_stock_diesel = 30000;
document.getElementById("dieselstock").innerHTML = opening_stock_diesel;
//sales
var sales = {
    "petrol":[],
    "diesel":[],
}
//random sale figueres 40 sales
var randoms = [];
var randomsdiesel = [];
for(var i=0;i<5;i++){
    if(i<3){
        for(var j=0;j<10;j++){
            var q = Math.floor(Math.random()*6);
            randoms.push(q);
            if(q<3){
                sales["petrol"].push(Math.floor(Math.random()*251)+50); //between 50 & 300;
            }
            else if(q>=3 & q<=4){
                var y = Math.floor(Math.random()*600); //between 301 and 600;
                if(y<301){
                    sales["petrol"].push(y+300);
                }
                else{
                    sales["petrol"].push(y);
                }
            }
            else{
                var y = Math.floor(Math.random()*1000);
                if(y<601){
                    sales["petrol"].push(y+300);
                }
                else{
                    sales["petrol"].push(y);
                }
            }
        }
    }
    else{
        for(var j=0;j<10;j++){
            var q = Math.floor(Math.random()*6);
            randomsdiesel.push(q);
            if(q<3){
                sales["diesel"].push(Math.floor(Math.random()*800)+500); //between 500 & 1299;
            }
            else if(q>=3 & q<=4){
                var y = Math.floor(Math.random()*2000); //between 1300 and 2000;
                if(y<800){
                    sales["diesel"].push(y+1300);
                }
                else if(y>=800 & y<1300){
                    sales["petrol"].push(y + 500);
                }
                else{
                    sales["diesel"].push(y);
                }
            }
            else{
                var y = Math.floor(Math.random()*2700);
                if(y<700){
                    sales["diesel"].push(y+2000);
                }
                else if(y>=700 & y<2000){
                    sales["diesel"].push(y+1300);
                }
                else{
                    sales["diesel"].push(y);
                }
            }
        }
    }
}
console.log(randoms);
console.log(sales["petrol"],"total sales= ", sales["petrol"].reduce(function(x,y){return x + y},0));
console.log("length: ", sales["petrol"].length);
console.log(randomsdiesel);
console.log(sales["diesel"],"total sales= ", sales["diesel"].reduce(function(x,y){return x + y},0));
console.log("length: ", sales["diesel"].length);

var stock_level = {
    "petrol_stock":[opening_stock_petrol],
    "diesel_stock":[opening_stock_diesel]
}

// petrol stock declining as we fuel
var i = 0;
while(opening_stock_petrol>0){
    stock_level["petrol_stock"].push(stock_level["petrol_stock"][i] - sales["petrol"][i]);
    i++;
    if(i==sales["petrol"].length){
        break;
    }
    if(stock_level["petrol_stock"][i] < sales["petrol"][i+1]){
        break;
    }
}
//diesel stock declining
var i = 0;
while(opening_stock_diesel>0){
    if((stock_level["diesel_stock"][i] - sales["diesel"][i]) < 1){
        break;
    }
    stock_level["diesel_stock"].push(stock_level["diesel_stock"][i] - sales["diesel"][i]);
    i++;
    if(i==sales["diesel"].length){
        break;
    }
    if(stock_level["diesel_stock"][i] < sales["diesel"][i+1]){
        break;
    }
}

console.log(stock_level["petrol_stock"]);
console.log(stock_level["diesel_stock"]);
console.log([...Array(stock_level["petrol_stock"].length+1).keys()].slice(0,10));
//remaining stock
document.getElementById("rpstock").innerHTML= opening_stock_petrol - sales["petrol"].reduce(function(a,b){return a + b},0);
document.getElementById("rdstock").innerHTML= opening_stock_diesel - sales["diesel"].reduce(function(a,b){return a + b},0);
//days remaining
document.getElementById("dpstock").innerHTML= "2 days";
document.getElementById("ddstock").innerHTML= "3 days";
//grapsh line
var ctx = document.getElementById('charts').getContext('2d');
    var charts = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(stock_level["petrol_stock"].length+1).keys()],//monday_sales_arr.slice(0,21),
            datasets: [{
                label: 'petrol remaining',
                data: stock_level["petrol_stock"], //.slice(0,21),//mosales,
                backgroundColor: [
                    'red'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            },{
                label: "diesel remaining",
                data: stock_level["diesel_stock"],
                backgroundColor: [
                    'green'
                ],
                borderColor: [
                    'rgba(75, 0, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });
