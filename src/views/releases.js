import {html} from 'https://unpkg.com/lit-html?module';
import getReleases from '../api/data.js'


const releasesTemplate = (data) => html`

`;

const releaseCard = (item) =>html`



`;

export async function releasesPage(ctx) {
    
    let data = await getReleases();
    
    ctx.render(releasesTemplate(data))

}