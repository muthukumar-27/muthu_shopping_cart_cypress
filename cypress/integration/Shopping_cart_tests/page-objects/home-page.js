
class homePage{

    
navigate()
{
    cy.visit('http://automationpractice.com/index.php')  
}
validateEmptyCart()
{
    cy.get('.shopping_cart .ajax_cart_quantity').should('have.text', '0')
}
navigateBestSeller()
{
      cy.get('#home-page-tabs .blockbestsellers').click()
}
addItemsToCart(itemNo)
{
    cy.server()
    cy.route('POST', '/index.php?rand=**').as('addToCart')
    cy.get(`#blockbestsellers li:eq(${itemNo}) .product-container .ajax_add_to_cart_button`).click()
    cy.wait("@addToCart");
  
    // Adding to cart is not working sometimes eventhough the api call is made properly. 
    // Adding this as a fallback to click again if the cart popup is not shown
    cy.get('#layer_cart').then(($layer_cart) => {
      if ($layer_cart.css('display') == 'none') {
        cy.get(`#blockbestsellers li:eq(${itemNo}) .product-container .ajax_add_to_cart_button`).click()
        cy.wait("@addToCart");
      }
    });
}

verifyItemsInCart(itemNo)
{
     // Checking product name with item added in the cart
    cy.get(`#blockbestsellers li:eq(${itemNo}) .product-name`).then(($productName) => {
        const productName = $productName.text().trim()
        cy.get('#layer_cart .product-name').should('have.text', productName)
      })
    
      // Checking product price with item added in the cart
      cy.get(`#blockbestsellers li:eq(${itemNo}) .right-block .content_price > .price.product-price`).then(($productPrice) => {
        const productPrice = $productPrice.text().trim()
        cy.get('#layer_cart #layer_cart_product_price').should('have.text', productPrice)
      })
      cy.get('#layer_cart .button-container .continue').click()
}
navigateToCart()
{
    cy.get('.shopping_cart > a').click()

}


}export default homePage
