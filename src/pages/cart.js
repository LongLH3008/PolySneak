import { getData } from "../admin/handleCRUD"
import FooterComponent from "../components/footer"
import HeaderComponent from "../components/header"

const data = await getData('users')
const products = await getData('products');

const CartPage = () => {
    const check = JSON.parse(localStorage.getItem('user'));
    const cartUser = data.find(dt => dt.username == check.username).cart;
    console.log(cartUser);
    const name = (id) => products.find(dt => dt.id == id).name
    const discount = (id) => products.find(dt => dt.id == id).discount;
    const cost = (id) => products.find(dt => dt.id == id).cost;
    const calcDiscount = (id) => {
        const result = products.find(dt => dt.id == id);
        return ((100 - result.discount)*result.cost / 100);
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
        const calc = result.discount > 0 ? ((100 - result.discount)*result.cost / 100)*amount : result.cost*amount
        return calc;
    }
    
    const calcTotal = () => {
        let calc , total = 0
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
<form id="cart_and_order" action="" class="w-full flex justify-between items-start gap-5 text-zinc-600">
    <div id="left_cart" class="w-8/12">
        <h1 class="text-3xl font-semibold text-orange-400"><i class="fa-solid fa-cart-shopping"></i> Cart</h1>
        <ul id="cart_info" class="mt-10 overscrollHidden overflow-y-scroll pr-5 border-r-2 py-5">
            ${cartUser.map(c => `
                <li class="p-3 ps-0 flex justify-start gap-5 items-center border-b border-dashed border-zinc-300">
                    <div class="w-2/12 h-28 flex items-center overflow-hidden rounded-md">
                        <a href='/detailproduct/${c.idpro}'>
                            <img src="${img(c.idpro, c.attribute)}" class="w-full" alt="${name(c.idpro)}">
                        </a>
                    </div>
                    <div class="w-4/12 flex flex-col">
                        <h3 class="font-bold">${name(c.idpro)}</h3>
                        <span>${discount(c.idpro) > 0 ? calcDiscount(c.idpro).toLocaleString('en-US') + ' đ' : cost(c.idpro).toLocaleString('en-US') + ' đ'}</span>
                        <span class="text-sm">Color: ${color(c.id,c.attribute)}</span>
                        <span class="text-sm">Size: ${c.size}</span>
                    </div>
                    <div class="w-3/12 flex flex-col text-orange-500">
                        <h3 class="font-bold">${discount(c.idpro) > 0 ? 'Discount ' + discount(c.idpro) + ' %' : ''}</h3>
                        <span class="line-through">${discount(c.idpro) > 0 ? cost(c.idpro).toLocaleString('en-US') + ' đ' : ''}</span>
                    </div>
                    <div class="w-3/12 h-3/12 flex items-center justify-center gap-2">
                        <input type="number" class="text-center text-xl border w-4/12 p-2 ps-5 outline-none active:border-orange-500" value="${c.amount}" min="1" max="5">
                        <span class="p-2  text-white bg-gradient-to-br hover:bg-gradient-to-tl from-red-500 to-rose-400"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                </li>
            `).join('')}
            </ul>
    </div>
    <div id="right_cart" class="w-4/12">
        <h1 class="flex justify-between items-center">
            <span class="text-2xl font-semibold">Order</span>
            <span class="p-4 py-2 bg-gradient-to-tr from-zinc-600 to-gray-500 rounded-md text-white text-sm">Amount : ${cartUser.length}</span>
        </h1>
        <ul id="order_info" class="mt-5 p-3 text-gray-400 overflow-y-scroll overscrollHidden border border-dashed border-zinc-300">
            ${cartUser.map(c => `
            <li class="flex justify-between items-start mb-5">
                <div class="flex flex-col">
                    <p>${name(c.idpro)}</p>
                    <span>${cost(c.idpro).toLocaleString('en-US') + ' đ'}</span>
                </div>
                <div class="flex flex-col items-end">
                    <p>${'x ' + c.amount}</p>
                    <span>${calcCost(c.idpro, c.amount).toLocaleString('en-US') + ' đ'}</span>
                </div>
            </li>
            `).join('')}
        </ul>
        <button type="submit" class="mt-5 font-semibold flex justify-between items-center text-white w-full p-5 bg-gradient-to-br from-amber-400 to-orange-500 hover:bg-gradient-to-tl border-0">
            <span><i class="fa-solid fa-cash-register"></i> Total</span>
            <span>${calcTotal().toLocaleString('en-US') + ' đ'}</span>
        </button>
    </div>
</form>
</section>
${FooterComponent()}
`
}

export default CartPage