const displayTotal = document.querySelector(".total-price");
const displayId = document.querySelector(".order-id");
let totalPrice = localStorage.getItem("totalCost");
let orderId = localStorage.getItem("orderID");

displayTotal.innerHTML = totalPrice + " €";
displayId.innerHTML = orderId;
localStorage.clear();
