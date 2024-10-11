// Menu Data
const menu = [
    { name: 'Jollof Rice', price: 1500 },
    { name: 'Pounded Yam and Egusi Soup', price: 2000 },
    { name: 'Amala and Ewedu', price: 1800 },
    { name: 'Pepper Soup', price: 1300 },
    { name: 'Suya', price: 1000 },
    { name: 'Moi Moi', price: 500 }
  ];
  
  // Orders Storage
  let orders = [];
  
  // Display Menu Items
  function displayMenu() {
      const menuList = document.getElementById('menu-list');
      const dishSelect = document.getElementById('dish-select');
  
      menu.forEach(item => {
          // Create Bootstrap Card for Each Dish
          let card = `
              <div class="col-md-4">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text">₦${item.price}</p>
                      </div>
                  </div>
              </div>
          `;
          menuList.innerHTML += card;
  
          // Add dish to select dropdown
          let option = `<option value="${item.name}">${item.name}</option>`;
          dishSelect.innerHTML += option;
      });
  }
  
  // Take an Order
  function takeOrder(customerID, selectedDishes) {
      if (!orders[customerID]) {
          orders[customerID] = [];
      }
      selectedDishes.forEach(dishName => {
          const dish = menu.find(item => item.name === dishName);
          if (dish) {
              orders[customerID].push(dish);
          }
      });
      showOrder(customerID);
  }
  
  // Calculate Total Bill
  function calculateTotal(customerID) {
      if (!orders[customerID]) return 0;
      return orders[customerID].reduce((total, dish) => total + dish.price, 0);
  }
  
  // Show Order Summary
  function showOrder(customerID) {
      const summary = document.getElementById('order-summary');
      if (!orders[customerID] || orders[customerID].length === 0) {
          summary.innerHTML = `<p>No orders placed yet.</p>`;
          document.getElementById('clear-order').style.display = 'none';
          return;
      }
  
      let orderDetails = '<ul>';
      orders[customerID].forEach(dish => {
          orderDetails += `<li>${dish.name} - ₦${dish.price}</li>`;
      });
      orderDetails += '</ul>';
      const total = calculateTotal(customerID);
  
      summary.innerHTML = `
          <h4>Customer ID: ${customerID}</h4>
          ${orderDetails}
          <p><strong>Total:</strong> ₦${total}</p>
      `;
      document.getElementById('clear-order').style.display = 'block';
  }
  
  // Event Listener for Order Form Submission
  document.getElementById('order-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const customerID = document.getElementById('customer-id').value;
      const selectedDishes = Array.from(document.getElementById('dish-select').selectedOptions).map(option => option.value);
  
      if (customerID && selectedDishes.length > 0) {
          takeOrder(customerID, selectedDishes);
      } else {
          alert('Please enter a valid customer ID and select dishes.');
      }
  });
  
  // Event Listener for Clear Order Button
  document.getElementById('clear-order').addEventListener('click', function() {
      const customerID = document.getElementById('customer-id').value;
      if (customerID) {
          orders[customerID] = [];
          showOrder(customerID);
      } else {
          alert('Please enter a valid customer ID.');
      }
  });
  
  // Initialize Menu Display on Page Load
  document.addEventListener('DOMContentLoaded', displayMenu);
  