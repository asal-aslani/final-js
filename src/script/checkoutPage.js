import { router } from "./router.js";
import { El } from "./el";

let database;
let counter = 0;
let orders;
let totalPrice;
let userCart;
let shoppingType;
let selectedLocation = {};
let shoppingPrice = '-';
let productsPrice = '-'
let discount = '-';

function render(page){
    app.innerHTML = '';
    app.append(page);
}

export async function getCheckoutData() {
    const url = "http://localhost:5173/users/1";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;
      shoppingPrice = +data.defaultShipping.price;
      shoppingType = data.defaultShipping.type;

      if(!shoppingType){
        shoppingType = 'Choose Shipping Type'
      }

      if(!shoppingPrice){
        shoppingPrice = '-'
      }

      selectedLocation = structuredClone(data.defaultLocation);

      userCart = database.cart;

      syncProducts()
      render(checkoutPage())

    } catch (error) {
      console.error(error.message);
    }
}

getCheckoutData();

function syncProducts(){
    let ordersList = createOrders();

      for(let i = 0; i < database.length; i++){
        app.children[0].children[1].append(ordersList[i]);
      }

    orders = El({
        element: 'ul',
        className: 'order-container w-[380px] h-full py-4 mx-auto mt-[12px] overflow-y-auto flex flex-col',
        children: ordersList
    })

    totalPrice = El({
        element: 'h1',
        className: 'title font-semibold text-[20px] text-center',
        children: ['$' + calculatePrice()]
    })

    productsPrice = calculatePrice();
}

