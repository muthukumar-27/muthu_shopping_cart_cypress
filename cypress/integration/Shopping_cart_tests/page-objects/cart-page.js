import {
    convertCurrencyToNumber
  } from '../../../support/utils/common.js';
class cartPage
{

validateCartTotal()
{
    var totalComputedPrice = 0
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
}



}
export default cartPage

