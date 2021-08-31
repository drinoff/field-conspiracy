import { html } from 'https://unpkg.com/lit-html?module';

const contactTemplate = () => html`
    <div>contact</div>
`;


export async function contactPage(ctx) {
    ctx.render(contactTemplate());
}