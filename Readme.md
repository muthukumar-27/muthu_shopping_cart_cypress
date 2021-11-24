**Steps for running the cypress testcase**

1. Run `npm install`
2. Run `node_modules/.bin/cypress open`
3. Run the shopping-test.js file displayed in the cypress application.

* Page classes are available in /cypress/integration/Shopping_cart_tests/page-objects
* Test class is available in /cypress/integration/Shopping_cart_tests/shopping-test.js
* Common code is available in /cypress/support/utils/common.js

**Test cases added handled in this code base**
1. Verifying if the cart is empty
2. Transition to best sellers section
3. Adding 2 items to cart and verifying the name and price of the item added.
4. Transitioning to cart page
5. Verifying the total amount in the cart page.

**Problems faced while writing the test case**

1. When the cart is empty, clicking on add to cart is making the api call but the items are not added to the cart.
The api call succeeds but returns the cart total as empty. Have added a fallback handling to click again if the add to cart option is not success.