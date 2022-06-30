import {html} from '../../node_modules/lit-html/lit-html.js';
import {navUpdate} from '../navigation.js'


const createTemplate = (onSubmit, isSubmited, validMake, validModel, validYear, validDescription, validPrice, validImg) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class=${isSubmited? `form-control ${(validMake? 'is-valid':'is-invalid')}`: "form-control"} id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class=${isSubmited? `form-control ${(validModel? 'is-valid':'is-invalid')}`: "form-control"} id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class=${isSubmited? `form-control ${(validYear? 'is-valid':'is-invalid')}`: "form-control"} id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class=${isSubmited? `form-control ${(validDescription? 'is-valid':'is-invalid')}`: "form-control"} id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class=${isSubmited? `form-control ${(validPrice? 'is-valid':'is-invalid')}`: "form-control"} id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class=${isSubmited? `form-control ${(validImg? 'is-valid':'is-invalid')}`: "form-control"} id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create"/>
            </div>
        </div>
    </form>
`

export async function createPage(context) {
    navUpdate(context);
    return context.render(createTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault();
        const form = new FormData(ev.target);
        const make = form.get('make');
        const model = form.get('model');
        const year = form.get('year');
        const description = form.get('description');
        const price = form.get('price');
        const img = form.get('img');
        const material = form.get('material');

        const validMake = make.length >= 4;
        const validModel = model.length >= 4;
        const validYear = Number(year) >= 1950 && Number(year) <= 2050;
        const validDescription = description.length > 10;
        const validPrice = Number(price) > 0;
        const validImg = img != null;

        let isInvalid = false, invalidMsg = [];

        if (!validMake) {
            isInvalid = true;
            invalidMsg.push('Make must be at least 4 symbols long.')
        }
        if (!validModel) {
            isInvalid = true;
            invalidMsg.push('Model must be at least 4 symbols long.')
        }
        if (!validYear) {
            isInvalid = true;
            invalidMsg.push('Year must be between 1950 and 2050.')
        }
        if (!validDescription) {
            isInvalid = true;
            invalidMsg.push('Description must be more than 10 symbols long.')
        }
        if (!validPrice) {
            isInvalid = true;
            invalidMsg.push('Price must be a positive number.')
        }
        if (!validImg) {
            isInvalid = true;
            invalidMsg.push('Image URL is required.')
        }

        if (isInvalid) {
            alert(invalidMsg.join('\n'))
            return context.render(createTemplate(onSubmit,true,  validMake, validModel, validYear, validDescription, validPrice, validImg))
        } else {
            const created = await api.create({make, model, year, description, price, img, material})
            context.page.redirect(`/details/${created._id}`);
            navUpdate(null, '/my-furniture');
        }
    }
}
