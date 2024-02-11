import { sendRequest, getData, deleteData, updateData, createData } from '../admin/handleCRUD.js';
import { user, data, router, products } from "../../utils"
import { v4 as uuidv4 } from 'uuid';

const AddToCart = (id, size, att = 1, amt = 1) => {
    if (user) {
        const newData = data.find(dt => dt.username == user);
        let cartUser = data.find(dt => dt.username === user).cart;
        let checkSize = cartUser.filter(c => c.size == size);
        let checkAtt = cartUser.filter(c => c.attribute == att);

        if (checkAtt.length > 0 && checkSize.length > 0) {
            console.log(att);
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

        setTimeout(() => {
            alert('Added');
        }, 500)
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
        // const att = document.querySelector(`input[name="attribute_pro_home${id}"`)
        if (add && size) {
            add.addEventListener('click', (e) => {
                // console.log(att.value);
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
            console.log(size.value);
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
        // console.log(Number(size));
        AddToCart(idpro, size, att, amount)  
    })
}