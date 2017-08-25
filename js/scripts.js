// Business Logic

// Stores information on a Pizza
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

// Calculate Pizza Cost:
// Small=$7, Medium=$10, Large=$15
// First topping is free
// Second and Third toppings are $0.50 each
// All toppings after are $1 each
Pizza.prototype.cost = function() {
  var sizeCosts = {"Small": 7, "Medium": 10, "Large": 15};
  var totalCost = sizeCosts[this.size];
  var totalToppings = this.toppings.length;
  if (totalToppings > 3) {
    totalCost += totalToppings - 3;
    totalToppings -= (totalToppings - 3);
  }
  if (totalToppings > 1) {
    totalCost += (totalToppings - 1) * .5;
    totalToppings -= 2;
  }
  return totalCost;
}

// Return an English description of the number of toppings
Pizza.prototype.toppingString = function() {
  if (this.toppings.length > 0) {
    return this.toppings.length + "-topping";
  } else {
    return "Plain";
  }
}

// Stores information about customer's order
function Order(name) {
  this.name = name;
  this.pizzas = [];
}

// Returns number of pizzas in order
Order.prototype.totalPizzas = function() {
  return this.pizzas.length;
}

// Determines total cost of order
Order.prototype.cost = function() {
  var totalCost = 0;
  this.pizzas.forEach(function(pizza) {
    totalCost += pizza.cost();
  });
  return totalCost;
}

// UI Logic

// Adds pizza details to correct section of page based on index
function addPizzaDetails(pizza, index) {
  // classString stores the class to append to each jQuery call
  var classString = ".pizza-details-" + index + " ";

  $(classString + ".size").text(pizza.size);
  $(classString + ".topping-number").text(pizza.toppingString());

  // Don't want to show toppings subheader if pizza has no toppings
  if (pizza.toppingString() === "Plain") {
    $(classString + ".has-toppings").hide();
  } else {
    $(classString + ".has-toppings").show();
    pizza.toppings.forEach(function(topping) {
      $(classString + ".toppings").append("<li>" + topping + "</li>");
    });
  }

  $(classString + ".cost").text("$" + pizza.cost().toFixed(2));
}

// Updates order details for new (or edited) order
function updateOrderConfirmation(newOrder) {
  // Make sure to remove leftovers if editing existing order
  $(".toppings").empty();
  $(".additional-pizzas").empty();

  $(".name").text(newOrder.name);

  // Make enough sections to show each pizza in order
  for (var i = 2; i <= newOrder.totalPizzas(); i++) {
    var firstOrder = document.getElementById("pizza-details-1");
    var nextOrder = firstOrder.cloneNode(true);
    nextOrder.id = "";
    nextOrder.className = "pizza-details-" + i;
    $(".additional-pizzas").append(nextOrder);
  }
  // Fill out pizza orders with information
  for (var i = 1; i <= newOrder.totalPizzas(); i++) {
    addPizzaDetails(newOrder.pizzas[i-1], i);
  }

  $(".total").text("$" + newOrder.cost().toFixed(2));
}

$(document).ready(function() {
  // Function to add another Pizza to order form.
  $("#add").click(function() {
    // Duplicate the pizza order form
    var firstOrder = document.getElementById("first-pizza-order");
    var nextOrder = firstOrder.cloneNode(true);

    // Remove id, add class to hide till ready
    nextOrder.id = "";
    nextOrder.className += " initially-hidden";

    // Add just before form's buttons
    $("#add").before(nextOrder);
    // Add in "remove" button and clear fields
    $(".pizza-order:last-of-type").append("<div class='remove'>Remove This Pizza</div>");
    $('#size:last-of-type').prop('selectedIndex',0);
    $(".pizza-order:last-of-type input[type=checkbox]").each(function() {
      this.checked= false;
    });
    // Display
    $(".initially-hidden:last-of-type").slideDown();

    // Add click listener to "remove" so it will delete this pizza's div
    $(".remove").last().click(function() {
      $(this).parent().slideUp();
      setTimeout(function() {
        nextOrder.remove();
      },700);
    });
  });

  // Someone submits an order
  $("#order").submit(function(event) {
    event.preventDefault();
    // Set up Order object
    var name = $("#name").val();
    var newOrder = new Order(name);

    // Make a new pizza object for each pizza order in form, add to newOrder
    $(".pizza-order").each(function() {
      var size = $(this).find("[name=size]").val();
      var toppings = [];
      $(this).find("input:checkbox[name=topping]:checked").each(function() {
        toppings.push(this.value);
      });
      var pizzaOrder = new Pizza(size, toppings);
      newOrder.pizzas.push(pizzaOrder);
    });

    $("#order").hide();
    $(updateOrderConfirmation(newOrder));
    $(".order-details").fadeIn();
  });

  // If someone wants to edit their order, simply brings them back to form
  // Since submit preventDefaults, user input is still there to edit
  $("#edit").click(function() {
    $(".order-details").hide();
    $("#order").fadeIn();
  });

  // Changes details to show confirmation, then Fades in on all details at once.
  $("#confirm").click(function() {
    $(".order-confirm").hide();
    $(".confirmation").show();
    $(".order-details").hide();
    $(".order-contents").addClass("col-sm-5");
    $(".order-details").fadeIn();
  });

  // Price Guide show/hide
  $(".price-guide").click(function() {
    $(".price-list").slideToggle();
  });
});