function createOrders(){

    let orderList = [];
    
    for(let i = 0; i < database.cart.length; i++){
        let productId = database.cart[i].id
        let title = database.cart[i].title;
        let price = database.cart[i].price;
        let imgUrl = database.cart[i].imgUrl;
        let orderCount = +database.cart[i].counter;

        orderList.push(El({
            element: 'li',
            className: 'order ' + productId + ' w-[360px] h-[150px] rounded-2xl bg-white shadow-xl m-2 flex flex-row justify-between',
            children: [
                El({
                    element: 'div',
                    className: 'img-container w-[120px] h-[120px] rounded-2xl overflow-hidden bg-gray-100 my-[12px] ml-[12px]',
                    children: [
                        El({
                            element: 'img',
                            className: 'product-img',
                            src: imgUrl
                        })
                    ]
                }),
                El({
                    element: 'div',
                    className: 'right-side flex flex-col w-[180px] h-fit mr-[12px]',
                    children: [
                        El({
                            element: 'div',
                            className: 'top-row flex flex-row justify-between mt-[12px]',
                            children: [
                                El({
                                    element: 'h1',
                                    className: 'title font-semibold text-[24px] text-center',
                                    children: [title]
                                })
                            ]
                        }),
                        El({
                            element: 'div',
                            className: 'bottom-row flex flex-row w-[180px] h-fit mr-[12px] mt-[48px] justify-between',
                            children: [
                                El({
                                    element: 'h1',
                                    className: 'title font-semibold text-[24px] text-center',
                                    children: ['$' + price]
                                }),
                                El({
                                    element: 'div',
                                    className: 'button-container min-w-[36px] min-h-[36px] rounded-full overflow-hidden bg-gray-100 flex flex-row justify-between ml-[12px]',
                                    children: [
                                        El({
                                            element: 'h1',
                                            className: 'counter w-[30px] overflow-x-auto font-semibold text-center m-auto',
                                            children: [orderCount]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        }))
    }

    return orderList;
}

export function checkoutPage(){

    return El({
        element: 'div',
        className: 'content flex flex-col w-[428px] h-[1280px] overflow-hidden',
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
                        className: 'page-title text-[28px] font-semibold my-4 ml-[-24px]',
                        children: ['Checkout']
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'address w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
                children: [
                    El({
                        element: 'img',
                        className: 'w-[25px] h-[25px] my-auto mx-[25px]',
                        src: '/src/assets/map-icon.png'
                    }),
                    El({
                        element: 'p',
                        className: 'address-text my-auto w-[300px]',
                        children: [selectedLocation.title + ': ' + selectedLocation.location]
                    }),
                    El({
                        element: 'img',
                        className: 'w-[25px] h-[25px] my-auto mx-[25px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{router.navigate('/checkout/address')}
                            }
                        ],
                        src: '/src/assets/edit-icon.png'
                    })
                ]
            }),
            El({
                element: 'h1',
                className: 'orders-title w-380px text-[20px] mx-6 mb-4 font-medium border-t-2 border-b-black',
                children: ['order List']
            }),
            orders,
            El({
                element: 'div',
                className: 'shipping w-[380px] h-[100px] flex flex-row mx-auto mb-4 mt-6 shadow-md rounded-3xl',
                children: [
                    El({
                        element: 'img',
                        className: 'w-[25px] h-[25px] my-auto mx-[25px]',
                        src: '/src/assets/shipping-icon.png'
                    }),
                    El({
                        element: 'p',
                        className: 'address-text my-auto w-[300px]',
                        children: [shoppingType]
                    }),
                    El({
                        element: 'img',
                        className: 'w-[25px] h-[25px] my-auto mx-[25px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{router.navigate('/checkout/shopping')}
                            }
                        ],
                        src: '/src/assets/right-arrow-icon.png'
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'price-table w-[380px] h-[400px] mt-6 rounded-3xl m-auto bg-gray-50 shadow-md flex flex-col font-thin',
                children: [
                    El({
                        element: 'div',
                        className: 'w-[350px] flex flex-row justify-between mx-auto mt-6',
                        children: [
                            El({
                                element: 'p',
                                className: 'amount-label',
                                children: ['Amount']
                            }),
                            totalPrice
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'w-[350px] flex flex-row justify-between mx-auto mt-4',
                        children: [
                            El({
                                element: 'p',
                                className: 'amount-label',
                                children: ['Shipping']
                            }),
                            El({
                                element: 'p',
                                className: 'shipping-amount text-[20px] font-semibold',
                                children: ['$' + shoppingPrice]
                            })
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'w-[350px] h-[50px] flex flex-row justify-between mx-auto mt-4 border-b-2 border-b-gray',
                        children: [
                            El({
                                element: 'p',
                                className: 'amount-label',
                                children: ['Discount']
                            }),
                            El({
                                element: 'p',
                                className: 'discount-amount text-[20px] font-semibold',
                                children: ['-']
                            })
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'w-[350px] h-[50px] flex flex-row justify-between mx-auto mt-4',
                        children: [
                            El({
                                element: 'p',
                                className: 'amount-label',
                                children: ['Total']
                            }),
                            El({
                                element: 'p',
                                className: 'total-amount text-[20px] font-semibold',
                                children: ['$' + calculateTotalPrice()]
                            })
                        ]
                    })
                ],
                
            }),
            El({
                element: 'div',
                className: 'footer w-[428px] h-fit flex flex-col bg-white mt-6 justify-evenly',
                children: [
                    El({
                        element: 'button',
                        className: 'submit w-[380px] h-[50px] mx-auto my-4 bg-black rounded-3xl text-white text-center text-[18px] font-semibold',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{router.navigate('/checkout/payment')}
                            }
                        ],
                        children: ['continue to payment ->']
                    })
                ]
            })
        ]
    })
}

function calculatePrice(){
    let sum = 0;
    for(let i = 0; i < userCart.length; i++){
        sum += Number(userCart[i].price) * Number(userCart[i].counter);
    }
    return sum
}


function calculateTotalPrice(){

    let sum = 0;
    
    if(!isNaN(productsPrice)){
        sum += productsPrice;
    }

    if(!isNaN(shoppingPrice)){
        sum += shoppingPrice;
    }

    if(!isNaN(discount)){
        sum -= discount
    }

    if(sum < 0){
        sum = 0;
    }

    return sum;
}