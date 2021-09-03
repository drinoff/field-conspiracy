import { html } from 'https://unpkg.com/lit-html?module';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="emailWrapper">
            <label for="user">Email:</label>
            <input type="text" id="email" name="email" class="email" />
        </div>
        <div class="passwordWrapper">
            <label for="pass">Password:</label>
            <input type="password" id="pass" name="pass" class="pass" />
        </div>
        <div class="loginButtonWrapper">
            <input type="submit" value="Login" />
        </div>
    </form>
</section>
`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();
        const loginForm = document.getElementById('login-form');
        let formData = new FormData(loginForm);

        let email = formData.get('email');
        let password = formData.get('pass');
        if (email === '' || password === '') {
            window.alert(`all fields must be filled`)
        } else {
            
            await login(email, password)
            //ctx.setUserNav();
            ctx.page.redirect('/');
        }
    }
}
