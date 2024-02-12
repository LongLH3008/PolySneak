import { sendRequest, getData, deleteData, updateData, createData } from '../admin/handleCRUD.js';
import { user, data, router, products } from "../../utils"
import { v4 as uuidv4 } from 'uuid';
import OrderProds from '../pages/orderProds.js';

const AddToCart = (id, size, att = 1, amt = 1) => {
    if (user) {
        const newData = data.find(dt => dt.username == user);
        let cartUser = data.find(dt => dt.username === user).cart;
        let checkId = cartUser.find(c => c.idpro == id);
        let checkSize = checkId?.size == size
        let checkAtt = checkId?.attribute == att

        console.log(`inputSize: ${size} - compare data: ${checkId?.size}`);
        console.log(`inputAtt: ${att} - compare data: ${checkId?.attribute}`);

        if (checkAtt && checkSize) {
            cartUser.map(c => {
                if (c.idpro == id) {
                    let plus = Number(c.amount) + 1;
                    c.amount = plus > 5 ? 5 : plus;
                    newData.cart = cartUser;
                }
            })
        } else {
            const newProd = {
                "id": uuidv4(),
                "idpro": id,
                "attribute": att,
                "size": size,
                "amount": amt,
            }
            newData.cart.push(newProd);
        }
        updateData(newData.id, newData, 'users');
    } else {
        alert('Please sign in first !');
        setTimeout(() => {
            router.navigate('/signin');
        }, 1000)
    }
}

export const changeAmount = (id = '') => {
    const cartUser = data.find(dt => dt.username == user).cart;
    const newData = data.find(dt => dt.username == user);
    cartUser.map(c => {
        const change = document.querySelector(`input[name="change_amount${c.id}"]`);
        change.addEventListener('input', () => {
            let check = change.value > 5 ? 5 : change.value;
            c.amount = check > 0 ? check : 1;
            newData.cart = cartUser;
            updateData(newData.id, newData, 'users');
        })
    })
}

export const removeProductFromCart = () => {
    const cartUser = data.find(dt => dt.username == user).cart;
    const newData = data.find(dt => dt.username == user);
    for (const { id } of cartUser) {
        const remove = document.querySelector(`span[name="remove_prod${id}"]`)
        remove.addEventListener('click', () => {
            const removed = cartUser.filter(c => c.id !== id);
            newData.cart = removed;
            updateData(newData.id, newData, 'users');
        })
    }
}

export const HomeAddToCart = () => {
    for (const { id } of products) {
        const add = document.querySelector(`#home_add_to_cart${id}`);
        const size = document.querySelector(`input[name="size_pro_home${id}"`)
        if (add && size) {
            add.addEventListener('click', (e) => {
                e.preventDefault()
                AddToCart(id, size.value)
            })
        }
    }
}

export const ListProdAddToCart = () => {
    for (const { id } of products) {
        const add = document.querySelector(`#listprod_add_to_cart${id}`);
        const size = document.querySelector(`input[name="size_pro_listprod${id}"`)
        const att = document.querySelector(`input[name="attribute_pro_listprod${id}"`)
        if (add && size && att) {
            add.addEventListener('click', (e) => {
                e.preventDefault()
                AddToCart(id, size.value)
            })
        }
    }
}

export const DetailProdAddToCart = (idpro) => {
    const add = document.querySelector('span[name="add"]');
    add.addEventListener('click', () => {
        const amount = document.querySelector('input[name="amount"]').value;
        const size = document.querySelector('input[name="size"]').value;
        const att = document.querySelector('input[name="att"]').value;
        AddToCart(idpro, size, att, amount);
    })
}

