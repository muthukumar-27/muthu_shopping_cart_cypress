import homePage from './page-objects/home-page';
import cartPage from './page-objects/cart-page';


const homePageObj = new homePage();
const cartPageObj = new cartPage();

describe('Shopping cart success flow', () => {
  before(function () {

    homePageObj.navigate();
  })

  it('Checking cart is empty', () => {

    homePageObj.validateEmptyCart();
  })

  it('Adding items to cart', () => {
    homePageObj.navigateBestSeller();
    homePageObj.addItemsToCart(0);
    homePageObj.verifyItemsInCart(0);
    homePageObj.addItemsToCart(1);
    homePageObj.verifyItemsInCart(1);
    homePageObj.navigateToCart();
  })
  
  it('Verifying item details', () => {

    cartPageObj.validateCartTotal();

  })

})