import { html } from 'https://unpkg.com/lit-html?module';
import { getBlog } from '../api/data.js'
import { deleteBlogArticle } from '../api/data.js'


const blogTemplate = (data) => html`
    <div class="blogWrapper">
        ${data.map(blogCard)}
    </div>
`;

const blogCard = (item) => html`
<article id="singleArticle" class="singleArticle">
    ${item[1].link ? html`
    
        <div class="blogImgWrapper">
            <a href=${item[1].link}><img src=${item[1].img} alt="" /></a>
        </div>
    
        <div class="blogDescWrapper">
            <div class="readMore">
                <h1>${item[1].title}</h1>
                <button id="readMoreBtn">Read More</button>
            </div>
            <p>${item[1].description}</p>
            <p>${item[1].author}</p>
            <p>${item[1].date}</p>
            
        </div>
    
    `
        :
         html`
    <div  class="blogImgWrapper">
        <img src=${item[1].img} alt="" />
    </div>
    <div class="blogDescWrapper">
        <div class="readMore">
            <h1>${item[1].title}</h1>
            <button id="readMoreBtn">Read More</button>
        </div>
        <p class="articleDescription">${item[1].description}</p>
        <p>${item[1].author}</p>
        <p>${item[1].date}</p>
    </div>
    `
    }
        <div class="creativesAdminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="creativesEditButton" id ='${item[0]}' href="/edit/creative/${item[0]}">Edit</a>
            <button  @click=${onDelete} href='javascript:void(0)' class="creativesDeleteButton">Delete</button>`
            : 
            html``}
        </div>
</article>



`;

export async function blogPage(ctx) {

    let dataObj = await getBlog();
    let data = Object.entries(dataObj);

    ctx.render(blogTemplate(data,onDelete));

    async function onDelete(id) {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteBlogArticle(id);
            ctx.page.redirect('/blog');
        }
    }
    const readMoreButton = document.getElementById('readMoreBtn')
    
            
            
    
}