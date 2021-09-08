import { html } from 'https://unpkg.com/lit-html?module';
import { getCreatives } from '../api/data.js';
import { deleteCreative } from '../api/data.js';

const creativesTemplate = (data) => html`

<section class="creativeWrapper">
    ${data.map(creativeCard)}
</section>

`;

const creativeCard = (item) => html`
<article class="singleCreative">

    <div class="creativeImgWrapper">
        <img class="creativeArtistImg" src=${item[1].img} alt="creativeArtistImage" />  
        <iframe width="100%" height="66" scrolling="no" frameborder="no" allow="autoplay"
        src=${item[1].embed}>
    </iframe> 
    </div>
    <div class="creativeArtistrtistInfo">
        <p class="creativeArtistName">${item[1].name}</p>
        <p class="creativeArtistDesc">${item[1].description}</p>
        <div class="artworkContainer">
            <p class="creativeArtistArtwork">Artwork</p>
            <p class="creatorImagesContainer">${item[1].creatorImgs.map(artworkCard)}</p>
        </div>
        
        <div class="artistSocial">
            ${item[1].bandcamp ? html`<a href=${item[1].bandcamp} target="_blank"><i class="fab fa-bandcamp"></i></a>` : html``}
            ${item[1].soundcloud ? html`<a href=${item[1].soundcloud} target="_blank"><i
                    class="fab fa-soundcloud"></i></a>` : html``}
            ${item[1].spotify ? html`<a href=${item[1].spotify} target="_blank"><i class="fab fa-spotify"></i></a>` : html``}
            ${item[1].youtube ? html`<a href=${item[1].youtube} target="_blank"><i class="fab fa-youtube"></i></a>` : html``}
            ${item[1].facebook ? html`<a href=${item[1].facebook} target="_blank"><i class="fab fa-facebook"></i></a>` : html``}
            ${item[1].instagram ? html`<a href=${item[1].instagram} target="_blank"><i
                    class="fab fa-instagram"></i></a>` : html``}
            ${item[1].resident ? html`<a href=${item[1].resident} target="_blank"><img class="fab" src="/assets/raIcon.png"
                    alt=""></a>` : html``}
        </div>
        <div class="creativesAdminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="creativesEditButton" id ='${item[0]}' href="/edit/creative/${item[0]}">Edit</a>
            <button  href='javascript:void(0)' class="creativesDeleteButton">Delete</button>`
            : 
            html``}
        </div>
        
    </div>
    
    

</article>

`;

const artworkCard = (art) => html`

<div class="creatorImgsWrapper"><img class="creatorImg" src=${art} alt="creatorImgs" /></div>

`;

export async function creativesPage(ctx) {
    
    let dataObj = await getCreatives();
    let data = Object.entries(dataObj)
    ctx.render(creativesTemplate(data, onDelete));

   const delButton = document.getElementsByClassName('creativeWrapper')[0];
    delButton.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.textContent === 'Delete'){
            const id = e.target.previousElementSibling.id;
            onDelete(id);
        }else if(e.target.textContent === 'Edit'){
           const id = e.target.id;
            ctx.page.redirect(`/edit/creatives/${id}`)
        }
    })

    async function onDelete(id) {
            const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteCreative(id);
            ctx.page.redirect('/creatives');
        }
        
        
    }
}