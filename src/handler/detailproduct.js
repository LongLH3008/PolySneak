const DetailProductHandler = () => {
    const colorValue = document.getElementById('colorValue').values;
    const colorBtn = document.querySelectorAll('.chooseColor');
    const img = document.getElementById('imgProduct')

    const changeColorProduct = (arrColorBtn, inputValue, imgProd) => {
        const colorBtn = [...arrColorBtn]
        colorBtn.map(e => {
            e.addEventListener('click', () => {
                colorBtn.map(el => el.classList.remove('border-orange-500'))
                e.classList.add('border-orange-500');
                inputValue = e.dataset.color;
                imgProd.src = e.dataset.img;
                console.log(e.dataset.img);
            })
        })
    }
    changeColorProduct(colorBtn, colorValue, img)

    // ----------------------------------------------------------------

    const sizeValue = document.getElementById('sizeValue').values;
    const sizeBtn = document.querySelectorAll('.chooseSize');

    const changeSizeProduct = (arrSizeBtn, inputValue) => {
        const colorBtn = [...arrSizeBtn]
        colorBtn.map(e => {
            e.addEventListener('click', () => {
                colorBtn.map(el => el.classList.remove('border-orange-500'))
                inputValue = e.innerText.toLowerCase();
                e.classList.add('border-orange-500');
                console.log(inputValue);
            })
        })
    }
    changeSizeProduct(sizeBtn, sizeValue)

    // ----------------------------------------------------------------

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