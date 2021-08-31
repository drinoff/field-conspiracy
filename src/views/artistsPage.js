import { html } from 'https://unpkg.com/lit-html?module';
import { getArtists } from '../api/data.js';

const artistsTemplate = (data) =>html`

    <div>artists</div>

`;

const artistCard = (item)=>html`


`;

export async function artistsPage(ctx){
    let data = await getArtists();
    ctx.render(artistsTemplate(data));
}