import {html} from '../../node_modules/lit-html/lit-html.js';
import {navUpdate} from '../navigation.js'


const registerTemplate = (onSubmit, emailIsInvalid, passIsInvalid, repassIsInvalid) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${"form-control " + (emailIsInvalid? 'is-invalid':'')} id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${"form-control " + (passIsInvalid? 'is-invalid':'')} id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class=${"form-control " + (repassIsInvalid? 'is-invalid':'')} id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register"/>
            </div>
        </div>
    </form>
`

export async function registerPage(context) {
    navUpdate(context);

    context.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const form = new FormData(ev.target);
        const email = form.get('email');
        const password = form.get('password');
        const rePass = form.get('rePass');

        if (email == '' ||rePass == '') {
            alert('All fields must be filled.')
            return context.render(registerTemplate(onSubmit, email == '', password.length < 6, rePass == ''));
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.')
            return context.render(registerTemplate(onSubmit, false, true,true));
        }

        if (password != rePass) {
            alert('Passwords don\'t match.')
            return context.render(registerTemplate(onSubmit, false, true,true));
        }

        await api.register(email, password);
        context.page.redirect('/');
    }
}