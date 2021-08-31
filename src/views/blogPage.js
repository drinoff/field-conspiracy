import { html } from 'https://unpkg.com/lit-html?module';
import { getBlogArticles } from '../api/data.js'


const blogTemplate = (data) => html`
    <div>blog</div>
`;

const blogCard = (item) => html`



`;

export async function blogPage(ctx) {

    let data = await getBlogArticles();

    ctx.render(blogTemplate(data));

}