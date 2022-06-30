import {html, render} from '../node_modules/lit-html/lit-html.js';

const navContainer = document.querySelector('header')

const navTemplate = (activePath, isLogged, onLogout) => html`
    <h1><a href="/">Furniture Store</a></h1>
    <nav>
        <a class=${activePath == '/' ? 'active':''} id="catalogLink" href="/" >Dashboard</a>
        ${ isLogged ? html
        `<div id="user">
            <a class=${activePath == 'create' ? 'active' : ''} id="createLink" href="/create">Create Furniture</a>
            <a class=${activePath == 'my-furniture' ? 'active' : ''} id="profileLink" href="/my-furniture">My
                Publications</a>
            <a @click=${onLogout} id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>`
            : html
        `<div id="guest">
            <a class=${activePath == '/login' ? 'active' : ''} id="loginLink" href="/login">Login</a>
            <a class=${activePath == '/register' ? 'active' : ''} id="registerLink" href="/register">Register</a>
        </div>`
        }
    </nav>
`

let ctx;
function onLogout(){
    if(confirm('Are you sure you want to log out?')){
        api.logout();

        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');

        navUpdate();
    }
}

export function navUpdate(context, customPath){
    let activePath = context ? context.path : '/';
    if(customPath) activePath = customPath;
    const isLogged = sessionStorage.getItem('authToken') != null;

    render(navTemplate(activePath, isLogged, onLogout), navContainer);
}
