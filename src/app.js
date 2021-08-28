
window.api = api;


page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/create',decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/myProfile',decorateContext, myProfilePage);


setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    
    
}

document.getElementById('logout').addEventListener('click',async function(){

    if (sessionStorage.length !== 0) {
        await logout();
        setUserNav();
        page.redirect('/');
    }
});

