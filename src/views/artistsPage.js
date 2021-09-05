import { html } from 'https://unpkg.com/lit-html?module';
import { getArtists } from '../api/data.js';

const artistsTemplate = (data) =>html`

<section class="artistsWrapper">
        ${data.map(artistCard)}
    </section>

`;

const artistCard = (item)=>html`
 <article class="singleArtist">
        <a href="/details/${item.id}">
            <div class="imgWrapper">
                <img class="artistImg" src=${item.img} alt="artistImage" />
            </div>
            <div class="artistInfo">
                <p>${item.name}</p>
            </div>
        </a>
    </article>

`;

export async function artistsPage(ctx){
    let data = await getArtists();
    ctx.render(artistsTemplate(data));
}