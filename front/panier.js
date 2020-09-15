const cartList = document.querySelector(".item-cart-list");
const emptyCartMsg = document.querySelector(".empty-cart");
const totalPrice = document.querySelector(".total-price");
const orderBtn = document.querySelector(".order");
const formFull = document.querySelector(".cart-form");
const formEmail = document.querySelector("#email");
const formName = document.querySelector("#nom");
const formFirstName = document.querySelector("#prenom");
const formAdress = document.querySelector("#adresse");
const formCity = document.querySelector("#ville");
const formPopup = document.querySelector(".popup");
let itemInCartList = localStorage.getItem("productInCart");
itemInCartList = JSON.parse(itemInCartList);
let products = Object.values(itemInCartList);

// check if we have item on local storage and add to the UI
if (itemInCartList !== null) {
	products.forEach((product) => {
		const productUI = document.createElement("div");
		productUI.innerHTML = `
        <li class="my-5 p-4 rounded shadow bg-light position-relative cart-block-item">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div class="w-75 d-flex align-items-center item-cart-rsp">
            <img src="${product.image}" class="cart-img"></img>
            <p class="m-0 pl-3">${product.name}</p>
            </div>
            <p class="m-0 mr-3">${"x " + product.inCart}</p>
			<p class="m-0">${product.price + " €"}</p>
			<i class="fas fa-trash text-danger delete-btn ml-1"></i>
        </div>
        </li>
        `;
		cartList.appendChild(productUI);
		emptyCartMsg.style.display = "none";
	});
}

// display total price
function displayTotalPrice() {
	const total = localStorage.getItem("totalCost");
	totalPrice.innerText = total + " €";
}

displayTotalPrice();

//delete product
const deleteBtn = document.querySelectorAll(".delete-btn");

deleteBtn.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		//update total price
		let totalBefore = localStorage.getItem("totalCost");
		const upTotal =
			totalBefore - products[index].inCart * products[index].price;
		localStorage.setItem("totalCost", JSON.stringify(upTotal));
		totalPrice.innerText = upTotal + " €";
		// update product in cart number
		let totalNrBefore = localStorage.getItem("produit");
		const upTotalNr = totalNrBefore - products[index].inCart;
		localStorage.setItem("produit", JSON.stringify(upTotalNr));

		// remove from local storage
		products.splice(index, 1);
		localStorage.setItem("productInCart", JSON.stringify(products));
		location.reload();

		// empty cart text comeback
		if (localStorage.getItem("produit") === "0") {
			emptyCartMsg.style.display = "inherit";
		}
	});
});

// Send the order
function sendOrder() {
	formFull.addEventListener("submit", (e) => {
		e.preventDefault();
		if (
			checkEmailInput() === false ||
			checkNameInput() === false ||
			checkSurnameInput() === false ||
			checkAdressInput() === false ||
			checkCityInput() === false
		) {
			checkEmailInput();
			checkNameInput();
			checkSurnameInput();
			checkAdressInput();
			checkCityInput();
		} else {
			getFormData();
			formPopup.style.display = "flex";
			setTimeout(function () {
				window.open("./confirmation.html", "_self");
			}, 2000);
		}
	});
}

// check email value
function checkEmailInput() {
	const emailErr = document.querySelector("#email-err");
	if (formEmail.value === "" || formEmail.value.includes("@") === false) {
		formEmail.classList.add("error");
		emailErr.style.opacity = "1";
		return false;
	} else {
		if (formEmail.classList.contains("error")) {
			formEmail.classList.remove("error");
			emailErr.style.opacity = "0";
		}
		formEmail.classList.add("success");
	}
}
// check name value
function checkNameInput() {
	const nameErr = document.querySelector("#name-err");
	if (formName.value === "") {
		formName.classList.add("error");
		nameErr.style.opacity = "1";
		return false;
	} else {
		if (formName.classList.contains("error")) {
			formName.classList.remove("error");
			nameErr.style.opacity = "0";
		}
		formName.classList.add("success");
	}
}
// check surname value
function checkSurnameInput() {
	const firstNameErr = document.querySelector("#surname-err");
	if (formFirstName.value === "") {
		formFirstName.classList.add("error");
		firstNameErr.style.opacity = "1";
		return false;
	} else {
		if (formFirstName.classList.contains("error")) {
			formFirstName.classList.remove("error");
			firstNameErr.style.opacity = "0";
		}
		formFirstName.classList.add("success");
	}
}
// check adress value
function checkAdressInput() {
	const adressErr = document.querySelector("#adress-err");
	if (formAdress.value === "") {
		formAdress.classList.add("error");
		adressErr.style.opacity = "1";
		return false;
	} else {
		if (formAdress.classList.contains("error")) {
			formAdress.classList.remove("error");
			adressErr.style.opacity = "0";
		}
		formAdress.classList.add("success");
	}
}
//check city value
function checkCityInput() {
	const cityErr = document.querySelector("#city-err");
	if (formCity.value === "") {
		formCity.classList.add("error");
		cityErr.style.opacity = "1";
		return false;
	} else {
		if (formCity.classList.contains("error")) {
			formCity.classList.remove("error");
			cityErr.style.opacity = "0";
		}
		formCity.classList.add("success");
	}
}

// get form data
function getFormData() {
	let formContent = {
		contact: {
			firstName: formName.value,
			lastName: formFirstName.value,
			address: formAdress.value,
			city: formCity.value,
			email: formEmail.value,
		},
		products: [],
	};

	products.forEach((item) => {
		const itemId = item.id;
		formContent.products.push(itemId);
	});

	console.log(formContent);
	fetch("http://localhost:3000/api/cameras/order", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formContent),
	})
		.then((response) => {
			if (response.ok) {
				console.log(response);
				return response.json();
			}
			return Promise.reject(response);
		})
		.then((result) => localStorage.setItem("orderID", result.orderId))
		.catch((error) => console.log(error));
}
sendOrder();
