import { html } from 'https://unpkg.com/lit-html?module';


const loginTemplate = (onSubmit) => html `
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
            let data = {
                email_address: email,
                pass: password
            }
            fetch('/.netlify/functions/auth', {
                method: 'POST',

                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            .then(responce => responce.json())
                .then(data => {
                    if (data.detail.error) {
                        window.alert('Wrong Credentials!')
                        ctx.page.redirect('/login')
                    } else {
                        window.sessionStorage.setItem("email", data.detail.email);
                        window.sessionStorage.setItem("id", data.detail.idToken);
                        ctx.setUserNav();
                        ctx.page.redirect('/');
                    }
                })



        }
    }
}