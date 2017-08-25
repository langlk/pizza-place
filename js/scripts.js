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

function Order(name) {
  this.name = name;
  this.pizzas = [];
}

// UI Logic
$(document).ready(function() {
  $("#add").click(function() {
    var firstOrder = document.getElementById("first-pizza-order");
    var nextOrder = firstOrder.cloneNode(true);
    nextOrder.id = "";
    $("#add").before(nextOrder);
    $('#size:last-of-type').prop('selectedIndex',0);
    $(".pizza-order:last-of-type input[type=checkbox]").each(function() {
      this.checked= false;
    });
  });

  $("#order").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var newOrder = new Order(name);

    var size = $("[name=size]").val();
    var toppings = [];
    $("input:checkbox[name=topping]:checked").each(function() {
      toppings.push(this.value);
    });
    var pizzaOrder = new Pizza(size, toppings);
    newOrder.pizzas.push(pizzaOrder);
    console.log(newOrder);
    $("#order").hide();
    $(".order-confirm").show();
    $(".size").text(pizzaOrder.size);
    $(".toppings").empty();
    pizzaOrder.toppings.forEach(function(topping) {
      $(".toppings").append("<li>" + topping + "</li>");
    });
    $(".cost").text("$" + pizzaOrder.cost().toFixed(2));
  });

  $("#edit").click(function() {
    $("#order").show();
    $(".order-confirm").hide();
  });

  $("#confirm").click(function() {
    $(".order-confirm").hide();
    $(".confirmation").show();
  });
});
