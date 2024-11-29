import { router } from "./router.js";
import { El } from "./el.js";

let database;
let counter = 0;
let imgUrl;
let title;
let publicId;
let price;
let Purchased;
let userCart = [];
let shoppingCart = [];

async function getData(id = publicId) {

    const url = "http://localhost:5173/Products/" + id;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      imgUrl = database.images;
      title = database.title;
      price = database.price;

      updateInfo();

    } catch (error) {
      console.error(error.message);
    }
}

async function getUserData(id = '1') {
    const url = "http://localhost:5173/users/" + id;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      userCart = database.cart;
      if(userCart == ''){
        userCart = [];
      }
      shoppingCart = database.shoppingCart;

      for(let i = 0; i < database.cart.length; i++){
        if(database.cart[i].id == Number(publicId)){
            counter = +database.cart[i].counter
            break;
        }
        else{
            counter = 0;
        }
      }

      for(let i = 0; i < database.shoppingCart.length; i++){
        if(database.shoppingCart[i].id == publicId){
            Purchased = true
            break;
        }
        else{
            Purchased = false;
        }
      }

      updateInfo();

    } catch (error) {
      console.error(error.message);
    }
}

function updateInfo(){

    for(let i = 0; i < shoppingCart.length; i++){
        if(shoppingCart[i].id == publicId){
            Purchased = true
            break;
        }
        else{
            Purchased = false
        }
    }

    app.children[0].children[0].children[1].children[0].src = imgUrl;
    app.children[0].children[1].children[0].children[0].innerHTML = title;
    if(Purchased){
        app.children[0].children[1].children[0].children[1].src = '/src/assets/pink-heart-icon.png';
    }
    else{
        app.children[0].children[1].children[0].children[1].src = '/src/assets/heart.svg';
    }
    app.children[0].children[2].children[1].innerHTML = counter;
    app.children[0].children[3].children[0].innerHTML = '$ ' + price;
}

export function productPage(id){

    publicId = id;

    getData(id)
    getUserData()

    return El({
        element: 'div',
        className: 'content w-[428px] h-fit',
        children: [
            El({
            element: 'div',
            className: 'header w-[428px] h-fit flex flex-col',
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
                    element: 'div',
                    className: 'img-container w-[428px] h-[428px]',
                    children: [
                        El({
                            element: 'img',
                            className: 'product-img w-4/5 h-4/5 m-auto',
                            src: imgUrl
                        }),
                        El({
                            element: 'ul',
                            className: 'bar-container w-[120px] flex flex-row mx-auto mt-[12px] justify-evenly',
                            children: [
                                El({
                                    element: 'li',
                                    className:'bar flex flex-row',
                                    children: [
                                        El({
                                            element: 'img',
                                            className: 'w-[50px] h-[36px] mx-2',
                                            src: '/src/assets/bar-icon.png'
                                        }),
                                        El({
                                            element: 'img',
                                            className: 'w-[16px] h-[16px] mx-2 mt-2',
                                            src: '/src/assets/black-circle-icon.png'
                                        }),
                                        El({
                                            element: 'img',
                                            className: 'w-[16px] h-[16px] mx-2 mt-2',
                                            src: '/src/assets/black-circle-icon.png'
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        }),
        El({
            element: 'div',
            className: 'product-info',
            children: [
                El({
                    element: 'div',
                    className: 'top-row flex flex-row w-[380px] h-fit justify-between mx-auto',
                    children: [
                        El({
                            element: 'h1',
                            className: 'product-name font-bold text-[24px]',
                            children: [title]
                        }),
                        El({
                            element: 'img',
                            className: 'favorite-img w-[36px] h-[36px]',
                            eventListener: [
                                {
                                    event: 'click',
                                    callback: toggleWish
                                }
                            ],
                            src: '/src/assets/heart.svg'
                        })
                    ]
                })
            ]
        }),
        El({
            element: 'div',
            className: 'button-container w-[200px] rounded-2xl overflow-hidden bg-gray-100 flex flex-row justify-between mt-[24px] ml-[12px]',
            children: [
                El({
                    element: 'button',
                    className: 'add-button w-[80px] text-center text-[24px] rounded-full',
                    eventListener: [
                        {
                            event: 'click',
                            callback: (event)=>{add(event.target)}
                        }
                    ],
                    children: ['+']
                }),
                El({
                    element: 'h1',
                    className: 'counter w-[50px] font-semibold text-center mt-[5px]',
                    children: counter
                }),
                El({
                    element: 'button',
                    className: 'remove-button w-[80px] text-center text-[24px] rounded-full',
                    eventListener: [
                        {
                            event: 'click',
                            callback: (event)=>{remove(event.target)}
                        }
                    ],
                    children: ['-']
                })
            ]
        }),
        El({
            element: 'div',
            className: 'footer w-[380px] flex flex-row mx-auto mt-[24px] justify-between',
            children: [
                El({
                    element: 'h1',
                    className: 'price text-[36px] font-bold',
                    children: ['$3333']
                }),
                El({
                    element: 'button',
                    className: 'order-button w-[200px] h-[48px] rounded-3xl bg-black text-white text-center',
                    children: [
                        El({
                            element: 'h1',
                            className: 'order-button-text font-medium text-[16px]',
                            eventListener: [
                                {
                                    event: 'click',
                                    callback: updateCart
                                }
                            ],
                            children: ['Add to cart']
                        })
                    ]
                })
            ]
        })

        ]
    })
};

async function updateCart(){
    const url = "http://localhost:5173/users/1";

    let productFound = false;

    for(let i = 0; i < userCart.length; i++){
        if(userCart[i].id == publicId){
            userCart[i].counter = counter;
            productFound = true;
            break;
        }
    }

    if(!productFound){
        userCart.push({
            id:publicId,
            title,
            price,
            imgUrl,
            counter,
            whished: Purchased
        })
    }

    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({cart: userCart}) 
    })
}

async function toggleWish(){
    const url = "http://localhost:5173/users/1";

    if(isshoppingCarted){
        for(let i = 0; i < shoppingCart.length; i++){
            if(shoppingCart[i].id == publicId){
                shoppingCart.splice(i, 1)
                Purchased = false;
                break;
            }
        }
    }

        shoppingCart.push({
            id:publicId,
            title,
            price,
            imgUrl,
            counter
        })
        Purchased = true;
    }

   

function add(element){
    counter++;

    let parent = element.parentElement;
    let countDisplay = parent.children[1];
    countDisplay.innerHTML = counter;
}

function remove(element){
    if(counter > 0){
        counter--;

        let parent = element.parentElement;
        let countDisplay = parent.children[1];
        countDisplay.innerHTML = counter;
    }
}