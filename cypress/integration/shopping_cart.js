import {
    addVerifyItemToCart,
    convertCurrencyToNumber
  } from './support/utils/common.js';
  
  describe('Shopping cart success flow', () => {
  
    it('Checking shopping cart is empty', () => {
      cy.visit('http://automationpractice.com/index.php')
      cy.get('.shopping_cart .ajax_cart_quantity').should('have.text', '0')
    })
    it('Adding items from bestsellers section and verifying item details', () => {
      var totalComputedPrice = 0
      cy.get('#home-page-tabs .blockbestsellers').click()
      addVerifyItemToCart(0)
      addVerifyItemToCart(1)
      cy.get('.shopping_cart > a').click()
  
      cy.get('#cart_summary tbody tr').each(($el, index) => {
        let priceAmount = convertCurrencyToNumber($el.find('.cart_total .price').text().trim());
        totalComputedPrice += priceAmount
        cy.wrap(totalComputedPrice).as('totalComputedPrice')
      })
  
      cy.get('#cart_summary').then(($cartSummary) => {
        const shippingCost = convertCurrencyToNumber($cartSummary.find('#total_shipping').text().trim())
        const totalAmount = convertCurrencyToNumber($cartSummary.find('#total_price').text().trim())
        cy.get('@totalComputedPrice').then(totalComputedPrice => {
          expect(totalAmount).to.equal(totalComputedPrice + shippingCost)
        });
      })
     
    })
  })