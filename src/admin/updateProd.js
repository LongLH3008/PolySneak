import { products } from "../../utils"
import { deleteData } from "./handleCRUD";


export const updateProd = () => {
    for (const { id } of products) {
        const edit = document.querySelector(`button[name="editProds_${id}"`);
        const del = document.querySelector(`button[name="delProds_${id}"`);

        del.addEventListener("click", () => {
            const id = del.dataset.id;
            deleteData(id, 'products');
        })

        edit.addEventListener('click', () => {
            const id = edit.dataset.id;
            window.location.href = `/admin/editprod/${id}`
        })
    }
}