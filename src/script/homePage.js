import {El} from "./el.js";
import { router } from "./router.js";

let database;
let historySearch = [];
let searchContainer;

async function getData() {
    const url = "http://localhost:5173/Products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data;

      syncProducts()
      syncHistory()
      render(homePage())

    } catch (error) {
      console.error(error.message);
    }
}


function render(page){
    app.innerHTML = '';
    app.append(page);
}

getData();

let brandsContainer = El({
    element: 'img',
    className: 'loading-img w-[48px] h-[48px] mx-auto my-[80px] animate-spin',
    src: '/src/assets/spinner-atom.svg'
});

function syncProducts(){

    let brandList = [];

    brandsContainer = El({
        element: 'ul',
        className: 'product-container w-[400px] h-[600px] mt-[24px] overflow-y-auto mx-auto flex flex-wrap',
        chilren: brandList
    })

try{
    for(let i = 0; i < database.length; i++){
        let prodactName = database[i]['title'];
        let price = `$ ${database[i]['price']}`;
        let img = database[i]['images'];
        let productId = database[i]['id'];
        
        brandsContainer.append(El({
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
    render(homePage())
}
catch(error){
    console.log(error)
}
}

let categories = [
    {
        name: 'All',
        isActive: 'active bg-black text-white'
    },
    {
        name: 'Nike',
        isActive: ''
    },
    {
        name: 'Adidas',
        isActive: ''
    },
    {
        name: 'Asics',
        isActive: ''
    },
    {
        name: 'Puma',
        isActive: ''
    },
    {
        name: 'Reebok',
        isActive: ''
    }
]

function setCategories(){
    let categoryList = []
    for(let i=0; i<categories.length; i++){

    
        categoryList.push(El({
            element: 'li',
            className: `all border-2 border-black px-2 rounded-3xl mx-2 ${categories[i]['isActive']}`,
            children: [categories[i]['name']],
            eventListener: [
                {
                    event: 'click',
                    callback: (event)=>{toggleColor(event.target)}
                }
            ]
        }))
    }
    return categoryList;
}

function setFilter(filters = []){

    let back_up_database = structuredClone(database);

    if(filters.length == 1 && filters[0] == 'All'){
            getData();
    }
    else if(filters.length == 0){
        getData();
    }
    else{
        let tmp_database = [];
        for(let i = 0; i < filters.length; i++){
            for(let j = 0; j < database.length; j++){
                for(const key in database[j]){
                    if(database[j][key] == filters[i].toLowerCase()){
                        tmp_database.push(database[j])
                        break;
                    }
                }
            }
        }
        database = tmp_database;
        syncProducts();
        render(homePage());
        database = structuredClone(back_up_database)
    }
}

function redirectToProduct(id){
    router.navigate('/product/'+id)
}

export function homePage(){

    return El({
        element: 'div',
        className: 'content w-full h-full',
        children:[
            El({
                element: 'div',
                className: 'header flex flex-row justify-between mx-[24px] my-[16px]',
                children:[
                    El({
                        element: 'div',
                        className: 'left-side w-fit max-w-[220px] h-[48px] flex flex-row',
                        children: [
                            El({
                                element: 'div',
                                className: 'profile rounded-full w-[48px] h-[48px] bg-black mr-[12px] overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'profile-img w-[48px] h-[48px] m-auto',
                                        src: '/src/assets/logo.svg'
                                    })
                                ]
                            }),
                            El({
                                element: 'div',
                                className: 'text-container flex flex-col',
                                children: [
                                    El({
                                        element: 'h1',
                                        className: 'welcome-text font-medium text-[16px] w-fit h-fit',
                                        children: 'Good Morning 👋'
                                    }),
                                    El({
                                        element: 'h1',
                                        className: 'user-name-text font-bold text-[16px] w-fit h-fit',
                                        children: 'Asal Aslani'
                                    })
                                ]
                            })
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'right-side w-fit h-fit flex flex-row mt-[15px] mb-[16px]',
                        children: [
                            El({
                                element: 'button',
                                className: 'notification-button w-fit h-fit',
                                children: [
                                    El({
                                        element: 'img',
                                        className: 'bell-img w-[24px] h-[22px]',
                                        src: '/src/assets/bell.svg'
                                    })
                                ]
                            }),
                            El({
                                element: 'button',
                                className: 'favorite-button w-fit h-fit ml-[16px]',
                                eventListener: [
                                    {
                                        event: 'click',
                                        callback: ()=>{router.navigate('/shoppingCart')}
                                    }
                                ],
                                children: [
                                    El({
                                        element: 'img',
                                        className: 'heart-img w-[24px] h-[24px]',
                                        src: '/src/assets/heart.svg'
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'search flex flex-row w-[380px] min-h-[37px] h-fit mx-auto mt-[8px] bg-slate-50 rounded-sm overflow-hidden',
                children: [
                    El({
                        element: 'img',
                        className: 'search-icon w-[18px] h-[18px] my-auto mr-[5px] ml-[12px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: (event)=>{setInputFilter(event.target)}
                            }
                        ],
                        src: '/src/assets/input-icon.svg'
                    }),
                    El({
                        element: 'input',
                        className: 'search-bar-input w-full h-full my-auto bg-transparent focus:outline-none',
                        eventListener: [
                            {
                                event: 'focusin',
                                callback: ()=>{syncHistory(), showHistorySearch()}
                            },
                            {
                                event: 'focusout',
                                callback: ()=>{ setTimeout(()=>{hideHistorySearch()}, 100)}
                            }
                        ],
                        placeholder: 'Search'
                    }),
                ]
            }),
            El({
                element: 'ul',
                className: 'search-history-container w-[380px] my-2 ml-6 pl-2 overflow-hidden h-fit mx-auto shadow-md rounded-2xl absolute hidden bg-gray-50',
                children: searchContainer
            }),
            El({
                element: 'div',
                className: 'brands w-[380px] h-[234px] mx-[24px] flex flex-wrap mt-[10px] py-[12px]',
                children: [
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px] ml-[6px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('nike')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/nike-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Nike'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('adidas')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/adidas-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Adidas'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('puma')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/puma-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Puma'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('asics')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/asics-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Asics'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px] mt-[28px] ml-[6px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('reebok')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/reebok-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Reebok'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px] mt-[28px]',
                        eventListener: [
                            {
                                event: 'click',
                                callback: ()=>{redirectToBrandPage('asics')}
                            }
                        ],
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/asics-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'Asics'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mr-[41px] mt-[28px]',
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/nb-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'New Ba...'
                            }),
                        ]
                    }),
                    El({
                        element: 'div',
                        className: 'brand-container flex flex-col w-fit h-fit mt-[28px]',
                        children: [
                            El({
                                element: 'div',
                                className: 'logo-container w-[60px] h-[60px] bg-gray-200 rounded-full overflow-hidden',
                                children:[
                                    El({
                                        element: 'img',
                                        className: 'logo-img mx-auto my-[20px] max-w-[60px] max-h-[60px]',
                                        src: '/src/assets/more-logo.png'
                                    })
                                ]
                            }),
                            El({
                                element: 'h2',
                                className: 'brand-name font-semibold text-[14px] mx-auto mt-[13px]',
                                children: 'More..'
                            }),
                        ]
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'middle-content mx-[24px] flex flex-row justify-between mt-[16px]',
                children: [
                    El({
                        element: 'h1',
                        className: 'font-semibold text-[20px]',
                        children: 'Most Popular'
                    }),
                    El({
                        element: 'button',
                        className: 'see-all-button bg-transparent w-fit h-fit font-semibold text-[16px]',
                        children: 'See All'
                    })
                ]
            }),
            El({
                element: 'ul',
                className: 'categories flex flex-row overflow-auto w-[400px] ml-4 mt-[20px]',
                children: setCategories()
            }),
            brandsContainer,
            El({
                element: 'div',
                className: 'footer h-[66px] w-[428px] bg-white mt-[66px] flex flex-row justify-evenly bottom-0 position fixed',
                children: [
                    El({
                        element: 'button',
                        className: 'home-button w-[29px] h-[38px] flex flex-col mt-[12px]',
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/home-icon.svg'
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
                               
                            }
                        ],
                        children: [
                            El({
                                element: 'img',
                                className: 'home-icon m-auto',
                                src: '/src/assets/order-icon.svg'
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

let filterArr = [];

function toggleColor(element){

    if(element.classList.contains('active')){
        element.classList.remove('active')
        element.classList.remove('bg-black')
        element.classList.remove('text-white')
    
        for(let i = 0; i<categories.length; i++){

            if(element.innerHTML == categories[i]['name']){
                categories[i]['isActive'] = '';
            }
        }

        for(let i = 0; i < filterArr.length; i++){
            if(filterArr[i] == element.innerHTML){
                filterArr.splice(i, 1);
                break;
            }
        }
        
        if(filterArr.length == 0 || filterArr.includes('All')){
            categories[0]['isActive'] = 'active bg-black text-white'
        }
    }
    else{
        element.classList.add('active')
        element.classList.add('bg-black')
        element.classList.add('text-white')

        for(let i = 0; i<categories.length; i++){

            if(element.innerHTML == categories[i]['name']){
                categories[i]['isActive'] = 'active bg-black text-white';
                if(i != 0){
                    categories[0]['isActive'] = '';
                }
                else{
                    categories.map((obj)=>{obj['isActive'] = ''});
                    categories[0]['isActive'] = 'active bg-black text-white';
                    filterArr= []
                }

                break;
            }
        }

        filterArr.push(element.innerHTML)

        if(filterArr.length == categories.length){
            categories.map((obj)=>{obj['isActive'] = ''});
            categories[0]['isActive'] = 'active bg-black text-white';
            filterArr = [];
        }
    }
    setFilter(filterArr);
}

function setInputFilter(imgElement){
    let parent = imgElement.parentElement;
    let input = parent.children[1]
    let text = input.value

    if(text.length > 0 && !historySearch.includes(input.value)){
        historySearch.push(input.value)
    }
    
    if(text.length == 0){
        getData();
    }
    else{
        setFilter([input.value])
    }
    app.children[0].children[1].children[1].value = historySearch.at(-1)
}

function redirectToBrandPage(brandName){
    router.navigate('/brands/' + brandName)
}

function showHistorySearch(){
    app.children[0].children[2].classList.remove('hidden')
}

function syncHistory(){
    let historyList = [];
    
    for(let i = 0; i < historySearch.length; i++){
        historyList.push(El({
            element: 'li',
            className: 'history' + i + ' w-full h-[24px] border-y-2 border-y-gray-50',
            eventListener: [
                {
                    event: 'click',
                    callback: (event)=>{setInputText(event.target.innerText)}
                }
            ],
            children: [
                El({
                    element: 'h1',
                    className: 'text-[12px] font-md',
                    children: [historySearch[i]]
                })
            ]
        }))
    }

    searchContainer = historyList
}

function hideHistorySearch(){
    app.children[0].children[2].classList.add('hidden')
}

function setInputText(text){
    app.children[0].children[1].children[1].value = text
}