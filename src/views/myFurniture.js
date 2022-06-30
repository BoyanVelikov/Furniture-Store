import {html} from '../../node_modules/lit-html/lit-html.js';
import {furnitureTemplate} from './dashboard.js'
import {navUpdate} from '../navigation.js'


const myFurnitureTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
        ${data.map(furnitureTemplate)}
    </div>
`
export async function myFurniturePage(context){
    navUpdate(context);

    const data = await api.myFurniture();
    context.render(myFurnitureTemplate(data))
}