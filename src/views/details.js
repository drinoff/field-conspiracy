import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMemeById } from '../api/data.js';
import {deleteMeme} from '../api/data.js';

const detailsTemplate = (data,onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${data.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${data.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${data.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${(data._ownerId === sessionStorage.userId)
            ?
            html`<a class="button warning" href="/edit/${data._id}">Edit</a>
            <button @click=${onDelete} href='javascript:void(0)' class="button danger">Delete</button>`
            : ''
            }
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const data = await getMemeById(ctx.params.id);
    ctx.render(detailsTemplate(data,onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}