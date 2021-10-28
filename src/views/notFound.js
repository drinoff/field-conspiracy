import { html } from 'https://unpkg.com/lit-html?module';

const notFound = () => html `

<p>Not Found</p>
`;

export function notFoundPage(ctx) {
    ctx.render(notFound());
}