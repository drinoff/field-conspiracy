import {html} from '../../node_modules/lit-html/lit-html.js';
import {createMeme} from '../api/data.js'


const createTemplate = (onsubmit) =>html`
<section id="create-meme">
    <form @submit = ${onsubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`;


export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();
        const createForm = document.getElementById('create-form');
        let formData = new FormData(createForm);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        //let _ownerId = sessionStorage.getItem(userId); 
        if (title === '' || description === '' || imageUrl === '') {
            window.alert(`all fields must be filled`)
        } else {
            const body = {
                title,
                description,
                imageUrl
            }
            await createMeme(body)
            ctx.setUserNav();
            ctx.page.redirect('/catalog');
        }
    }

}