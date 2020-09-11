const dynamicPage = document.querySelector(".dynamic-page");
const productImg = document.querySelector(".image-produit");
const productName = document.querySelector(".nom-produit");
const productPrice = document.querySelector(".prix-produit");
const productDesc = document.querySelector(".description-produit");
const productOptions = document.querySelector(".options-produit");
const productBtn = document.querySelector(".btn-produit");
const inCart = document.querySelector(".in-cart");
const cartIcon = document.querySelector(".cart-icon");
//get the item id from the url
let urlID = window.location.search.split("/")[1];
// get the camera data from the db
fetch(`http://localhost:3000/api/cameras/${urlID}`)
	.then((result) => result.json())
	.then((camera) => {
		//display the product on the page
		function displayProduct() {
			productImg.src = camera.imageUrl;
			productName.innerText = camera.name;
			productPrice.innerText = camera.price / 100 + " €";
			productDesc.innerText = camera.description;
			// display options
			camera.lenses.forEach((option) => {
				const options = document.createElement("option");
				options.classList.add("dropdown-item");
				options.innerText = option;
				productOptions.appendChild(options);
			});
		}
		displayProduct();
		// add event listener on add to cart button
		productBtn.addEventListener("click", function () {
			// call local storage function
			setNumberOfItems();
			totalCost(product);
			setItemStore(product);
		});

		// create product array with and object
		const product = [
			{
				name: camera.name,
				price: camera.price / 100,
				image: camera.imageUrl,
				id: camera._id,
				inCart: 0,
			},
		];
		// Add item to local storage
		function setNumberOfItems() {
			// Number of product in Cart
			let produitNbr = localStorage.getItem("produit");
			// convert string in number
			produitNbr = parseInt(produitNbr);
			// check if allready have product on local storage
			if (produitNbr) {
				// if product allready exist add 1 more
				localStorage.setItem("produit", produitNbr + 1);
				//display on UI
				inCart.innerText = produitNbr + 1;
				// if no product
			} else {
				// if no product add 1
				localStorage.setItem("produit", 1);
				//display on UI
				inCart.innerText = 1;
				//change color of the cart icon
				cartIcon.classList.add("text-info");
			}
		}
		// Save the item
		function setItemStore(product) {
			let cartItems = localStorage.getItem("productInCart");
			cartItems = JSON.parse(cartItems);
			// check if we have item on storage
			if (cartItems) {
				// if we have the same camera we use the undefined error
				if (cartItems[camera.name] === undefined) {
					cartItems = {
						// expand cartItems (create copie)
						...cartItems,
						// set new carItems as the actual name and content
						[camera.name]: product[0],
					};
				}
				cartItems[camera.name].inCart++;
				// if we don't have the camera
			} else {
				cartItems = {
					[camera.name]: product[0],
				};
				cartItems[camera.name].inCart = 1;
			}
			localStorage.setItem("productInCart", JSON.stringify(cartItems));
		}

		// Save total cost
		function totalCost(product) {
			let total = localStorage.getItem("totalCost");
			// convert string to number
			total = parseInt(total);
			// if we allready have one number inside
			if (total) {
				// get the first one and add the product price everytime
				localStorage.setItem("totalCost", total + product[0].price);
				// If have no number inside
			} else {
				// set the number to the price of the item
				localStorage.setItem("totalCost", product[0].price);
			}
		}
	});

// display cart number of item anytime
function cartOnLoad() {
	const produitNbr = localStorage.getItem("produit");
	// if we have product in cart on local storage
	if (produitNbr) {
		inCart.innerText = produitNbr;
		cartIcon.classList.add("text-info");
	}
	if (produitNbr === "0") {
		cartIcon.classList.remove("text-info");
	}
}
cartOnLoad();
