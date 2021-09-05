import { html } from 'https://unpkg.com/lit-html?module';
import { getArtistById } from '../api/data.js';
//import { deleteMeme } from '../api/data.js';

const detailsTemplate = (data, onDelete) => html`
<section id="artistDetails">
    <div className="imgAndName">
        <h1>${data.name}</h1>
        <img src=${data.img} alt="artistImg" />
    </div>
    <article class="artistDescription">
        <p>
            ${data.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${(sessionStorage.getItem("email")==='fieldconspiracy@gmail.com')
        ?
        html`<a class="button warning" href="">Edit</a>
        <button @click=${onDelete} href='javascript:void(0)' class="button danger">Delete</button>`
        : ''
    }
        
    </article>
</section>
`;

export async function detailsPage(ctx) {
    const data = await getArtistById(ctx.params.id);
    ctx.render(detailsTemplate(data, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}