import Navigo from 'navigo';
import { startPage } from './loadingPage.js';
import { welcomePage } from './onbordingPage.welcome.js';
import { onbordPage1 } from './onbordingPage1.js';
import { onbordPage2 } from './onbordingPage2.js';
import { onbordPage3 } from './onbordingpage3.js';

const app = document.getElementById('app');

function render(page){
    app.innerHTML = '';
    app.append(page);
}

export const router = new Navigo('/');

router
.on('/loading',async function () {
   
    render(startPage())
  })
  .on('/welcome',async function () {
    
    render(welcomePage())
  })
  .on('/obp1',async function () {
    
    render(onbordPage1())
  })
  .on('/obp2',async function () {
    
    render(onbordPage2())
  })
  .on('/obp3',async function () {
   
    render(onbordPage3())
  })
  .on(`/login`,async function () {
    const {loginPage} = await import('./loginPage.js');
    render(loginPage())
  })
