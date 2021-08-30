import * as api from './api/data.js'
import page from '../node_modules/page/page.mjs';
import {homePage} from './views/homePage.js'

window.api = api;

page('/', decorateContext, homePage);
// page('/register', decorateContext, registerPage);
// page('/catalog', decorateContext, catalogPage);
// page('/login', decorateContext, loginPage);
// page('/create',decorateContext, createPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/myProfile',decorateContext, myProfilePage);


setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    
    
}

// document.getElementById('logout').addEventListener('click',async function(){

//     if (sessionStorage.length !== 0) {
//         await logout();
//         setUserNav();
//         page.redirect('/');
//     }
// });
let instaVideosElement = document.getElementsByClassName('instaVideos')[0];
api.getInstaVideos()
.then(data=>{
    data.forEach(element => {
        let currElement = document.createElement('article');
        currElement.classList.add('instaVideosFetched')
        let elementPic = document.createElement('img');
        elementPic.src=element.URL;
        currElement.appendChild(elementPic);
        instaVideosElement.appendChild(currElement)
    });
});




