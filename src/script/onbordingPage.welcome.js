import {El} from "./el.js";


export function welcomePage(){

    return El({
        element: 'div',
        className: 'background-wallpaper w-[428px] h-[926px] bg-[url(/src/assets/shoes-wallpaper.png)] bg-no-repeat mx-auto',
        children: [
            El({
                element: 'div',
                className: 'w-full h-full flex flex-col bg-transparent',
                style:'background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);',
                children: [
                    El({
                        element: 'div',
                        className: 'welcome-text-container w-full mt-[629px]',
                        children: [
                            El({
                                element: 'h1',
                                className: 'welcome-title-text text-white font-semibold text-[40px] ml-[32px] mr-[100px]',
                                children: 'Welcome to 👋'
                            }),

                            El({
                                element: 'h1',
                                className: 'welcome-brand-text text-[72px] text-white font-bold ml-[32px] mr-[174px]',
                                children: 'Shoea'
                            }),

                            El({
                                element: 'h1',
                                className: 'w-[364px] h-[44px] text-white text-[16px] font-semibold ml-[31px] mr-[33px]',
                                children: 'The best sneakers & shoes e-commerse app of the century for your fashion needs!'
                            })
                        ]
                    })
                ]
            })
        ]
    })
}
