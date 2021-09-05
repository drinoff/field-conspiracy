import * as api from './api/data.js'
import { render } from 'https://unpkg.com/lit-html?module';
import page from "https://unpkg.com/page/page.mjs";

import { homePage } from './views/homePage.js'
import { releasesPage } from './views/releasesPage.js';
import { artistsPage } from './views/artistsPage.js';
import { creativesPage } from './views/creativesPage.js';
import { showsPage } from './views/showsPage.js';
import { blogPage } from './views/blogPage.js';
import { contactPage } from './views/contactPage.js';
import { loginPage } from './views/loginPage.js'

window.api = api;

const main = document.getElementsByTagName('main')[0];
let adminPanel = document.getElementById('adminPanel');
let logout = document.getElementById('logout');

page('/', decorateContext, homePage);
page('/releases', decorateContext, releasesPage);
page('/artists', decorateContext, artistsPage);
page('/creatives', decorateContext, creativesPage);
page('/contact', decorateContext, contactPage);
page('/blog', decorateContext, blogPage);
page('/shows', decorateContext, showsPage);
page('/login', decorateContext, loginPage);

// page('/login', decorateContext, loginPage);
// page('/create',decorateContext, createPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/myProfile',decorateContext, myProfilePage);


setUserNav();
page.start();
page(window.location.pathname)



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    console.log(window.sessionStorage.length)
    if (window.sessionStorage.length !== 0) {
        adminPanel.style.display = 'block';
        logout.style.display='block'
    } else {
        adminPanel.style.display = 'none';
        logout.style.display='none'
    }
}

// document.getElementById('logout').addEventListener('click',async function(){

//     if (sessionStorage.length !== 0) {
//         await logout();
//         setUserNav();
//         page.redirect('/');
//     }
// });






