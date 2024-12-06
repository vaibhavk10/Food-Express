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

// Popular Food items and their details
const popularFoodName = [
    "Tandoori Chicken", "Caesar Salad",
    "BBQ Ribs", "Paneer Butter Masala", "Dal Makhni", "Creme Brulee", "Lasagna",
    "French Fries", "Butter Chicken", "Chicken Wings", "Steak", "Lassi"
];

// Corresponding image paths from the assets folder (all are .jpg files)
const popularFoodImages = [
    "assets/tandoorichicken.jpg", "assets/caesersalad.jpg", 
    "assets/bbqribs.jpg", "assets/pannerbuttermassala.jpg", "assets/dalmakhni.jpg", "assets/cremebrulee.jpg", "assets/lasgana.jpg",
    "assets/frenchfries.jpg", "assets/butterchicken.jpg", "assets/chickenwings.jpg", "assets/steak.jpg", "assets/lassi.jpg"
];

// Prices for each popular food item
const popularPrice = [
    "15$", "8$", "9$", "10$", "6$", "7$", "12$",
    "4$", "8$", "6$", "15$", "2$"
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
  

  // Function to generate popular items dynamically
function displayPopularItems() {
    const popularGrid = document.getElementById('popular-items-grid');
  
    popularFoodName.forEach((food, index) => {
      const popularItem = document.createElement('div');
      popularItem.classList.add('popular-item');
      
      popularItem.innerHTML = `
        <img src="${popularFoodImages[index]}" alt="${food}">
        <h3>${food}</h3>
        <p>${popularPrice[index]}</p>
      `;
  
      popularGrid.appendChild(popularItem);
    });
  }
  
  // Call the function to display the popular items on page load
  window.onload = displayPopularItems;

  
  
  // Cart logic
let cart = [];

function addToCart(index) {
    const existingItem = cart.find(item => item.name === foodName[index]);
    
    if (existingItem) {
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
            item.style.display = 'block'; 
            found = true;
        } else {
            item.style.display = 'none';
        }
    });

    if (!found) {
        alert('No items found matching your search.');
    } else {
        document.getElementById('menu').scrollIntoView({
            behavior: 'smooth' 
        });
    }
}

document.getElementById('searchBar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMenu();
    }
});


// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; 

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
    cart.splice(index, 1); 
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
    cartContainer.innerHTML = ''; 

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
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: json
  })
  .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
          result.innerHTML = "Form submitted successfully";
      } else {
          console.log(response);
          result.innerHTML = json.message;
      }
  })
  .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
  })
  .then(function() {
      form.reset();
      setTimeout(() => {
          result.style.display = "none";
      }, 3000);
  });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('Menu clicked'); // For debugging
        });
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});