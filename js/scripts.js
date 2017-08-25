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
  $("form#order").submit(function(event) {
    event.preventDefault();
    var size = $("select#size").val();
    var toppings = $("input:checkbox[name=topping]:checked").map(function() {
      return this.value;
    });
    console.log(toppings);
    var pizzaOrder = new Pizza(size, toppings);
    console.log(pizzaOrder.cost());
  });
});
