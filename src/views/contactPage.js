import { html } from 'https://unpkg.com/lit-html?module';

const contactTemplate = () => html `
    <section  class="contatc">
        <article class="contactUS">
            <h1>Contact:</h1>
            <p id = 'editableContact'>For demos, bookings or any inquiries, please contact <a class="mailto" href="mailto:fieldconspiracy@gmail.com">fieldconspiracy@gmail.com</a> 
            </p>
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<button class="editButton editContact" >Edit</button>`
            :
            html``}
        </article>
        <article class="about">
            <h1>About:</h1>
            <p id = 'editableAbout'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque cum non eum voluptates nulla corporis fuga
                earum vitae facere? Est.
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
    ctx.render(contactTemplate());

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
        }
    })
    
}