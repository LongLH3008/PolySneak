import axios from "axios";
import { products } from "../../utils"
import { deleteData, updateData } from "./handleCRUD";
import { v4 as uuidv4 } from 'uuid';


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

const SendDataUpdate = async (id) => {
    const CLOUD_NAME = "divbg391d";
    const PRESET_NAME = "polysneak-upload";
    const FOLDER_NAME = 'PolySneak';
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    let prod = products.find(pd => pd.id == id);
    let att = prod.attribute;
    let attProd = [];
    let newAttProd = []
    const checkNoneUpdateAttribute = document.querySelectorAll('.attributeProds.hidden');
    const attributeProds = document.querySelectorAll('.attributeProds');
    const newAttribute = document.querySelectorAll('.newAttributeProds');

    for (const { id } of att) {
        const attElement = document.querySelector(`li[name="attElement${id}"]`);
        const colorAtt = document.querySelector(`input[name="colorAtt${id}"]`).value;
        let oldsrc = document.querySelector(`input[name="oldSrcImg${id}"]`).value;
        const inputFile = document.querySelector(`input[name="inputFile${id}"]`);
        const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${id}"]`);

        if (!attElement.classList.contains('hidden')) {
            let baseSizes = [36, 37, 38, 39, 40, 41, 42, 43];
            let sizesProd = [];
            let srcImg = '';
            Array.from(sizeAtt).map(s => {
                s.classList.contains('border-orange-500') ? sizesProd.push(+s.innerText) : ''
            })

            sizesProd.length == 0 ? sizesProd = baseSizes : ''

            if (inputFile.files[0]) {
                const file = inputFile.files[0];
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
            } else {
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

    if (newAttribute.length > 0) {
        for (let index = 0; index <= attributeProds.length; index++) {
            console.log(index);
            let colorAtt = document.querySelector(`input[name="new_colorAtt${index}"]`);
            let inputFile = document.querySelector(`input[name="new_inputFile${index}"]`);
            let sizeAtt = document.querySelectorAll(`span[name="new_sizeAtt${index}"]`);

            if (colorAtt && inputFile && sizeAtt) {
                let baseSizes = [36, 37, 38, 39, 40, 41, 42, 43];
                let sizesProd = [];
                let srcImg = '';
                Array.from(sizeAtt).map(s => {
                    s.classList.contains('border-orange-500') ? sizesProd.push(+s.innerText) : ''
                })

                sizesProd.length == 0 ? sizesProd = baseSizes : ''

                const file = inputFile.files[0];
                formData.append('upload_preset', PRESET_NAME);
                formData.append('folder', FOLDER_NAME);
                formData.append('file', file);

                const response = await axios
                    .post(api, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    })
                srcImg = response.data.secure_url;

                let att = {
                    id: uuidv4(),
                    color: colorAtt.value,
                    img: srcImg,
                    sizes: sizesProd.sort((a, b) => a > b)
                }
                attProd.push(att)
            }
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

    if (checkNoneUpdateAttribute.length == att.length && newAttribute.length == 0) {
        alert('Please update at least one img/color/sizes !')
    } else {
        let updateProd = {
            id: idProd,
            name: nameProd,
            statusId: Number(sttProd),
            typeId: Number(typeProd),
            cost: Number(priceProd),
            discount: Number(discProd),
            description: descProd,
            attribute: attProd
        };
        console.log(updateProd);
        updateData(id, updateProd, 'products');
    }

}

const creatAttElement = () => {
    const baseSizes = [36, 37, 38, 39, 40, 41, 42, 43];
    const attributeProds = document.querySelectorAll('.attributeProds');
    const id = attributeProds.length + 1;

    if (attributeProds.length == 6) {
        alert('Cannot more than 6 attributes !')
    } else {
        let newAttElement = document.createElement('li');
        newAttElement.setAttribute('name', `new_attElement${id}`)
        newAttElement.classList = 'newAttributeProds attributeProds flex justify-between items-start mb-2 gap-5 border-s ps-4 hover:border-orange-500 relative';
        newAttElement.innerHTML = `
            <span name="new_removeAtt${id}" class="p-2 border active:translate-y-1 active:border-orange-500 hover:border-orange-500 cursor-pointer"><i class="fa-solid fa-trash"></i></span>
            <div class="w-2/3 grid grid-rows-5">
                <div class="row-span-2">
                    <input required name="new_colorAtt${id}" value="" type="text" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4">
                </div>
                <div class="mt-2 row-span-3 grid grid-cols-5 gap-5">
                    ${baseSizes.map(s => `
                        <span name="new_sizeAtt${id}" class="sizeProds text-center cursor-pointer p-2 w-5/6 border hover:border-orange-500 rounded-sm font-semibold">${s}</span>
                    `).join('')}
                </div>
            </div>
            <div class="w-1/3 overflow-hidden h-48 flex items-center relative border hover:border-orange-400">
                <input name="new_inputFile${id}" class="opacity-0 self-center" type="file" required>
                <span name="new_changeImgAtt${id}" class="absolute right-0 top-0 flex items-center justify-center bg-opacity-0 bg-zinc-600 text-transparent w-full h-full cursor-pointer hover:text-orange-600 hover:bg-opacity-20 text-3xl"><i class="fa-regular fa-image"></i></span>
                <img name="new_previewImg${id}" class="w-full" src="">
            </div>   
        `
        let colorsProds = document.getElementById('colorsProds');
        colorsProds.insertAdjacentElement("beforeend", newAttElement)
        // colorsProds.appendChild(newAtt);
        // console.log(newAtt);
    }
    handlerNewAttElement(id);
}

const handlerNewAttElement = (id) => {
    let colorsProds = document.getElementById('colorsProds');
    let previewImg = document.querySelector(`img[name="new_previewImg${id}"]`);
    const changeImgAtt = document.querySelector(`span[name="new_changeImgAtt${id}"]`);
    const inputFile = document.querySelector(`input[name="new_inputFile${id}"]`);
    const sizeAtt = document.querySelectorAll(`span[name="new_sizeAtt${id}"]`);
    const attElement = document.querySelector(`li[name="new_attElement${id}"]`);
    const removeAtt = document.querySelector(`span[name="new_removeAtt${id}"]`);

    removeAtt.addEventListener('click', () => {
        colorsProds.removeChild(attElement);
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

export const editProd = (id) => {
    const addAtt = document.querySelector('span[name="addAtt"]');

    addAtt.addEventListener('click', () => {
        creatAttElement();
    })

    let prod = products.find(pd => pd.id == id);
    let price = prod.cost
    let att = prod.attribute;
    const reset = document.querySelector('button[name="reset"]');
    const editprod = document.querySelector('#editprod');

    let priceProd = document.querySelector('input[name="priceProd"]');
    let calcDiscProd = document.querySelector('input[name="calcDiscProd"]');
    const discProd = document.querySelector('input[name="discProd"]');

    discProd.addEventListener('input', () => {
        let disc = (discProd.value);
        if (disc >= 0 && disc < 100) {
            priceProd.classList.remove('border-zinc-300', 'text-orange-500')
            priceProd.classList.add('border-orange-500', 'text-orange-500')
            calcDiscProd.classList.remove('border-zinc-300', 'text-orange-500')
            calcDiscProd.classList.add('border-orange-500', 'text-orange-500')
            let calcdiscount = (100 - disc) * price / 100;
            calcDiscProd.value = disc == 0 ? 'No discount' : Math.ceil(calcdiscount / 100) * 100;
            disc == 0 ? priceProd.classList.remove('line-through') : priceProd.classList.add('line-through');
        }
    })

    discProd.addEventListener('blur', () => {
        calcDiscProd.classList.add('border-zinc-300', 'text-orange-500')
        calcDiscProd.classList.remove('border-orange-500', 'text-orange-500')
        priceProd.classList.add('border-zinc-300');
        priceProd.classList.remove('text-orange-500');
    })

    reset.addEventListener('click', () => {
        const newAttributeProds = document.querySelectorAll('.newAttributeProds');
        let colorsProds = document.getElementById('colorsProds');

        if (newAttributeProds.length > 0) {
            Array.from(newAttributeProds).map(e => {
                colorsProds.removeChild(e);
            })
        }

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