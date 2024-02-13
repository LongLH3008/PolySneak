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

export const editProd = (id) => {
    const prod = products.find(pd => pd.id == id);
    const att = prod.attribute;
    const reset = document.querySelector('button[name="reset"]');
    const editprod = document.querySelector('#editprod');

    reset.addEventListener('click', () => {
        for (const { id, img, sizes } of att) {
            let previewImg = document.querySelector(`img[name="previewImg${id}"]`);
            previewImg.src = img;

            const attElement = document.querySelector(`li[name="attElement${id}"]`);
            attElement.classList.remove('hidden');

            const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${id}"]`);
            Array.from(sizeAtt).map(s => {
                sizes.includes(+s.innerText)
                    ? s.classList.add('border-orange-500')
                    : s.classList.remove('border-orange-500');
            })
        }
    })

    for (const { id } of att) {
        let oldsrc = document.querySelector(`input[name="oldSrcImg${id}"]`);
        let previewImg = document.querySelector(`img[name="previewImg${id}"]`);
        const changeImgAtt = document.querySelector(`span[name="changeImgAtt${id}"]`);
        const inputFile = document.querySelector(`input[name="inputFile${id}"]`);
        const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${id}"]`);
        const attElement = document.querySelector(`li[name="attElement${id}"]`);
        const removeAtt = document.querySelector(`span[name="removeAtt${id}"]`);

        removeAtt.addEventListener('click', () => {
            attElement.classList.add('hidden')
        })

        Array.from(sizeAtt).map(s => {
            s.addEventListener('click', () => {
                s.classList.toggle('border-orange-500');
            })
        })

        changeImgAtt.addEventListener('click', () => {
            inputFile.click();
        });

        inputFile.addEventListener('input', () => {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(inputFile.files[0]);
        })
    }

    editprod.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit');
    })
}