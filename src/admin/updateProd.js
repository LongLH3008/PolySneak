import axios from "axios";
import { products } from "../../utils"
import { deleteData, updateData } from "./handleCRUD";


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

const uploadFiles = async (file, src) => {
    const CLOUD_NAME = "divbg391d";
    const PRESET_NAME = "polysneak-upload";
    const FOLDER_NAME = 'PolySneak';
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('upload_preset', PRESET_NAME);
    formData.append('folder', FOLDER_NAME);
    formData.append('file', file);

    const response = await axios
        .post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    id = response.data.public_id;
    src = response.data.secure_url;
    console.log(`public_id: ${id}`);
    console.log(`secure_url: ${url}`);

    return src;
}

const SendDataUpdate = async (id) => {
    let prod = products.find(pd => pd.id == id);
    let att = prod.attribute;
    let attProd = [];
    for (const { id } of att) {
        const attElement = document.querySelector(`li[name="attElement${id}"]`);
        const colorAtt = document.querySelector(`input[name="colorAtt${id}"]`).value;
        let oldsrc = document.querySelector(`input[name="oldSrcImg${id}"]`).value;
        const inputFile = document.querySelector(`input[name="inputFile${id}"]`);
        const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${id}"]`);

        if (!attElement.classList.contains('hidden')) {
            let sizesProd = [];
            let srcImg = '';
            Array.from(sizeAtt).map(s => {
                s.classList.contains('border-orange-500') ? sizesProd.push(+s.innerText) : ''
            })

            if (inputFile.files[0]) {
                const file = inputFile.files[0];
                const CLOUD_NAME = "divbg391d";
                const PRESET_NAME = "polysneak-upload";
                const FOLDER_NAME = 'PolySneak';
                const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
                const formData = new FormData();
                formData.append('upload_preset', PRESET_NAME);
                formData.append('folder', FOLDER_NAME);
                formData.append('file', file);
            
                const response = await axios
                    .post(api, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    })
                let d = response.data.public_id;
                srcImg = response.data.secure_url;
            }else {
                srcImg = oldsrc
            }

            let att = {
                id: id,
                color: colorAtt,
                img: srcImg,
                sizes: sizesProd.sort((a, b) => a > b)
            }
            attProd.push(att)
        }
    }
    console.log(attProd);
    const idProd = id
    const nameProd = document.querySelector(`input[name="nameProd"]`).value
    const sttProd = document.querySelector(`select[name="sttProd"]`).value
    const typeProd = document.querySelector(`select[name="typeProd"]`).value
    const priceProd = document.querySelector(`input[name="priceProd"]`).value
    const discProd = document.querySelector(`input[name="discProd"]`).value
    const descProd = document.querySelector(`textarea[name="descProd"]`).value;

    let updateProd = {
        id: idProd,
        name: nameProd,
        statusId: sttProd,
        typeId: typeProd,
        cost: priceProd,
        discount: discProd,
        description: descProd,
        attribute: attProd
    };
    // console.log(updateProd);
    updateData(id, updateProd, 'products');
}


export const editProd = (id) => {
    let prod = products.find(pd => pd.id == id);
    let att = prod.attribute;
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
            const required = ['.jpg', '.svg', '.png', '.jpeg', '.gif', '.webp']
            const nameFile = inputFile.files[0].name;
            if (required.find(rq => nameFile.includes(rq))) {
                console.log(nameFile);
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(inputFile.files[0]);
            } else {
                alert('Invalid File !')
            }
        })
    }

    editprod.addEventListener('submit', (e) => {
        e.preventDefault();
        SendDataUpdate(id);
    })
}