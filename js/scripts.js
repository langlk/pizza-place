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

// UI Logic
$(document).ready(function() {
  $("#order").submit(function(event) {
    event.preventDefault();
    var size = $("#size").val();
    var toppings = [];
    $("input:checkbox[name=topping]:checked").each(function() {
      toppings.push(this.value);
    });
    var pizzaOrder = new Pizza(size, toppings);

    $("#order").hide();
    $(".order-confirm").show();
    $(".size").text(pizzaOrder.size);
    $(".toppings").empty();
    toppings.forEach(function(topping) {
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
