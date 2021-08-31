import { html } from 'https://unpkg.com/lit-html?module';
import { getCreatives } from '../api/data.js'


const creativesTemplate = (data) => html`
    <div>creatives</div>
`;

const creativesCard = (item) => html`



`;

export async function creativesPage(ctx) {

    let data = await getCreatives();

    ctx.render(creativesTemplate(data));

}