import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMemeById } from '../api/data.js';
import {editMeme} from '../api/data.js'


const editTemplate = (data,onSubmit) =>html`
<section id="edit-meme">
    <form @submit = ${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" >
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                    ${data.description} 
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export async function editPage(ctx){
    const data = await getMemeById(ctx.params.id)
    ctx.render(editTemplate(data,onSubmit))
    document.getElementById('title').value = data.title;
    document.getElementById('imageUrl').value = data.imageUrl;

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

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
            await editMeme(ctx.params.id, body)
            ctx.setUserNav();
            ctx.page.redirect('/details/' + ctx.params.id);
        }
    }
}