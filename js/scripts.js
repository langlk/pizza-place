$(document).ready(function() {
  $("form#order").submit(function(event) {
    event.preventDefault();
    var size = $("select#size").val();
    var toppings = $("input#toppings").val().split(",");
    console.log("Size: " + size);
    console.log("Toppings: " + toppings);
  });
});
