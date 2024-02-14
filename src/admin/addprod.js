import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { createData } from "./handleCRUD";
import { products } from "../../utils";

const creatAttElement = () => {
    const baseSizes = [36, 37, 38, 39, 40, 41, 42, 43];
    const attributeProds = document.querySelectorAll('.attributeProds');
    const id = attributeProds.length + 1;

    if (attributeProds.length == 6) {
        alert('Cannot more than 6 attributes !')
    } else {
        let newAttElement = document.createElement('li');
        newAttElement.setAttribute('name', `attElement${id}`)
        newAttElement.classList = 'newAttributeProds attributeProds flex justify-between items-start mb-2 gap-5 border-s ps-4 hover:border-orange-500 relative';
        newAttElement.innerHTML = `
            <span name="removeAtt${id}" class="p-2 border active:translate-y-1 active:border-orange-500 hover:border-orange-500 cursor-pointer"><i class="fa-solid fa-trash"></i></span>
            <div class="w-2/3 grid grid-rows-5">
                <div class="row-span-2">
                    <input required name="colorAtt${id}" value="" type="text" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4">
                </div>
                <div class="mt-2 row-span-3 grid grid-cols-5 gap-5">
                    ${baseSizes.map(s => `
                        <span name="sizeAtt${id}" class="sizeProds text-center cursor-pointer p-2 w-5/6 border hover:border-orange-500 rounded-sm font-semibold">${s}</span>
                    `).join('')}
                </div>
            </div>
            <div class="w-1/3 overflow-hidden h-48 flex items-center relative border border-zinc-500 hover:border-orange-400">
                <input name="inputFile${id}" class="opacity-0 self-center" type="file" required>
                <span name="changeImgAtt${id}" class="absolute right-0 top-0 flex items-center justify-center bg-opacity-0 bg-zinc-600 text-transparent w-full h-full cursor-pointer hover:text-orange-600 hover:bg-opacity-20 text-3xl"><i class="fa-regular fa-image"></i></span>
                <img name="previewImg${id}" class="w-full" src="">
            </div>   
        `
        let colorsProds = document.getElementById('colorsProds');
        colorsProds.insertAdjacentElement("beforeend", newAttElement)
        // colorsProds.appendChild(newAtt);
        // console.log(newAttElement);
    }
    handlerNewAttElement(id);
}

const handlerNewAttElement = (id) => {
    let colorsProds = document.getElementById('colorsProds');
    let previewImg = document.querySelector(`img[name="previewImg${id}"]`);
    const changeImgAtt = document.querySelector(`span[name="changeImgAtt${id}"]`);
    const inputFile = document.querySelector(`input[name="inputFile${id}"]`);
    const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${id}"]`);
    const attElement = document.querySelector(`li[name="attElement${id}"]`);
    const removeAtt = document.querySelector(`span[name="removeAtt${id}"]`);

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

const SendDataNewProd = async () => {
    const CLOUD_NAME = "divbg391d";
    const PRESET_NAME = "polysneak-upload";
    const FOLDER_NAME = 'PolySneak';
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    let attProd = [];
    const attributeProds = document.querySelectorAll('.attributeProds');

    for (let index = 0; index <= attributeProds.length; index++) {
        console.log(index);
        const colorAtt = document.querySelector(`input[name="colorAtt${index}"]`);
        const inputFile = document.querySelector(`input[name="inputFile${index}"]`);
        const sizeAtt = document.querySelectorAll(`span[name="sizeAtt${index}"]`);

        if (colorAtt && inputFile && sizeAtt) {
            let baseSizes = [36, 37, 38, 39, 40, 41, 42, 43];
            let sizesProd = [];
            let srcImg = '';
            Array.from(sizeAtt).map(s => {
                s.classList.contains('border-orange-500') ? sizesProd.push(+s.innerText) : ''
            })

            sizesProd.length == 0 ? sizesProd = baseSizes : ''
            console.log('ok ở đây');
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
                id: index,
                color: colorAtt.value,
                img: srcImg,
                sizes: sizesProd.sort((a, b) => a > b)
            }
            attProd.push(att)
        }
    }
    console.log(attProd);

    const nameProd = document.querySelector(`input[name="nameProd"]`).value
    const sttProd = document.querySelector(`select[name="sttProd"]`).value
    const typeProd = document.querySelector(`select[name="typeProd"]`).value
    const priceProd = document.querySelector(`input[name="priceProd"]`).value
    const discProd = document.querySelector(`input[name="discProd"]`).value
    const descProd = document.querySelector(`textarea[name="descProd"]`).value;

    const checkname = products.find(pd => pd.name == nameProd);
    if (checkname == undefined) {
        let newProd = {
            id: uuidv4(),
            name: nameProd,
            statusId: sttProd,
            typeId: typeProd,
            cost: priceProd,
            discount: discProd,
            description: descProd,
            attribute: attProd
        };
        createData(newProd, 'products')
    }else {
        alert('Name existed !')
    }

}

export const handleAddProd = () => {
    const addprod = document.querySelector(`#addprod`);
    let priceProd = document.querySelector('input[name="priceProd"]');
    let calcDiscProd = document.querySelector('input[name="calcDiscProd"]');
    const discProd = document.querySelector('input[name="discProd"]');

    discProd.addEventListener('input', () => {
        let disc = (discProd.value);
        if (disc >= 0 && disc < 100) {
            let price = priceProd.value
            if (price !== '') {
                priceProd.classList.remove('border-zinc-300', 'text-orange-500')
                priceProd.classList.add('border-orange-500', 'text-orange-500')
                calcDiscProd.classList.remove('border-zinc-300', 'text-orange-500')
                calcDiscProd.classList.add('border-orange-500', 'text-orange-500')
                let calcdiscount = (100 - disc) * price / 100;
                calcDiscProd.value = disc == 0 ? 'No discount' : Math.ceil(calcdiscount / 100) * 100;
                disc == 0 ? priceProd.classList.remove('line-through') : priceProd.classList.add('line-through');
            }
        }
    })

    discProd.addEventListener('blur', () => {
        calcDiscProd.classList.add('border-zinc-300', 'text-orange-500')
        calcDiscProd.classList.remove('border-orange-500', 'text-orange-500')
        priceProd.classList.add('border-zinc-300');
        priceProd.classList.remove('text-orange-500');
    })

    const addAtt = document.querySelector('span[name="addAtt"]');
    addAtt.addEventListener('click', () => {
        creatAttElement();
    })

    handlerNewAttElement(1);

    const reset = document.querySelector('button[name="reset"]');
    reset.addEventListener('click', () => {
        const attributeProds = document.querySelectorAll('.attributeProds');
        let colorsProds = document.getElementById('colorsProds');
        const sizeAtt = document.querySelectorAll(`span[name="sizeAtt1"]`);
        Array.from(sizeAtt).map(e => e.classList.remove('border-orange-500'));

        let i = 2;
        if (attributeProds.length >= 2) {
            for (let index = 1; index < attributeProds.length; index++) {
                const attElement = document.querySelector(`li[name="attElement${index + 1}"]`);
                colorsProds.removeChild(attElement);
            }
        }
    })

    addprod.addEventListener('submit', (e) => {
        e.preventDefault();
        SendDataNewProd();
    });
}