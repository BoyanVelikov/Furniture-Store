import {html} from '../../node_modules/lit-html/lit-html.js';
import {navUpdate} from '../navigation.js'

const detailsTemplate = (item, isOwner, onDelete) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material != null ? item.material : 'not known'}</span></p>
            ${isOwner ?
                    html`
                        <div>
                            <a href=${`../edit/${item._id}`} class="btn btn-info">Edit</a>
                            <a @click=${onDelete} href='javascript:void(0)' class="btn btn-red">Delete</a>
                        </div>`
                    : ''
            }
        </div>
    </div>
`

export async function detailsPage(context) {
    const id = context.params.id;
    const item = await api.details(id);
    const isOwner = sessionStorage.getItem('userId') == item._ownerId;

    async function onDelete() {
        if (confirm('Are you sure you want to delete this item?')) await api.del(id)
        context.page.redirect('/')
    }

    if (sessionStorage.getItem('authToken')) context.render(detailsTemplate(item, isOwner, onDelete));
    else context.render(detailsTemplate(item));
}