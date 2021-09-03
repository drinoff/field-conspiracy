import { html } from 'https://unpkg.com/lit-html?module';

const contactTemplate = () => html`
    <section class="contatc">
        <article class="contactUS">
            <h1>Contact:</h1>
            <p>For demos, bookings or any inquiries, please contact <a class="mailto" href="mailto:fieldconspiracy@gmail.com">fieldconspiracy@gmail.com</a> 
            </p>
        </article>
        <article class="about">
            <h1>About:</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque cum non eum voluptates nulla corporis fuga
                earum vitae facere? Est.
            </p>
        </article>
    </section>
`;


export async function contactPage(ctx) {
    ctx.render(contactTemplate());

}