const dynamicPage = document.querySelector(".dynamic-page");
const productImg = document.querySelector(".image-produit");
const productName = document.querySelector(".nom-produit");
const productPrice = document.querySelector(".prix-produit");
const productDesc = document.querySelector(".description-produit");
const productOptions = document.querySelector(".options-produit");
const productBtn = document.querySelector(".btn-produit");
const inCart = document.querySelector(".in-cart");
const cartIcon = document.querySelector(".cart-icon");
let urlID = window.location.search.split("/")[1];

fetch(`http://localhost:3000/api/cameras/${urlID}`)
	.then((result) => result.json())
	.then((camera) => {
		function displayProduct() {
			//set image source to the each camera image of the api
			productImg.src = camera.imageUrl;
			//display name of each camera from api
			productName.innerText = camera.name;
			//display price of each camera from api
			productPrice.innerText = camera.price / 100 + " €";
			//display description of each camera from api
			productDesc.innerText = camera.description;
			//loop over lenses option
			camera.lenses.forEach((option) => {
				// creation new html tag for each option
				const options = document.createElement("option");
				// add class for bootstrap
				options.classList.add("dropdown-item");
				// display the text of each option
				options.innerText = option;
				// append this option to the html camera
				productOptions.appendChild(options);
			});
			// add event listener on add to cart button
			productBtn.addEventListener("click", function () {
				// call local storage function
				addToLocalStorage(product);
				totalCost(product);
			});
		}
		displayProduct();
		// create product array with and object
		const product = [
			{
				// get the camera form API
				name: camera.name,
				price: camera.price / 100,
				image: camera.imageUrl,
				id: camera._id,
				// get new camera to know how many product we have in cart
				inCart: 0,
			},
		];
		// Add item to local storage and display info
		function addToLocalStorage(product) {
			// define variable who get item on local storage
			let produitNbr = localStorage.getItem("produit");
			// convert string in number
			produitNbr = parseInt(produitNbr);
			// check if allready have product on local storage
			if (produitNbr) {
				// if product allready exist add 1 more
				localStorage.setItem("produit", produitNbr + 1);
				//display number of item in card if allready exist
				inCart.innerText = produitNbr + 1;
				// if no product
			} else {
				// if no product add 1
				localStorage.setItem("produit", 1);
				//display 1 item in card if no exist before
				inCart.innerText = 1;
				//change color of the cart icon
				cartIcon.classList.add("text-info");
			}
			setItemStore(product);
		}

		cartOnLoad();
		// get our product camera
		function setItemStore(product) {
			// get the item
			let cartItems = localStorage.getItem("productInCart");
			// parse to get javascript object
			cartItems = JSON.parse(cartItems);
			// check if we have item on storage
			if (cartItems) {
				//if the product name is different than the one allready on storage
				if (cartItems[camera.name] === undefined) {
					cartItems = {
						// expand cartItems (create copie)
						...cartItems,
						// set new carItems as the actual name and content
						[camera.name]: product[0],
					};
				}
				cartItems[camera.name].inCart++;
				// if allready we have add one to the value
			} else {
				// create new object
				cartItems = {
					// set object name and content
					[camera.name]: product[0],
				};
				cartItems[camera.name].inCart = 1;
			}
			// set add and convert in string product to localstore
			localStorage.setItem("productInCart", JSON.stringify(cartItems));
		}
		function totalCost(product) {
			// get a new store item called total cost
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
	// define variable who get the number of item on local storage
	const produitNbr = localStorage.getItem("produit");
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
