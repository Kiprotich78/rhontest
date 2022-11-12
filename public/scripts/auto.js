console.log("i love you");
X = 23;
console.log(X);
var monday_sales = Math.floor(Math.random()*150)+50;
var monday_sales_arr = [...Array(monday_sales +1).keys()];
monday_sales_arr.shift();
var tuesday_sales = Math.floor(Math.random()*100)+50;
var tuesday_sales_arr = [...Array(tuesday_sales +1).keys()];
tuesday_sales_arr.shift();
var wednesday_sales = Math.floor(Math.random()*200)+90;
var wednesday_sales_arr = [...Array(wednesday_sales +1).keys()];
wednesday_sales_arr.shift();
var thursday_sales = Math.floor(Math.random()*200)+120;
var thursday_sales_arr = [...Array(thursday_sales +1).keys()];
thursday_sales_arr.shift();
var friday_sales = Math.floor(Math.random()*300)+200;
var friday_sales_arr = [...Array(friday_sales +1).keys()];
friday_sales_arr.shift();
var saturday_sales = Math.floor(Math.random()*400)+250;
var saturday_sales_arr = [...Array(saturday_sales +1).keys()];
saturday_sales_arr.shift();
var sunday_sales = Math.floor(Math.random()*500)+350;
var sunday_sales_arr = [...Array(sunday_sales +1).keys()];
sunday_sales_arr.shift();
console.log(monday_sales, tuesday_sales, wednesday_sales,thursday_sales,friday_sales,saturday_sales,sunday_sales);
//console.log(monday_arr.length);
var sales=[];
var mosales=[];
var tusales=[];
var wesales=[];
var thsales=[];
var frsales=[];
var sasales=[];
var susales=[];
//var day =Math.floor(Math.random()*6)
var daily_number_sales;
var monday_total_sales;
var tuesday_total_sales;
var wednesday_total_sales;
var thursday_total_sales;
var friday_total_sales;
var saturday_total_sales;
var sunday_total_sales;
//var weakly_sales = []; //array of daily total sales for the week;
var weakly_total_sales; //total week sales
var day;

//function to accumulate daily sales
function accumulate(array, array2){
    for(var i=0;i<array.length;i++){
        var ac=0;
        for(var j=0;j<=i;j++){
            ac = ac + array[j];
        }
        array2.push(ac);
    }
    return array2;
}
var monday_accumulator=[];
var tuesday_accumulator=[];
var wednesday_accumulator=[];
var thursday_accumulator=[];
var friday_accumulator=[];
var saturday_accumulator=[];
var sunday_accumulator=[];
//daily total sales for petrol stations.
for(day=0;day<7;day++){
    switch(day){
        case 0:
            console.log("monday_sales are: ",monday_sales);
            for(var i=0;i<monday_sales;i++){
                mosales.push(Math.floor(Math.random()*2500)+200);
            }
            monday_total_sales = mosales.reduce(function(total,item){
                return total + item;
            },0);
            monday_accumulator = accumulate(mosales,monday_accumulator);
            break;
        case 1:
            console.log("tuesday sales are: ",tuesday_sales);
            for(var i=0;i<tuesday_sales;i++){
                tusales.push(Math.floor(Math.random()*2500)+200);
            }
            tuesday_total_sales = tusales.reduce(function(total,item){
                return total + item;
            },0);
            tuesday_accumulator = accumulate(tusales,tuesday_accumulator);
            break;
        case 2:
            console.log("wednesday sales: ", wednesday_sales);
            for(var i=0;i<wednesday_sales;i++){
                wesales.push(Math.floor(Math.random()*2500)+200);
            }
            wednesday_total_sales = wesales.reduce(function(total,item){
                return total + item;
            },0);
            wednesday_accumulator = accumulate(wesales,wednesday_accumulator);
            break;
        case 3:
            console.log("thursday sales:", thursday_sales);
            for(var i=0;i<thursday_sales;i++){
                thsales.push(Math.floor(Math.random()*2500)+200);
            }
            thursday_total_sales = thsales.reduce(function(total,item){
                return total + item;
            },0);
            thursday_accumulator = accumulate(thsales,thursday_accumulator);
            break;
        case 4:
            console.log("friday sales: ", friday_sales);
            for(var i=0;i<friday_sales;i++){
                frsales.push(Math.floor(Math.random()*3500)+200);
            }
            friday_total_sales = frsales.reduce(function(total,item){
                return total + item;
            },0);
            friday_accumulator = accumulate(frsales,friday_accumulator);
            break;
        case 5:
            console.log("saturday_sales:", saturday_sales);
            for(var i=0;i<saturday_sales;i++){
                sasales.push(Math.floor(Math.random()*4000)+200);
            }
            saturday_total_sales = sasales.reduce(function(total,item){
                return total + item;
            },0);
            saturday_accumulator = accumulate(sasales,saturday_accumulator);
            break;
        case 6:
            console.log("sunday_sales:", sunday_sales);
            for(var i=0;i<sunday_sales;i++){
                susales.push(Math.floor(Math.random()*4500)+200);
            }
            sunday_total_sales = susales.reduce(function(total,item){
                return total + item;
            },0);
            sunday_accumulator = accumulate(susales,sunday_accumulator);
            break;      
    }

}
//STOCK CALCULATION . assumption petrol only.
var petrol_monday_opening_stock = 760000;
document.getElementById("petrol_opening").innerHTML = petrol_monday_opening_stock;
var diesel_monday_opening_stock = 890000;


///
console.log("sunday accumulator", sunday_accumulator[3]);
console.log(susales.length, sunday_accumulator.length);
//weakly total sales
var weakly_sales=[monday_total_sales,tuesday_total_sales,wednesday_total_sales,thursday_total_sales,friday_total_sales,saturday_total_sales,sunday_total_sales];
var weakly_sales_arr = ["Monday","Tuesday","wednesday","Thursday","Friday","Saturday",'Sunday'];
console.log("weakly array",weakly_sales_arr);
//weakly_sales_arr.shift();
weakly_total_sales = weakly_sales.reduce(function(total,item){
    return total + item;
},0);
//monthly sales. Assumption 4 weeks;
console.log("weakly sales",weakly_sales);
console.log("weakly total sales =: ", weakly_total_sales);

console.log("thats me");
console.log("sales", sales);
//daily chart:monday
var ctx = document.getElementById('daily_chart').getContext('2d');
    var daily_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monday_sales_arr.slice(0,21),
            datasets: [{
                label: 'daily fuel consumption real time',
                data: monday_accumulator.slice(0,21),//mosales,
                backgroundColor: [
                    'red'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
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
   // daily_chart.destroy();
    //weakly sales
var wchart = document.getElementById('weakly_chart').getContext('2d');
    var weakly_chart = new Chart(wchart, {
        type: 'bar',
        data: {
            labels: weakly_sales_arr,
            datasets: [{
                label: 'daily fuel sales',
                data: weakly_sales,
                backgroundColor: [
                    'rgb(109,14,106)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
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

