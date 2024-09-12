// Food items and prices
const foodName = [
    "Aaloo Paratha", "Appam", "Apple Pie", "BBQ Ribs", "Beef Wellington",
    "Bruschetta", "Butter Chicken", "Caesar Salad", "Chicken Burger",
    "Chicken Wings", "Chole Bhature", "Creme Brulee", "Dal Makhni", "Dosa",
    "French Fries", "Fried Chicken", "Grilled Chicken", "Gulab Jamun", "Hot Dog",
    "Kadhai Chicken", "Lasagna", "Lassi", "Mac and Cheese", "Mashed Potatoes",
    "Medu Vada", "Moussaka", "Mysore Pak", "Naan", "Neer Dosa", "Palak Paneer",
    "Pancakes", "Paneer Butter Masala", "Pasta", "Pesarattu", "Pongal", "Quiche",
    "Rasam", "Risotto", "Rogan Josh", "Sambhar Rice", "Steak", "Stuffed Pepper",
    "Tandoori Chicken", "Tiramisu", "Uttapam", "Vada", "Veg Burger"
];

// Corresponding image paths from the assets folder (all are .jpg files)
const foodImages = [
    "assets/aaloparatha.jpg", "assets/appam.jpg", "assets/applepie.jpg", "assets/bbqribs.jpg", "assets/beefwelington.jpg",
    "assets/buschetta.jpg", "assets/butterchicken.jpg", "assets/caesersalad.jpg", "assets/chickenburger.jpg", "assets/chickenwings.jpg",
    "assets/cholebhature.jpg", "assets/cremebrulee.jpg", "assets/dalmakhni.jpg", "assets/dosa.jpg", "assets/frenchfries.jpg",
    "assets/friedchicken.jpg", "assets/grilledchicken.jpg", "assets/gulabjamun.jpg", "assets/hotdog.jpg", "assets/kadhaichicken.jpg",
    "assets/lasgana.jpg", "assets/lassi.jpg", "assets/macandcheeese.jpg", "assets/mashedpotatoes.jpg", "assets/meduvada.jpg",
    "assets/moussaka.jpg", "assets/mysorepak.jpg", "assets/naan.jpg", "assets/neerdosa.jpg", "assets/palakpanner.jpg",
    "assets/pancakes.jpg", "assets/pannerbuttermassala.jpg", "assets/pasta.jpg", "assets/pesarattu.jpg", "assets/pongal.jpg",
    "assets/quiche.jpg", "assets/rasam.jpg", "assets/risotto.jpg", "assets/roganjosh.jpg", "assets/sambharrice.jpg", "assets/steak.jpg",
    "assets/stuffedpepper.jpg", "assets/tandoorichicken.jpg", "assets/tiramisu.jpg", "assets/uttapam.jpg", "assets/vada.jpg",
    "assets/vegburger.jpg"
];

// Prices for each food item
const price = [
    "5$", "3$", "7$", "10$", "15$", "4$", "8$", "6$", "5$", "6$", "4$", "7$", "6$", "3$", "2$", "9$", "10$", "4$", "5$", "8$",
    "7$", "2$", "5$", "3$", "2$", "9$", "4$", "1$", "3$", "7$", "5$", "8$", "6$", "3$", "4$", "7$", "2$", "9$", "10$", "6$",
    "15$", "7$", "10$", "6$", "4$", "2$", "5$"
];
  
  // Generate menu items
  const menuContainer = document.getElementById('menu-items');
  foodName.forEach((food, index) => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
  
    menuItem.innerHTML = `
      <img src="${foodImages[index]}" alt="${food}" class="menu-img">
      <div class="menu-info">
        <h3>${food}</h3>
        <p>Delicious and freshly prepared ${food}.</p>
        <div class="price-add">
          <span class="price">${price[index]}</span>
          <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      </div>
    `;
    menuContainer.appendChild(menuItem);
  });
  
  // Cart logic
let cart = [];

// Add to cart with quantity control
function addToCart(index) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === foodName[index]);
    
    if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity++;
    } else {
        // If the item doesn't exist, add it with a quantity of 1
        const selectedItem = {
            name: foodName[index],
            price: price[index],
            quantity: 1
        };
        cart.push(selectedItem);
    }
    displayCart();
}

// Function to increase quantity
function increaseQuantity(index) {
    if (cart[index].quantity < 10) {
        cart[index].quantity++;
    } else {
        alert("Maximum quantity reached.");
    }
    displayCart();
}

// Function to decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    displayCart();
}

/// Function to search and filter menu items, then scroll to the menu section
function searchMenu() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');
    let found = false; // To track if any item is found

    menuItems.forEach(item => {
        const foodName = item.querySelector('h3').textContent.toLowerCase();
        
        // Check if the item name contains the search query
        if (foodName.includes(query)) {
            item.style.display = 'block'; // Show matching items
            found = true;
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });

    // If no items are found, you can display an alert or show a message
    if (!found) {
        alert('No items found matching your search.');
    } else {
        // Scroll to the menu section if items are found
        document.getElementById('menu').scrollIntoView({
            behavior: 'smooth' // Smooth scrolling effect
        });
    }
}

// Allow pressing Enter to trigger the search function
document.getElementById('searchBar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMenu();
    }
});


// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear current cart display

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace('$', ''));
        return total + (itemPrice * item.quantity);
    }, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the index
    displayCart();
}

  function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
  function checkout() {
    alert('Proceeding to checkout');
  }
  
  function orderNow() {
    alert('Order now clicked!');
  }
  
  function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear current cart display

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <div class="remove-control">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();
}
