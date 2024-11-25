import {El} from "./el.js";


export function loginPage(){
    return El({
        element: 'div',
        className: 'w-[428px] flex flex-col',
        children: [
            El({
                element: 'button',
                className: 'back-button w-fit h-fit my-[12px] ml-[24px] mr-[372px]',
                children: [
                    El({
                        element: 'img',
                        className: 'back-img m-auto w-[32px] h-[32px]',
                        src: '/src/assets/arrow-left-short.svg'
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'logo-container w-fit h-fit mt-[76px] mx-[187px] mb-[118px]',
                children: [
                    El({
                        element: 'img',
                        className: 'logo-img w-[54px] h-[81px] m-auto',
                        src: '/src/assets/logo-black.svg'
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'title-container w-fit h-fit ml-[41px] mr-[45px] mb-[48px]',
                children: [
                    El({
                        element: 'h1',
                        className: 'title-text font-semibold text-[32px]',
                        children: 'Login to Your Account'
                    })
                ]
            }),
            El({
                element: 'div',
                className: 'form-container w-fit h-fit mx-[24px] mb-[32px]',
                children: [
                    El({
                        element: 'form',
                        className: 'login-form w-[380px] h-fit',
                        children: [
                            El({
                                element: 'div',
                                className: 'input-container flex flex-col',
                                children: [
                                    El({
                                        element: 'div',
                                        className: 'email-container w-[380px] h-[37px] flex flex-row bg-gray-50 rounded-[4px] mb-[21px]',
                                        children: [
                                            El({
                                                element: 'img',
                                                className: 'email-img w-[16px] h-[16px] my-[10.5px] ml-[12px] mr-[5px]',
                                                src: '/src/assets/email-prefix.svg'
                                            }),
                                            El({
                                                element: 'input',
                                                id: 'email',
                                                className: 'email-input h-[37px] w-full bg-transparent font-medium text-[14px] focus:outline-none',
                                                placeholder: 'Email',
                                                eventListener: [
                                                    {
                                                        event: 'focusin',
                                                        callback: (event)=>{highlight(event.target)}
                                                    },
                                                    {
                                                        event: 'focusout',
                                                        callback: (event)=>{clearHighlight(event.target)}
                                                    }
                                                ]
                                            })
                                        ]
                                    }),
                                    El({
                                        element: 'div',
                                        className: 'password-container w-[380px] h-[37px] flex flex-row bg-gray-50 rounded-[4px] focus:bg-red-600',
                                        children: [
                                            El({
                                                element: 'img',
                                                className: 'password-img w-[16px] h-[16px] my-[10.5px] ml-[12px] mr-[5px]',
                                                src: '/src/assets/password-prefix.svg'
                                            }),
                                            El({
                                                element: 'input',
                                                id: 'password',
                                                type: 'password',
                                                className: 'password-input h-[37px] w-full bg-transparent font-medium text-[14px] focus:outline-none',
                                                placeholder: 'Password',
                                                eventListener: [
                                                    {
                                                        event: 'focusin',
                                                        callback: (event)=>{highlight(event.target)}
                                                    },
                                                    {
                                                        event: 'focusout',
                                                        callback: (event)=>{clearHighlight(event.target)}
                                                    }
                                                ]
                                            }),
                                            El({
                                                element: 'img',
                                                className: 'password-eye-img w-[14px] h-[14px] my-[11.5px] mr-[11.5px] ml-[5px]',
                                                src: '/src/assets/eye-slash.svg'
                                            })
                                        ]
                                    }),
                                    El({
                                        element: 'div',
                                        className: 'checkbox-container w-fit h-fit mx-auto mt-[40px]',
                                        children: [
                                            El({
                                                element: 'input',
                                                type: 'checkbox',
                                                className: 'checkbox w-[16px] h-[16px] accent-black'
                                            }),
                                            El({
                                                element: 'label',
                                                className: 'font-normal text-[16px] ml-[8px] text-center',
                                                children: 'Remember me'
                                            })
                                        ]
                                    }),
                                ]
                            }),
                            El({
                                element: 'button',
                                className: 'sign-in-button w-[380px] h-[47px] bg-slate-800 rounded-3xl text-white font-medium text-[14px] mt-[283px]',
                                eventListener: [
                                    {
                                        event: 'click',
                                        
                                    }
                                ],
                                children: 'Sign in'
                            })
                        ]
                    })
                ]
            })
        ]
    })
}

function highlight(element){
    console.log('hi')

    element.parentElement.classList.add('outline');

    if(element.classList.contains('email-input')){
        element.parentElement.children[0].src = '/src/assets/envelope-fill.svg';
    }
    else{
        element.parentElement.children[0].src = '/src/assets/lock-fill.svg';

        element.parentElement.children[2].src = `/src/assets/eye-slash-fill.svg`;
    }
}

function clearHighlight(element){

    let lowImg;
    let highImg;
    let lowEye;
    let highEye;

    if(element.classList.contains('email-input')){
        lowImg = 'email-prefix.svg';
        highImg = 'envelope-fill.svg';
    }
    else{
        lowImg = 'password-prefix.svg';
        highImg = 'lock-fill.svg';
        lowEye = 'eye-slash.svg';
        highEye = 'eye-slash-fill.svg';
    }

    if(element.value.length > 0){
        element.parentElement.children[0].src = `/src/assets/${highImg}`;

        if(element.parentElement.children[2]){
            element.parentElement.children[2].src = `/src/assets/${highEye}`;
        }
    }
    else{
        element.parentElement.children[0].src = `/src/assets/${lowImg}`;

        if(element.parentElement.children[2]){
            element.parentElement.children[2].src = `/src/assets/${lowEye}`;
        }
    }


    element.parentElement.classList.remove('outline');
}

