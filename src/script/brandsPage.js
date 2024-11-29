import { router } from "./router.js";
import { El } from "./el.js";
import { cartPage } from "./cartPage.js";

let popularBrand;
let database;

export async function getBrandData(brand = popularBrand) {

    console.log(popularBrand)
    const url = "http://localhost:5173/Products?brand="+brand;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      syncProducts()
      render(brandsPage(popularBrand))

    } catch (error) {
      console.error(error.message);
    }
}

function render(page){
    app.innerHTML = '';
    app.append(page);
}

let productContainer = El({
    element: 'img',
    className: 'loading-img w-[48px] h-[48px] mx-auto my-[80px] animate-spin',
    src: '/src/assets/spinner-atom.svg'
});

function syncProducts(){

    let productList = [];

    productContainer = El({
        element: 'ul',
        className: 'product-container w-[400px] h-fit mt-[24px] overflow-y-auto mx-auto flex flex-wrap',
        chilren: productList
    })

try{
    for(let i = 0; i < database.length; i++){
        let prodactName = database[i]['title'];
        let price = `$ ${database[i]['price']}`;
        let img = database[i]['images'];
        let productId = database[i]['id'];
        
        productContainer.append(El({
            element: 'li',
            className: 'product-template w-[182] h-[244px] flex flex-col ml-[12px] mb-[24px]',
            eventListener: [
                    {
                        event: 'click',
                        callback: ()=>{redirectToProduct(productId)}
                }
            ],
            children: [
                El({
                    element: 'div',
                    className: 'product-img-container w-[182px] h-[182px] overflow-hidden bg-gray-100 rounded-2xl',
                    children: [
                        El({
                            element: 'img',
                            className: 'product-img m-auto rounded-2xl',
                            src: img
                        })
                    ]
                }),
                El({
                    element: 'h1',
                    className: 'product-name w-[182px] overflow-collapse font-bold text-[20px] mt-[5px]',
                    children: [prodactName]
                }),
                El({
                    element: 'h1',
                    className: 'product-price font-semibold text-[16px]',
                    children: [price]
                })
            ]
        }))
    }
    render(brandsPage(popularBrand))
}
catch(error){
    console.log(error)
}
}


export function brandsPage(brand){

    popularBrand = brand;

    return El({
        element: 'div',
        className: 'content flex flex-col w-[428px]',
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
                        className: 'brand-name text-[36px] font-semibold mx-4 my-2',
                        children: [brand]
                    })
                ]
            }),
            productContainer
        ]
    })
}

function redirectToProduct(id){
    router.navigate('/product/'+id)
}