import { router } from "./router.js";
import { El } from "./el.js";

let database;
let storedLocations;
let locationList = [];
let selectedLocation;
let defaultLocation;

function render(page){
    app.innerHTML = '';
    app.append(page);
}

export async function getLoactionsData() {
    const url = "http://localhost:5173/users/1";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      database = data.locations;
      defaultLocation = data.defaultLocation;

      storedLocations = database;

      syncLocations()
      render(pageAddresses())

    } catch (error) {
      console.error(error.message);
    }
}

function syncLocations(){
    locationList = [];

    for(let i = 0; i < database.length; i++){
        locationList.push(El({
            element: 'li',
            className: 'address w-[380px] h-[100px] flex flex-row mx-auto my-4 shadow-md rounded-3xl',
            children: [
                El({
                    element: 'img',
                    className: 'w-[25px] h-[25px] my-auto mx-4',
                    src: '/src/assets/map-icon.png'
                }),
                El({
                    element: 'div',
                    className: 'loaction-info w-[280px] flex flex-col my-auto mr-4',
                    children: [    
                        El({
                            element: 'h1',
                            className: 'address-title font-semibold',
                            children: database[i].title
                        }),
                        El({
                            element: 'p',
                            className: 'address-location',
                            children: database[i].location
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
                            callback: (event)=>{selectLocation(event.target)}
                        }
                    ]
                })
            ]
        }))
    }
}

export function pageAddresses(){

    return El({
        element: 'div',
        className: 'content',
        children: [
            El({
                element: 'ul',
                className: 'flex flex-col w-[380px] max-h-[1280px] mx-auto',
                children: locationList
            }),
            El({
                element: 'div',
                className: 'input-container w-[380px] h-[150px] flex flex-col mx-auto my-4 shadow-xl rounded-3xl border-black border-2 py-2 hidden',
                children: [
                    El({
                        element: 'input',
                        className: 'w-[300px] bg-gray-50 my-2 mx-auto rounded-2xl pl-2',
                        id: 'newAddressTitle',
                        placeholder: 'title'
                    }),
                    El({
                        element: 'input',
                        className: 'w-[300px] bg-gray-50 my-2 mx-auto rounded-2xl pl-2',
                        id: 'newAddressLocation',
                        placeholder: 'location'
                    }),
                    El({
                        element: 'button',
                        className: 'submit w-[200px] h-[50px] rounded-3xl mx-auto my-2 text-center text-[18px] bg-gray-200 text-black',
                        eventListener: [
                            {
                                event: 'click',
                                callback: (event)=>{submitNewAddress(event.target)}
                            }
                        ],
                        children: ['Submit']
                    }),
                ]
            }),
            El({
                element: 'button',
                className: 'add w-[380px] h-[50px] rounded-3xl mx-[24px] text-center text-[18px] bg-gray-200 text-black',
                eventListener: [
                    {
                        event: 'click',
                        callback: (event)=>{showNewAddress(event.target)}
                    }
                ],
                children: ['Add New Address']
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

function showNewAddress(element){
    let parent = element.parentElement;
    parent.children[1].classList.remove('hidden')
}

function submitNewAddress(element){
    let parent = element.parentElement;
    let title = parent.children[0].value;
    let location = parent.children[1].value;
    parent.children[0].value = '';
    parent.children[1].value = '';
    parent.classList.add('hidden');

    updateLocations('1', title, location)
}

async function updateLocations(userId = '1', title, location){
    const url = "http://localhost:5173/users/"+userId;

    if(title && location){
        storedLocations.push({
            title,
            location
        })
    }

    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({locations: storedLocations}) 
    })

    getLoactionsData()
}

async function updateDefaultLocation(userId = '1', selectedLocation){
    const url = "http://localhost:5173/users/"+userId;

    const updateResponse = await fetch(url ,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({defaultLocation: selectedLocation}) 
    })
}

function selectLocation(element){
    let parent = element.parentElement;

    selectedLocation = {
        title : parent.children[1].children[0].innerText,
        location : parent.children[1].children[1].innerText
    }

    updateDefaultLocation('1', selectedLocation)
    
}