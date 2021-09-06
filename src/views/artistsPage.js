import { html } from 'https://unpkg.com/lit-html?module';
import { getArtists } from '../api/data.js';

const artistsTemplate = (data) =>html`

<section class="artistsWrapper">
        ${data.map(artistCard)}
    </section>

`;

const artistCard = (item)=>html`
 <article class="singleArtist">
        <a href="/details/${item[0]}">
            <div class="imgWrapper">
                <img class="artistImg" src=${item[1].img} alt="artistImage" />
            </div>
            <div class="artistInfo">
                <p>${item[1].name}</p>
            </div>
        </a>
    </article>

`;

export async function artistsPage(ctx){
    let dataObj = await getArtists();
    let data = Object.entries(dataObj)
    ctx.render(artistsTemplate(data));
}