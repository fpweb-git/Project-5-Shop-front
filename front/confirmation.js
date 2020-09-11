const displayTotal = document.querySelector(".total-price");
const displayId = document.querySelector(".order-id");
let totalPrice = localStorage.getItem("totalCost");
let orderId = localStorage.getItem("orderID");

async function displayOrder() {
	displayTotal.innerHTML = totalPrice + " €";
	displayId.innerHTML = orderId;
}

async function clearStorage() {
	localStorage.clear();
}

async function confirmationDone() {
	await displayOrder();
	await clearStorage();
}

confirmationDone();
