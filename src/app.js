import * as api from './api/functions.js';
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'
import { navUpdate } from './navigation.js'
import { dashboardPage } from './views/dashboard.js'
import { registerPage } from './views/register.js'
import { loginPage } from './views/login.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { myFurniturePage } from './views/myFurniture.js'

window.api = api;

navUpdate();

const container = document.querySelector('.container');

page('/', contextRender, dashboardPage)
page('/register', contextRender, registerPage)
page('/login', contextRender, loginPage)
page('/create', contextRender, createPage)
page('/details/:id', contextRender, detailsPage)
page('/edit/:id', contextRender, editPage)
page('/my-furniture', contextRender, myFurniturePage)

page.start();

function contextRender(context, next){
    context.render = (content) => render(content, container);
    next()
}

