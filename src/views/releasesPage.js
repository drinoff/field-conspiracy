import { html } from 'https://unpkg.com/lit-html?module';
import { getReleases } from '../api/data.js'


const releasesTemplate = (data) => html`
    <div>releases</div>
`;

const releaseCard = (item) => html`



`;

export async function releasesPage(ctx) {

    let data = await getReleases();

    ctx.render(releasesTemplate(data));

}