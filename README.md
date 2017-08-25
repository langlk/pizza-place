# Pizza Place

## Specifications

* The program takes input from the user and prints the user's choices.
  * Example Input: Size="Medium",Toppings=["Cheese", "Pepperoni"]
  * Example Output: "Size: Medium", "Toppings: Cheese, Pepperoni"

* Program stores information provided by user and displays again when prompted.
  * Example Input: [Show Pizza]
  * Example Output: "Size: Medium", "Toppings: Cheese, Pepperoni"

* Program returns cost of pizza, calculated as follows:
  * A default pizza has one or zero toppings.
  * For a default pizza, the cost is $7 for a small, $10 for a medium, and $15 for a large.
    * Example Input: Size="Large", Toppings=["Cheese"]
    * Example Output: "Cost: $15"
  * If there are two or three toppings, 50 cents each is added for the second and third toppings.
    * Example Input: Size="Small", Toppings=["Cheese", "Canadian Bacon", "Pineapple"]
    * Example Output: "Cost: $8"
  * If there are four or more toppings, each additional topping is $1.
    * Example Input: Size="Medium", Toppings=["Cheese", "Sausage", "Pepperoni", "Mushrooms", "Olives"]
    * Example Output: "Cost: $13"
