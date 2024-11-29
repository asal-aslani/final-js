import { router } from "./router.js";
import { El } from "./el.js";

let database;
let renderedOrders;

export async function getOrdersData(userId = '1') {
    const url = "http://localhost:5173/users/"+userId;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      syncProducts()
      render(orderPage())

    } catch (error) {
      console.error(error.message);
    }
}

function render(page){
    app.innerHTML = '';
    app.append(page);
}

function syncProducts(){
    renderedOrders = createOrders()
    
}

function createOrders(){

    let orders = [];
    let orderList = [];
    
    for(let i = 0; i < database.orders.length; i++){
        for(let c = 0; c < database.orders[i].products.length; c++){
            let productId = database.orders[i].products[c].id;
            let title = database.orders[i].products[c].title;
            let price = database.orders[i].products[c].price;
            let imgUrl = database.orders[i].products[c].imgUrl;
            let orderCount = database.orders[i].products[c].counter;

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

        orders.push(El({
            element: 'ul',
            className: 'orders w-[380px] h-fit mx-auto my-12 flex flex-col border-b-2 border-b-gray-200 overflow-y-auto',
            children:[El({
                element: 'h1',
                className:'order-number ' + (i+1),
                children: ['order '+ (i+1)]
            }), 
                ...orderList
            ]
        }))

        orderList = [];
    }

    return orders;
}

export function orderPage(){

    return El({
        element: 'div',
        className: 'content pb-8',
        children: [
            El({
                element: 'div',
                className: 'header w-[380px] mx-auto flex flex-row justify-between mt-[24px]',
                children: [
                    El({
                        element: 'div',
                        className: 'left-side w-[200px] flex flex-row justify-between text-center',
                        children: [
                            El({
                                element: 'img',
                                className: 'w-[30px] h-[30px] m-2',
                                src: '/src/assets/logo-black.svg'
                            }),
                            El({
                                element: 'h1',
                                className: 'page-title font-semibold text-[24px]',
                                children: ['My Orders']
                            })
                        ]
                    }),
                    El({
                        element: 'button',
                        className: 'search-button',
                        children: [
                            El({
                                element: 'img',
                                className: 'search-img w-[24px] h-[24px]',
                                src: '/src/assets/input-icon.svg'
                            })
                        ]
                    })
                    
                ]
            }),
            El({
                element: 'div',
                className: 'middle-content w-[428px] flex flex-col mt-4',
                children: [
                    El({
                        element: 'div',
                        className: 'button-container w-[380px] mx-auto flex flex-row',
                        children: [
                            El({
                                element: 'button',
                                className: 'active-button w-full border-b-2 border-b-black font-bold',
                                children: ['Active']
                            }),
                            El({
                                element: 'button',
                                className: 'active-button w-full border-b-2 border-b-gray-400',
                                children: ['Completed']
                            })
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'order-container w-full h-fit',
                        children: renderedOrders
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'footer h-[66px] w-[428px] bg-white mt-[12px] flex flex-row justify-evenly bottom-0 position fixed',
                children: [
                    El({
                        element: 'button',
                        className: 'home-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        eventListener: [
                            {
                                event : 'click',
                                callback: ()=>{router.navigate('/home')}
                            }
                        ],
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/home-icon-untoggled.png'
                            }),
                            El({
                                element: 'h1',
                                className: 'button-text font-semibold text-[10px]',
                                children: 'Home'
                            })
                        ]
                    }),
                    El({
                        element: 'button',
                        className: 'cart-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        eventListener: [
                            {
                                event : 'click',
                                callback: ()=>{router.navigate('/cart')}
                            }
                        ],
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/cart-icon.svg'
                            }),
                            El({
                                element: 'h1',
                                className: 'button-text font-semibold text-[10px] ml-[5px]',
                                children: 'Cart'
                            })
                        ]
                    }),
                    El({
                        element: 'button',
                        className: 'orders-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        eventListener: [
                            {
                                event : 'click',
                                callback: ()=>{router.navigate('/orders')}
                            }
                        ],
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/orders-icon-fill.png'
                            }),
                            El({
                                element: 'h1',
                                className: 'button-text font-semibold text-[10px]',
                                children: 'Orders'
                            })
                        ]
                    }),
                    El({
                        element: 'button',
                        className: 'wallet-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/wallet-icon.svg'
                            }),
                            El({
                                element: 'h1',
                                className: 'button-text font-semibold text-[10px]',
                                children: 'Wallet'
                            })
                        ]
                    }),
                    El({
                        element: 'button',
                        className: 'profile-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/person-icon.svg'
                            }),
                            El({
                                element: 'h1',
                                className: 'button-text font-semibold text-[10px]',
                                children: 'Profile'
                            })
                        ]
                    })
                ]
            })
        ]
    })
}