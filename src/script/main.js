import Navigo from 'navigo';
import { router } from './router';

const app = document.getElementById('app');

function render(page){
    app.innerHTML = '';
    app.append(page);
}

router.resolve()

