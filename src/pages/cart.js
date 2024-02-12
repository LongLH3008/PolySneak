import { getData } from "../admin/handleCRUD"
import FooterComponent from "../components/footer"
import HeaderComponent from "../components/header"
import { user, data, products } from "../../utils"

const CartPage = () => {
    const cartUser = data.find(dt => dt.username == user).cart;
    const name = (id) => products.find(dt => dt.id == id).name
    const discount = (id) => products.find(dt => dt.id == id).discount;
    const cost = (id) => products.find(dt => dt.id == id).cost;

    const calcDiscount = (id) => {
        const result = products.find(dt => dt.id == id);
        return ((100 - result.discount) * result.cost / 100);
    }

    const color = (id, att) => {
        const result = products.find(dt => dt.id == id);
        const result2 = result.attribute.find(rs => rs.id == att);
        return result2.color;
    }

    const img = (id, att) => {
        const result = products.find(dt => dt.id == id);
        const result2 = result.attribute.find(rs => rs.id == att);
        return result2.img
    }

    const calcCost = (id, amount) => {
        const result = products.find(dt => dt.id == id);
        const calc = result.discount > 0 ? ((100 - result.discount) * result.cost / 100) * amount : result.cost * amount
        return calc;
    }

    const calcTotal = (cartUser) => {
        let calc, total = 0
        cartUser.forEach(c => {
            let getid = c.idpro;
            let getdiscount = discount(getid)
            calc = getdiscount > 0 ? calcDiscount(getid) : cost(getid);
            total += calc
        });
        return total
    }

    return `
<section class="w-full px-48 font-semibold">
${HeaderComponent()}
</section>
<section class="mt-10 px-48">
<form id="cart_and_order" action="" class="w-full flex justify-between items-start gap-5 text-zinc-600 min-h-96">
    <div id="left_cart" class="w-8/12">
        <div class="flex justify-between mb-2 items-center">
            <h1 class="text-3xl font-semibold text-orange-400"><i class="fa-solid fa-cart-shopping"></i> Cart</h1>
            <div>
                <span name="checkall" class="cursor-pointer p-3 py-2 bg-gradient-to-tr hover:bg-gradient-to-bl from-zinc-700 to-gray-500 text-white "><i class="fa-solid fa-check"></i> Check All</span>
                <span name="uncheckall" class="hidden cursor-pointer p-3 py-2 bg-gradient-to-tr hover:bg-gradient-to-bl from-zinc-700 to-gray-500 text-white "><i class="fa-solid fa-mark"></i> Uncheck All</span>
                <span name="deleteall" class="hidden cursor-pointer p-3 py-2 bg-gradient-to-tr hover:bg-gradient-to-bl from-red-600 to-rose-400 text-white "><i class="fa-solid fa-xmark"></i> Remove All</span>
            </div>
        </div>
        <ul id="cart_info" class="pt-5 overscrollHidden overflow-y-scroll pr-5 border-r-2">
            ${cartUser.length > 0
            ? `
            ${cartUser.map(c => `
            <li class="products_in_cart relative mb-1 cursor-pointer pt-3 pb-3 pr-3 flex justify-start gap-5 items-center border-b border-dashed">
                <span data-idcart=${c.id} class="checkprod hidden"><i class="fa-solid fa-check"></i></span>
                <div class="w-2/12 h-28 flex items-center overflow-hidden rounded-md">
                    <a href='/detailproduct/${c.idpro}'>
                        <img src="${img(c.idpro, c.attribute)}" class="w-full" alt="${name(c.idpro)}">
                    </a>
                </div>
                <div class="w-4/12 flex flex-col">
                    <h3 class="font-bold">${name(c.idpro)}</h3>
                    <span>${discount(c.idpro) > 0 ? calcDiscount(c.idpro).toLocaleString('en-US') + ' đ' : cost(c.idpro).toLocaleString('en-US') + ' đ'}</span>
                    <span class="text-sm">Color: ${color(c.idpro, c.attribute)}</span>
                    <span class="text-sm">Size: ${c.size}</span>
                </div>
                <div class="w-3/12 flex flex-col text-orange-500">
                    <h3 class="font-bold">${discount(c.idpro) > 0 ? 'Discount ' + discount(c.idpro) + ' %' : ''}</h3>
                    <span class="line-through">${discount(c.idpro) > 0 ? cost(c.idpro).toLocaleString('en-US') + ' đ' : ''}</span>
                </div>
                <div class="w-3/12 h-3/12 flex items-center justify-center gap-2">
                    <input name="" type="hideen" class="hidden">
                    <input name="change_amount${c.id}" type="number" class="changeAmount text-center text-zinc-600 text-xl border w-4/12 p-2 ps-5 outline-none active:border-orange-500" value="${c.amount > 5 ? 5 : c.amount}" min="1" max="5">
                    <span name="remove_prod${c.id}" class="removeProd p-2 cursor-pointer text-white bg-gradient-to-br hover:bg-gradient-to-tl from-red-500 to-rose-400"><i class="fa-solid fa-xmark"></i></span>
                </div>
            </li>
            `).join('')}
            `
            : `
            <li class="p-3 ps-0 flex justify-center gap-5 items-center border border-dashed text-center border-zinc-300">
                Your Cart is empty <i class="fa-regular fa-face-sad-tear"></i>
            </li>
            `
        }
        </ul>
    </div>
    <div id="right_cart" class="w-4/12">
        <h1 class="flex justify-between items-center">
        <span class="text-2xl font-semibold"><i class="fa-solid fa-box"></i> Order</span>
        <span class="p-4 py-2 bg-gradient-to-tr from-zinc-600 to-gray-500 rounded-md text-white"><i class="fa-solid fa-bag-shopping"></i> ${cartUser.reduce((total, { amount }) => Number(amount) + total, 0)}</span>
    </h1>
    <ul id="order_info" class="mt-5 p-3 text-zinc-400 overflow-y-scroll overscrollHidden border border-dashed border-zinc-300"></ul>
    </div>
</form>
</section>
${FooterComponent()}
`
}

export default CartPage