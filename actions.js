const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

// Get transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
//  check date input valid
   var re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  
    if (text.value.trim() === "" || amount.value.trim() === "" ||  !date.value.match(re)) {
    document.getElementById("error_msg").innerHTML =
      "<span>Error: Please check description, amount or date format.</span>";
    setTimeout(
      () => (document.getElementById("error_msg").innerHTML = ""),
      5000
    );
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      category: category.value,
      date: date.value,
    };
    
	
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
    date.value = "";
    category.value = "home";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Transactions history
function addTransactionDOM(transaction) {

  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} 
    ${sign}${Math.abs(transaction.amount)} 
    ${transaction.category} 
    ${transaction.date} 
	<button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">remove</button>
  `;

// Clear expenses and cash spend uin time period
  list.appendChild(item);
  	document.getElementById("windowTest").innerHTML = "" ;
	document.getElementById("windowTest2").innerHTML = "" ;
	document.getElementById("windowTest3").innerHTML = "" ;
	document.getElementById("message").innerHTML =  "";

  
}

// Update the calculations
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((bal, value) => (bal += value), 0);

  const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0);

  const expense =
    amounts
      .filter((value) => value < 0)
      .reduce((bal, value) => (bal += value), 0);

  balance.innerText = `$${total}`;
  inflow.innerText = `$${income}`;
  outflow.innerText = `$${expense}`;
}

// Remove transaction by ID and clear expenses and cash spend uin time period

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
	document.getElementById("windowTest").innerHTML = "" ;
	document.getElementById("windowTest2").innerHTML = "" ;
	document.getElementById("windowTest3").innerHTML = "" ;
	document.getElementById("message").innerHTML =  "";
  updateLocalStorage();

  start();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
//   alert(JSON.stringify(transactions, ["car","amount"], "\t"));

}

// Start app
function start() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

start();
form.addEventListener("submit", addTransaction);


// Car Expense Button
document.getElementById("carBtn").addEventListener("click", function() {
	var cars = transactions.map(transactions => transactions.category);
	var amounts = transactions.map(transactions => transactions.amount);	
	var costCar = 0;
	for (var i=0; i < transactions.length; i++) {
	if (cars[i] == "car") {
			costCar +=amounts[i];			
		}
	}
	document.getElementById("message").innerHTML = "<p> Car expense is: $" + costCar;

});

// Home Expense Button
document.getElementById("homeBtn").addEventListener("click", function() {
	var homes = transactions.map(transactions => transactions.category);
	var amounts = transactions.map(transactions => transactions.amount);	
	var costHome = 0;
	for (var i=0; i < transactions.length; i++) {
	if (homes[i] == "home") {
			costHome +=amounts[i];			
		}
	}
	document.getElementById("message").innerHTML =   "<p>Housing: $" + costHome + "</p>";
});

// Food Expense Button
document.getElementById("foodBtn").addEventListener("click", function() {
	var foods = transactions.map(transactions => transactions.category);
	var amounts = transactions.map(transactions => transactions.amount);	
	var foodCar = 0;
	for (var i=0; i < transactions.length; i++) {
	if (foods[i] == "food") {
			foodCar +=amounts[i];			
		}
	}
	document.getElementById("message").innerHTML =  "<p>Groceries cost is: $" + foodCar + "</p>";
});

//Week Button
document.getElementById("windowWeekBtn").addEventListener("click", function() {
	var amounts = transactions.map(transactions => transactions.amount);
	var date = transactions.map(transactions => transactions.date);
	
// Today's Date
	var today = new Date();
	today.setMinutes( today.getMinutes() + today.getTimezoneOffset() );

// end of week range
	var endDate2 = new Date();
	endDate2.setMinutes( endDate2.getMinutes() + endDate2.getTimezoneOffset() - 10080);

// Date to be Tested
	var targetDate = transactions.map(transactions => transactions.date);
	targetDate = new Date(targetDate);
	targetDate.setMinutes( targetDate.getMinutes() + targetDate.getTimezoneOffset() );
	
// Sum spent if date within week	
	var windowAmount = 0;
	for (var i = 0; i < transactions.length; i++) {
		if (Boolean(new Date(date[i]) < today && endDate2 < new Date(date[i]))) {
			windowAmount +=amounts[i];
		} 
	}
	document.getElementById("windowTest").innerHTML = windowAmount ;
});

//Month Button
document.getElementById("windowMonthBtn").addEventListener("click", function() {
	var amounts = transactions.map(transactions => transactions.amount);
	var date = transactions.map(transactions => transactions.date);
	
// Today's Date
	var today = new Date();
	today.setMinutes( today.getMinutes() + today.getTimezoneOffset() );

// end of month range
	var endDate2 = new Date();
	endDate2.setMinutes( endDate2.getMinutes() + endDate2.getTimezoneOffset() - 43800);

// Date to be Tested
	var targetDate = transactions.map(transactions => transactions.date);
	targetDate = new Date(targetDate);
	targetDate.setMinutes( targetDate.getMinutes() + targetDate.getTimezoneOffset() );
	
// Sum spent if date within month	
	var windowAmount = 0;
	for (var i = 0; i < transactions.length; i++) {
		if (Boolean(new Date(date[i]) < today && endDate2 < new Date(date[i]))) {
			windowAmount +=amounts[i];
		} 
	}
	document.getElementById("windowTest2").innerHTML =  windowAmount ;
});

//Year Button
document.getElementById("windowYearBtn").addEventListener("click", function() {
	var amounts = transactions.map(transactions => transactions.amount);
	var date = transactions.map(transactions => transactions.date);
	
// Today's Date
	var today = new Date();
	today.setMinutes( today.getMinutes() + today.getTimezoneOffset() );

// end of year range
	var endDate2 = new Date();
	endDate2.setMinutes( endDate2.getMinutes() + endDate2.getTimezoneOffset() - 525600);

// Date to be Tested
	var targetDate = transactions.map(transactions => transactions.date);
	targetDate = new Date(targetDate);
	targetDate.setMinutes( targetDate.getMinutes() + targetDate.getTimezoneOffset() );
	
// Sum spent if date within year	
	var windowAmount = 0;
	for (var i = 0; i < transactions.length; i++) {
		if (Boolean(new Date(date[i]) < today && endDate2 < new Date(date[i]))) {
			windowAmount +=amounts[i];
		} 
	}
	document.getElementById("windowTest3").innerHTML = windowAmount ;
});
