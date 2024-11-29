import { router } from "./router.js";
import { El } from "./el.js";
import { data } from "autoprefixer";

let selectedPayment;
let database;
let order;

export async function getUserData(userId = '1') {
    const url = "http://localhost:5173/users/"+userId;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      order = database.orders;
      syncOrderDetails()

    } catch (error) {
      console.error(error.message);
    }
}

function syncOrderDetails(){

}

export function paymentPage(){

    getUserData('1')

    return El({
        element: 'div',
        className: 'content w-[428px] h-fit',
        children: [
            El({
                element: 'div',
                className: 'header w-full flex flex-row',
                children: [
                    El({
                        element: 'button',
                        className: 'back-button w-[60px] h-[60px] m-[12px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{history.back();}
                            }
                        ],
                        children: [
                            El({
                                element: 'img',
                                className: 'back-button-img',
                                src: '/src/assets/arrow-left-short.svg'
                            })
                        ]
                    }),
                    El({
                        element: 'h1',
                        className: 'page-name text-[36px] font-semibold my-2',
                        children: ['Payment Method']
                    })
                ]
            }),   
            El({
                element: 'ul',
                className: 'payment-options',
                children: [
                    El({
                        element: 'li',
                        className: 'payment1 w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
                        children: [
                            El({
                                element: 'img',
                                className: 'w-[25px] h-[25px] my-auto mx-4',
                                src: '/src/assets/digital-wallet-icon.png'
                            }),
                            El({
                                element: 'div',
                                className: 'loaction-info w-[280px] flex flex-col my-auto mr-4',
                                children: [    
                                    El({
                                        element: 'h1',
                                        className: 'type-text font-semibold',
                                        children: ['Wallet']
                                    }),
                                    El({
                                        element: 'p',
                                        className: 'info',
                                        children: ['we will charge you from your wallet']
                                    })
                                ]
                            }),
                            El({
                                element: 'input',
                                className: 'radio accent-black',
                                type: 'radio',
                                name: 'location-radio',
                                eventListener: [
                                    {
                                        event: 'click',
                                        callback: ()=>{selectedPayment = 'wallet'}
                                    }
                                ]
                            })
                        ]
                    }),
                    El({
                        element: 'li',
                        className: 'payment2 w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
                        children: [
                            El({
                                element: 'img',
                                className: 'w-[25px] h-[25px] my-auto mx-4',
                                src: '/src/assets/card-icon.png'
                            }),
                            El({
                                element: 'div',
                                className: 'loaction-info w-[280px] flex flex-col my-auto mr-4',
                                children: [    
                                    El({
                                        element: 'h1',
                                        className: 'type-text font-semibold',
                                        children: ['Debit Card']
                                    }),
                                    El({
                                        element: 'p',
                                        className: 'info',
                                        children: ['you will be redirected to bank page']
                                    })
                                ]
                            }),
                            El({
                                element: 'input',
                                className: 'radio accent-black',
                                type: 'radio',
                                name: 'location-radio',
                                eventListener: [
                                    {
                                        event: 'click',
                                        callback: ()=>{selectedPayment = 'card'}
                                    }
                                ]
                            })
                        ]
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'footer w-full',
                children: [
                    El({
                        element: 'button',
                        className: 'confirm w-[380px] h-[50px] rounded-3xl fixed bottom-6 mx-[24px] text-center text-[18px] bg-black text-white',
                        eventListener: [
                            {
                                event : 'click',
                                callback: createOrder
                            }
                        ],
                        children: ['Confirm Payment']
                    }) 
                ]
            })
        ]
    })
}

async function updateOders(userId = '1', order){
    const url = "http://localhost:5173/users/"+userId;

    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orders: order}) 
    })
}

async function clearCart(userId = '1'){
    const url = "http://localhost:5173/users/"+userId;

    const updatedData = {
        cart: []
    }
    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cart: ''}) 
    })
}

function createOrder(){
    let id = 1;

    if(database.orders.length > 0){
        id = database.orders.at(-1).id + 1;
    }

    let productList = database.cart;
    let address = structuredClone(database.defaultLocation);
    let shipping = structuredClone(database.defaultShipping);
    let payment = selectedPayment;

    order.push(
        {
            id,
            address,
            shipping,
            payment,
            products: productList
        }
    )

    updateOders('1',order);
    clearCart('1');
}