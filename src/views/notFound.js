import { html } from 'https://unpkg.com/lit-html?module';

const notFound = () => html `

<img src="../../assets/notFound.png" alt="notFoundImg" />
<p style="font-size:22px">The Resource you looking for is Not Found</p>
`;

export function notFoundPage(ctx) {
    ctx.render(notFound());
}