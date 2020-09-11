const displayTotal = document.querySelector(".total-price");
const displayId = document.querySelector(".order-id");
let totalPrice = localStorage.getItem("totalCost");
let orderId = localStorage.getItem("orderID");

// show info on ui
async function displayOrder() {
	displayTotal.innerHTML = totalPrice + " €";
	displayId.innerHTML = orderId;
}

//clear the local storage
async function clearStorage() {
	localStorage.clear();
}

// call async function
async function confirmationDone() {
	await displayOrder();
	await clearStorage();
}

confirmationDone();
