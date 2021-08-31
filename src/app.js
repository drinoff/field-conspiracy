import * as api from './api/data.js'
import {render} from 'https://unpkg.com/lit-html?module';
import page from "https://unpkg.com/page/page.mjs";
import {homePage} from './views/homePage.js'

window.api = api;

const main = document.getElementsByTagName('main')[0];

page('/', decorateContext, homePage);
// page('/register', decorateContext, registerPage);
// page('/catalog', decorateContext, catalogPage);
// page('/login', decorateContext, loginPage);
// page('/create',decorateContext, createPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/myProfile',decorateContext, myProfilePage);


//setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    //ctx.setUserNav = setUserNav;
    next();
}

//function setUserNav() {
    
    
//}

// document.getElementById('logout').addEventListener('click',async function(){

//     if (sessionStorage.length !== 0) {
//         await logout();
//         setUserNav();
//         page.redirect('/');
//     }
// });





