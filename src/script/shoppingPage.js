import { router } from "./router.js";
import { El } from "./el.js";

let selectedShopping;

export function shoppingPage(){

    return El({
        element: 'div',
        className: 'content w-[428px] h-fit',
        children: [
            El({
                element: 'ul',
                className: 'shopping-options',
                children: [
                    El({
                        element: 'li',
                        className: 'shop1 w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
                        children: [
                            El({
                                element: 'img',
                                className: 'w-[25px] h-[25px] my-auto mx-4',
                                src: '/src/assets/slow-delivery-icon.png'
                            }),
                            El({
                                element: 'div',
                                className: 'loaction-info w-[280px] flex flex-col my-auto mr-4',
                                children: [    
                                    El({
                                        element: 'h1',
                                        className: 'type-text font-semibold',
                                        children: ['Regular']
                                    }),
                                    El({
                                        element: 'p',
                                        className: 'price-text',
                                        children: ['$15']
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
                                        callback: (event)=>{selectShopping(event.target)}
                                    }
                                ]
                            })
                        ]
                    }),
                    El({
                        element: 'li',
                        className: 'shop1 w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
                        children: [
                            El({
                                element: 'img',
                                className: 'w-[25px] h-[25px] my-auto mx-4',
                                src: '/src/assets/fast-delivery-icon.png'
                            }),
                            El({
                                element: 'div',
                                className: 'loaction-info w-[280px] flex flex-col my-auto mr-4',
                                children: [    
                                    El({
                                        element: 'h1',
                                        className: 'type-text font-semibold',
                                        children: ['Fast']
                                    }),
                                    El({
                                        element: 'p',
                                        className: 'price-text',
                                        children: ['$30']
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
                                        callback: (event)=>{selectShopping(event.target)}
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
                                callback: ()=>{history.back()}
                            }
                        ],
                        children: ['Apply']
                    }) 
                ]
            })
        ]
    })
}

async function updateDefaultShopping(userId = '1', selectedShopping){
    const url = "http://localhost:5173/users/"+userId;

    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({defaultShopping: selectedShopping}) 
    })
}

function selectShopping(element){
    let parent = element.parentElement;

    selectedShopping = {
        type : parent.children[1].children[0].innerText,
        price : Number(parent.children[1].children[1].innerText.replace('$',''))
    }

    updateDefaultShopping('1', selectedShopping)
    
}