import { html } from 'https://unpkg.com/lit-html?module';
import { getAbout, getContact, updateAbout, updateContact } from '../api/data.js';

const contactTemplate = (contact, about) => html `
    <section  class="contact">
        <article class="contactUS">
            <h1>Contact:</h1>
            <p id = 'editableContact'> ${contact} 
            </p>
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<button class="editButton editContact" >Edit</button>`
            :
            html``}
        </article>
        <img class="soundWeave" src="/assets/beforeFooter.png" alt="" />
        <article class="about">
            <h1>About:</h1>
            <p id = 'editableAbout'>${about}
            </p>
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<button class="editButton editAbout" >Edit</button>`
            :
            html``}
        </article>
    </section>
    
`;


export async function contactPage(ctx) {
    let contact = await getContact();
    let about = await getAbout();
    ctx.render(contactTemplate(contact, about));

    const editContact = document.getElementsByClassName('editContact')[0];
    const editAbout = document.getElementsByClassName('editAbout')[0];
    const editableCont = document.getElementById('editableContact');
    const editableAbout = document.getElementById('editableAbout');
    editContact.addEventListener('click', (e)=>{
        if(e.target.textContent === 'Edit'){
            editableCont.contentEditable = true;
            editableCont.focus();
            editContact.textContent = "Save";
        }else if (e.target.textContent === 'Save'){
            editableCont.contentEditable = false;
            editableCont.blur();
            editContact.textContent = "Edit";
            updateContact(editableCont.textContent);
        }
    });

    editAbout.addEventListener('click', (e)=>{
        if(e.target.textContent === 'Edit'){
            editableAbout.contentEditable = true;
            editableAbout.focus();
            editAbout.textContent = "Save";
        }else if (e.target.textContent === 'Save'){
            editableAbout.contentEditable = false;
            editableAbout.blur();
            editAbout.textContent = "Edit";
            updateAbout(editableAbout.textContent);
        }
    })
    
}