export const chooseToOrder = () => {
    const cartUser = data.find(dt => dt.username == user).cart;
    const amount = document.querySelectorAll('.changeAmount');
    const removeProd = document.querySelectorAll('.removeProd');
    const checkall = document.querySelector('span[name="checkall"]');
    const uncheckall = document.querySelector('span[name="uncheckall"]');
    const deleteall = document.querySelector('span[name="deleteall"]');
    const allproducts = document.querySelectorAll('.products_in_cart');
    const checkprod = document.querySelectorAll('.checkprod');
    const order = document.getElementById('right_cart');
    let arrOrder = [];
    let trans = 0;

    for (let index = 0; index < allproducts.length; index++) {
        let isChange = false;
        const pd = allproducts[index];
        const checked = checkprod[index];
        const remove = removeProd[index];
        const changeAmount = amount[index];
        const choose = checked.dataset.idcart

        changeAmount.addEventListener('click', () => { isChange = true })
        remove.addEventListener('click', () => { isChange = true })

        function renderOrder() {
            let orderProds = [];
            if (arrOrder.length > 0) {
                arrOrder.map(d => {
                    for (let index = 0; index < cartUser.length; index++) {
                        if (cartUser[index].id == d) {
                            orderProds.push(cartUser[index]);
                        }
                    }
                })
                order.innerHTML = OrderProds(orderProds)
            } else {
                order.innerHTML = `
                <h1 class="flex justify-between items-center">
                    <span class="text-2xl font-semibold"><i class="fa-solid fa-box"></i> Order</span>
                    <span class="p-4 py-2 bg-gradient-to-tr from-zinc-600 to-gray-500 rounded-md text-white"><i class="fa-solid fa-bag-shopping"></i> ${cartUser.reduce((total, { amount }) => Number(amount) + total, 0)}</span>
                </h1>
                <ul id="order_info" class="mt-5 p-3 text-zinc-400 overflow-y-scroll overscrollHidden border border-dashed border-zinc-300"></ul>
                `
            }
        }

        function hide() {
            pd.classList.contains('bg-zinc-200') && trans < allproducts.length ? trans += 1 : '';
            !pd.classList.contains('bg-zinc-200') && trans > 0 ? trans -= 1 : '';
            trans > 0 ? uncheckall.classList.remove('hidden') : uncheckall.classList.add('hidden');
            trans > 0 ? deleteall.classList.remove('hidden') : deleteall.classList.add('hidden');
            trans < allproducts.length ? checkall.classList.remove('hidden') : checkall.classList.add('hidden');
            pd.classList.contains('bg-zinc-200')
                ? arrOrder.push(choose)
                : arrOrder = arrOrder.filter(a => a !== choose)
            // console.log(trans);
        }

        pd.addEventListener('click', (event) => {
            if (isChange) {
                event.preventDefault()
            } else {
                checked.classList.toggle('hidden')
                pd.classList.toggle('bg-zinc-200');
                pd.classList.toggle('ps-3');
                uncheckall.classList.remove('hidden')
                hide();
                renderOrder();
            }
        })

        checkall.addEventListener('click', () => {
            checkall.classList.add('hidden')
            uncheckall.classList.remove('hidden')
            deleteall.classList.remove('hidden')

            checked.classList.remove('hidden')
            pd.classList.add('bg-zinc-200', 'ps-3');
            hide()
            renderOrder();
        })

        uncheckall.addEventListener('click', () => {
            checkall.classList.remove('hidden')
            uncheckall.classList.add('hidden')
            deleteall.classList.add('hidden')

            checked.classList.add('hidden')
            pd.classList.remove('bg-zinc-200', 'ps-3');
            hide();
            renderOrder();
        })
    }

    const arrChoose = (checkprod) => {
        var arr = [];
        Array.from(checkprod).map(c => {
            const choose = c.dataset.idcart
            c.classList.contains('hidden')
                ? arr.filter(a => a !== choose)
                : arr.push(choose)
        })
        return arr
    }

    deleteall.addEventListener('click', () => {
        const newData = data.find(dt => dt.username == user);
        const cartUser = newData.cart;
        const deleteArr = arrChoose(checkprod)
        deleteArr.map(d => {
            for (let index = 0; index < cartUser.length; index++) {
                if (cartUser[index].id == d) {
                    cartUser.splice(cartUser[index], 1);
                }
            }
        })
        newData.cart = cartUser;
        updateData(newData.id, newData, 'users')
    })
}

export const updateOrder = (arrId) => {

}