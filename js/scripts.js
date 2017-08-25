// Business Logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

// UI Logic
$(document).ready(function() {
  $("form#order").submit(function(event) {
    event.preventDefault();
    var size = $("select#size").val();
    var toppings = $("input#toppings").val().split(",");

    var pizzaOrder = new Pizza(size, toppings);
    $(".order-confirm").append("<p class='pizza-order'>"+size+" Pizza</p>");
    $(".pizza-order").last().click(function() {
      console.log(pizzaOrder);
    });
  });
});
