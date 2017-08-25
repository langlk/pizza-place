// Business Logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.cost = function() {
  sizeCosts = {"Small": 7, "Medium": 10, "Large": 15};
  return sizeCosts[this.size];
}

// UI Logic
$(document).ready(function() {
  $("form#order").submit(function(event) {
    event.preventDefault();
    var size = $("select#size").val();
    var toppings = $("input#toppings").val().split(",");

    var pizzaOrder = new Pizza(size, toppings);
    console.log(pizzaOrder.cost());
  });
});
