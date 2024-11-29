import Navigo from 'navigo';
import { startPage } from './loadingPage.js';
import { welcomePage } from './onbordingPage.welcome.js';
import { onbordPage1 } from './onbordingPage1.js';
import { onbordPage2 } from './onbordingPage2.js';
import { onbordPage3 } from './onbordingpage3.js';
import { homePage } from './homePage.js';
import { productPage } from './products.js';
import { brandsPage } from './brandsPage.js';
import { cartPage } from './cartPage.js';
import { shoppingPage } from './shoppingPage.js';
import { checkoutPage } from './checkoutPage.js';
import { pageAddresses } from './pageAddresses.js';
import { orderPage } from './orderPage.js';

const app = document.getElementById('app');

function render(page){
    app.innerHTML = '';
    app.append(page);
}

export const router = new Navigo('/');

router
.on('/loading',async function () {
   
    render(startPage())
  })
  .on('/welcome',async function () {
    
    render(welcomePage())
  })
  .on('/obp1',async function () {
    
    render(onbordPage1())
  })
  .on('/obp2',async function () {
    
    render(onbordPage2())
  })
  .on('/obp3',async function () {
   
    render(onbordPage3())
  })
  .on(`/login`,async function () {
    const {loginPage} = await import('./loginPage.js');
    render(loginPage())
  })
  .on(`/home`,async function () {
    render(homePage())
  })
  .on('/product/:id', async (params) =>{
    render(productPage(params.data.id));
  })
  .on('/brands/:brand', async (params) =>{
    render(brandsPage(params.data.brand));
    getBrandData()
  })
  .on(`/cart`, async function () {
    render(cartPage())
    getData()
  })
  .on(`/shoppingCart`, async function () {
    render(shoppingPage())
    getUserData()
  })
  .on(`/checkout`, async function () {
    render(checkoutPage())
    getCheckoutData()
  })
  .on(`/checkout/address`, async function () {
    render(pageAddresses())
    getLoactionsData()
  })
  .on(`/checkout/shopping`, async function () {
    render(shoppingPage())
  })
  .on(`/checkout/payment`, async function () {
    render(paymentPage())
  })
  .on(`/orders`, async function () {
    render(orderPage())
    getOrdersData()
  })
  