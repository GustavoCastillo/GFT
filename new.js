const main = (function () {
    let amount = [
        ["ONE HUNDRED", 0],
        ["TWENTY", 0],
        ["TEN", 30],
        ["FIVE", 0],
        ["ONE", 1.00],
        ["QUARTER", 0],
        ["DIME", 0],
        ["NICKEL", 0],
        ["PENNY", 0.01]       
    ];

    let totalSellAmounted=0;
    //let amountTemp = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ;
    function initialfunction() {
        //let amount= [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] 
        //localStorage.setItem('initialAmount',
        //JSON.stringify( amount));
    }

    function getAmount() {
        //const amounts = Object.keys(JSON.parse(localStorage.getItem('initialAmount')));
        const initialAmount =
            amount.reduce((total, key) => {
                //total += JSON.parse(localStorage.getItem('initialAmount'))[key][1];
                total += [key][0][1];
                return total;
            }, 0);
        console.log(initialAmount);
    }

    function amountChage() {
        const price = document.getElementById('price');
        const cash = document.getElementById('cash');
        let change = cash.value - price.value;
        totalSellAmounted += Number(price.value);
        const initialChange = change;
        amountListTemp = amount;

        for (let index in amountListTemp) {
            
            if (amountListTemp[index][1] > 0) {
                change = calculateAmount(change, amountListTemp[index]);
            }
        }


        if (change === 0) {
            console.log('Change Due:' + (cash.value - price.value));
        } else {
            console.log((initialChange - change).toFixed(2), 'Insufficient Funds' + change.toFixed(2));
            console.log(totalSellAmounted);
        }



    }


    function calculateAmount(change, amountTemp) {
        let typeCoin = getValue(amountTemp[0]);

        let result;

        let newvalue;
        if ((change.toFixed(2) / typeCoin) >= 1) {

            result = Math.floor(change.toFixed(2) / typeCoin);

            if ((result * typeCoin) >= amountTemp[1]) {
                change = change.toFixed(2) - amountTemp[1];
                amountTemp[1] = 0;


            } else {

                newvalue =(result * typeCoin)
                amountTemp[1] = amountTemp[1] - newvalue.toFixed(2);
                console.log('antes', change, typeCoin, result)
                change -= (result * typeCoin);
                console.log('despues', change.toFixed(2), typeCoin, result)
            }
        }

        return change;

    }

    function getValue(typeCoin) {
        switch (typeCoin) {
            case "ONE HUNDRED":
                return 1000;
            case "TWENTY":
                return 20;
            case "TEN":
                return 10;
            case "FIVE":
                return 5;
            case "ONE":
                return 1;
            case "QUARTER":
                return 0.25
            case "DIME":
                return 0.10;
            case "NICKEL":
                return 0.05;
            case "PENNY":
                return 0.01;
            default:
                return 1
        }
    }
       0 1 2 3 4 5 
    //[1,4,2,3,0,5], 7
    function reduceArray(arr, arg) {
        var result = 0,
        newArr = [],
        //Used to hold the indices that we have already used to form our sum
        indices = [];
  
    //Loop through arr and create a deep copy of it in newArr
    for(var k = 0; k < arr.length; k++) {
      newArr.push(arr[k]);
    }
  
    //Loop through arr
    for(var i = 0; i < arr.length; i++) {
  
      //Loop through newArr
      for(var j = 0; j < newArr.length; j++) {
        //Since we want to add different elements of the array, we want to avoid adding the same element
        if(i !== j) {
          //If the sum of two elements is equal to arg AND the indices that we have in i and j are not part of the indices array
          //Indices array is used to hold the already used indices, thus ensuring the accurate parsing of the parameters
          if(arr[i] + newArr[j] === arg && indices.indexOf(i) === -1 && indices.indexOf(j) === -1) {
            //Sum the indices up
            result += i + j;
            //Push the indices in the indices array in order to not use them in further iterations
            indices.push(i, j);
          }
        }
      }
    }
  
    return result;
    }

    function init() {
        initialfunction();
    }
    init();
    return {
        getAmount: getAmount,
        amountChage: amountChage,
        reduceArray: reduceArray
    }
})();


let total=0;
var arr = (arryinitial).reduce((valorAnterior, valorActual, indice, vector) => {
    
    let arry2 = [];
    //console.log(vector);
    let value = vector.findIndex((elem) => {

        if (valorActual + elem == 20) {

            return true;
        }
        return false;
    })
    arry2.push(vector[value], valorActual);
    //console.log(arryinitial,arry2);
    vector = vector.filter(item => !arry2.includes(item));
    console.log(vector);
    if (value> 0) {
        total += indice + value;
        value = 0;
    }

    return total;
}, 0)

console.log(arr);