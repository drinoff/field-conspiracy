import { html } from 'https://unpkg.com/lit-html?module';
import { getShows } from '../api/data.js'


const showsTemplate = (data) => html`
    <div>releases</div>
`;

const showsCard = (item) => html`



`;

export async function showsPage(ctx) {

    let data = await getShows();

    ctx.render(showsTemplate(data));

}