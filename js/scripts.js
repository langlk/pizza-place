// Business Logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

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

Pizza.prototype.toppingNumber = function() {
  return this.toppings.length;
}

function Order(name) {
  this.name = name;
  this.pizzas = [];
}

Order.prototype.totalPizzas = function() {
  return this.pizzas.length;
}

Order.prototype.cost = function() {
  var totalCost = 0;
  this.pizzas.forEach(function(pizza) {
    totalCost += pizza.cost();
  });
  return totalCost;
}

// UI Logic
$(document).ready(function() {
  $("#add").click(function() {
    var firstOrder = document.getElementById("first-pizza-order");
    var nextOrder = firstOrder.cloneNode(true);
    nextOrder.id = "";
    nextOrder.className += " initially-hidden";
    $("#add").before(nextOrder);
    $(".pizza-order:last-of-type").append("<div class='remove'>Remove This Pizza</div>");
    $('#size:last-of-type').prop('selectedIndex',0);
    $(".pizza-order:last-of-type input[type=checkbox]").each(function() {
      this.checked= false;
    });
    $(".initially-hidden:last-of-type").slideDown();
    $(".remove").last().click(function() {
      $(this).parent().slideUp();
      setTimeout(function() {
        nextOrder.remove();
      },700);
    });
  });

  $("#order").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var newOrder = new Order(name);

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
    $(".toppings").empty();
    $(".additional-pizzas").empty();
    $(".name").text(newOrder.name);
    for (var i = 2; i <= newOrder.totalPizzas(); i++) {
      var firstOrder = document.getElementById("pizza-details-1");
      var nextOrder = firstOrder.cloneNode(true);
      nextOrder.id = "";
      nextOrder.className = "pizza-details-" + i;
      $(".additional-pizzas").append(nextOrder);
    }
    for (var i = 1; i <= newOrder.totalPizzas(); i++) {
      var pizza = newOrder.pizzas[i-1];
      $(".pizza-details-" + i + " .size").text(pizza.size);
      $(".pizza-details-" + i + " .topping-number").text(pizza.toppingNumber() + "-Topping");
      pizza.toppings.forEach(function(topping) {
        $(".pizza-details-" + i + " .toppings").append("<li>" + topping + "</li>");
      });
      $(".pizza-details-" + i + " .cost").text("$" + pizza.cost().toFixed(2));
    }
    $(".total").text("$" + newOrder.cost().toFixed(2));
    $(".order-details").fadeIn();
  });

  $("#edit").click(function() {
    $(".order-details").hide();
    $("#order").fadeIn();
  });

  $("#confirm").click(function() {
    $(".order-confirm").hide();
    $(".confirmation").show();
    $(".order-details").hide();
    $(".order-contents").addClass("col-sm-5");
    $(".order-details").fadeIn();
  });
});
