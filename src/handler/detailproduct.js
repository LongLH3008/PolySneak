import { products } from "../../utils";

const changeSizeProduct = (arrSizeBtn, inputValue) => {
    const colorBtn = [...arrSizeBtn]
    colorBtn.map(e => {
        e.addEventListener('click', () => {
            colorBtn.map(el => el.classList.remove('border-orange-500'))
            inputValue.value = e.innerText.toLowerCase();
            e.classList.add('border-orange-500');
        })
    })
}

const renderSizes = (container, arrdata = []) => {
    container.innerHTML = `
    ${Array.from(arrdata).map(size => `
        <button class="chooseSize p-2 px-3 rounded-sm border font-semibold ${size === arrdata[0] ? 'border-orange-500' : ''}">${size}</button>
    `).join('')}
    `

    const sizeValue = document.getElementById('sizeValue');
    const sizeBtn = document.querySelectorAll('.chooseSize');
    changeSizeProduct(sizeBtn, sizeValue)
}

const DetailProductHandler = (id) => {
    const colorValue = document.getElementById('colorValue');
    const colorBtn = document.querySelectorAll('.chooseColor');
    const img = document.getElementById('imgProduct')
    const sizeProds = document.querySelector('#sizeProds');
    
    const sizeValue = document.getElementById('sizeValue');
    const sizeBtn = document.querySelectorAll('.chooseSize');

    Array.from(sizeBtn).map(e => {
        e.addEventListener('click', () => {
            Array.from(sizeBtn).map(el => el.classList.remove('border-orange-500'))
            sizeValue.value = e.innerText.toLowerCase();
            e.classList.add('border-orange-500');
        })
    })

    const changeColorProduct = (arrColorBtn, inputValue, imgProd) => {
        const prod = products.find(pd => pd.id == id);
        const colorBtn = [...arrColorBtn]
        colorBtn.map(e => {
            e.addEventListener('click', () => {
                colorBtn.map(el => el.classList.remove('border-orange-500'))
                e.classList.add('border-orange-500');
                inputValue.value = e.dataset.att;
                imgProd.src = e.dataset.img;
                let idAtt = e.dataset.att;
                const att = prod.attribute.find(e => e.id == idAtt);
                renderSizes(sizeProds, att.sizes)
            })
        })
    }
    changeColorProduct(colorBtn, colorValue, img)
    
    const minus = document.getElementById('minus');
    const plus = document.getElementById('plus');
    const amountInput = document.getElementById('amount');

    minus.addEventListener('click', () => {
        let amount = parseInt(amountInput.value)
        if (amount > 1) {
            amount = amount - 1;
            amountInput.value = amount;
        }
    });

    plus.addEventListener('click', () => {
        let amount = parseInt(amountInput.value)
        if (amount < 5) {
            amount = amount + 1;
            amountInput.value = amount;
        }
    });
}

export default DetailProductHandler