const main = (function () {
    let amount = [];

    let totalSellAmounted = 0;
    //let amountTemp = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ;
    function initialfunction() {
        amount = [
            ["ONE HUNDRED", 0],
            ["TWENTY", 0],
            ["TEN", 0],
            ["FIVE", 0],
            ["ONE", 1.00],
            ["QUARTER", 0],
            ["DIME", 0],
            ["NICKEL", 0],
            ["PENNY", 0.01]
        ];
        localStorage.setItem('initialAmount',
            JSON.stringify(amount));
    }

    function getAmount() {
        const amount = Object.keys(JSON.parse(localStorage.getItem('initialAmount')));
        const initialAmount =
            amount.reduce((total, key) => {
                total += JSON.parse(localStorage.getItem('initialAmount'))[key][1];
                return total;
            }, 0);
        document.querySelector(".initial-cash").innerHTML = initialAmount;
        document.querySelector(".sold-amount").innerHTML = totalSellAmounted;
        document.querySelector(".total-sell").innerHTML = initialAmount + totalSellAmounted;
        document.querySelector(".message").classList.add("hidden");
        document.querySelector(".day-summary").classList.remove("hidden");
    }

    function amountChage() {
        const price = document.getElementById('price');
        const cash = document.getElementById('cash');
        const btn_change = document.getElementById('change');
        let change = cash.value - price.value;
        const initialChange = change;
        amountListTemp = amount;

        for (let index in amountListTemp) {
            if (amountListTemp[index][1] > 0) {
                change = calculateAmount(change, amountListTemp[index]);
            }
        }

        if (change === 0) {
            totalSellAmounted += Number(price.value);
            document.querySelector(".result").innerHTML = 'Change Due: $' + (cash.value - price.value).toFixed(2);
            document.querySelector(".message").classList.remove("hidden");
            document.querySelector(".day-summary").classList.add("hidden");

        } else {
            document.querySelector(".result").innerHTML = 'Insufficient Funds ' + change.toFixed(2);
            setTimeout(function () {
                document.querySelector(".result").innerHTML = 'CLOSED!!!'
            }, 2000);
            document.querySelector(".message").classList.remove("hidden");
            document.querySelector(".day-summary").classList.add("hidden");
            price.disabled = true;
            cash.disabled = true;
            btn_change.disabled = true;
            s
        }
    }

    function calculateAmount(change, amountTemp) {
        let typeCoin = getValueCoin(amountTemp[0]);
        let maxDivider;
        let roundAmount;

        if ((change.toFixed(2) / typeCoin) >= 1) {

            maxDivider = Math.floor(change.toFixed(2) / typeCoin);

            if ((maxDivider * typeCoin) >= amountTemp[1]) {
                change = change.toFixed(2) - amountTemp[1];
                amountTemp[1] = 0;
            } else {
                roundAmount = (maxDivider * typeCoin)
                amountTemp[1] = amountTemp[1] - roundAmount.toFixed(2);
                change -= (maxDivider * typeCoin);
            }
        }

        return change;

    }

    function getValueCoin(typeCoin) {
        switch (typeCoin) {
            case "ONE HUNDRED":
                return 100;
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

    function getSum() {

        const arr = JSON.parse("[" + document.getElementById('array').value + "]");
        const sumValue = document.getElementById('sum');
        let total = 0,
            indexArray = [];

        const totalSum = (arr).reduce((prevValue, currentValue, index, vector) => {
            let indexfound = vector.findIndex((e) => {
                if ((currentValue + e) == sumValue.value) {
                    return true;
                }
            })

            if (indexfound > -1) {
                let firstIndex = 0;
                let secondIndex = 0;

                if (indexArray.length === 0) {
                    indexArray.push(index, indexfound);
                    total = index + indexfound;
                } else {
                    firstIndex = indexArray.findIndex(v => (v === index));
                    secondIndex = indexArray.findIndex(v => (v === indexfound));
                }
                if (firstIndex < 0) {
                    indexArray.push(index);
                    total += index;
                }
                if (secondIndex < 0) {
                    indexArray.push(indexfound);
                    total += indexfound;
                }
            }
            return total;
        }, 0)

        document.querySelector(".result").innerHTML = totalSum;
        document.querySelector(".message").classList.remove("hidden");

    }

    function init() {
        initialfunction();
    }
    init();
    return {
        getAmount: getAmount,
        amountChage: amountChage,
        getSum: getSum
    }
})();