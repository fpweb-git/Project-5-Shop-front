//variable
const itemList = document.querySelector(".list-item");
const inCart = document.querySelector(".in-cart");

// display item form API
fetch(`http://localhost:3000/api/cameras/`)
	.then((result) => result.json())
	.then((data) => {
		// display each item on the page
		data.forEach((element) => {
			//create div card
			const itemCard = document.createElement("div");
			itemCard.classList.add("card");
			itemCard.classList.add("m-3");
			itemCard.classList.add("shadow-sm");
			itemCard.style.width = "18rem";
			itemCard.innerHTML = `<img class="card-img-top" src="${
				element.imageUrl
			}">
		<div class="card-body">
			<h5 class="card-title text-primary">${element.name}</h5>
			<p class="card-text font-weight-bold">${element.price / 100 + " €"}</p>
			<p class="card-text">${element.description}</p>
			<a href="./produit.html?/${element._id}" class="stretched-link"></a>
		</div>`;
			//display all items on the UI
			itemList.appendChild(itemCard);
		});
	});

// display product in cart on load
function cartOnLoad() {
	// define variable who get the number of item on local storage
	const produitNbr = localStorage.getItem("produit");
	const cartIcon = document.querySelector(".cart-icon");
	// if we have product in cart on local storage
	if (produitNbr) {
		// display the value on the cart
		inCart.innerText = produitNbr;
		cartIcon.classList.add("text-info");
	}
	if (produitNbr === "0") {
		cartIcon.classList.remove("text-info");
	}
}
cartOnLoad();
