import {html} from '../../node_modules/lit-html/lit-html.js';
import {navUpdate} from '../navigation.js'


const loginTemplate = (onSubmit, allGood) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${"form-control " + (allGood ? '' : 'is-invalid')} id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${"form-control " + (allGood ? '' : 'is-invalid')} id="password" type="password"
                           name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login"/>
            </div>
        </div>
    </form>
`

export async function loginPage(context) {
    navUpdate(context);

    context.render(loginTemplate(onSubmit, true));

    async function onSubmit(ev) {
        ev.preventDefault();

        const form = new FormData(ev.target);
        const email = form.get('email');
        const password = form.get('password');

        const response = await api.login(email, password);

        if(response == null) return context.render(loginTemplate(onSubmit, false));

        context.page.redirect('/');
    }
}