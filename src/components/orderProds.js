import { products } from "../../utils";

const OrderProds = (dataprods) => {
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

    const calcCost = (id, amount) => {
        const result = products.find(dt => dt.id == id);
        const calc = result.discount > 0 ? ((100 - result.discount) * result.cost / 100) * amount : result.cost * amount
        return calc;
    }

    const calcTotal = (dataprods) => {
        let calc, total = 0
        dataprods.forEach(c => {
            let getid = c.idpro;
            let getdiscount = discount(getid)
            calc = getdiscount > 0 ? calcDiscount(getid) : cost(getid);
            total += calc
        });
        return total
    }

    return `
<h1 class="flex justify-between items-center">
    <span class="text-2xl font-semibold"><i class="fa-solid fa-box"></i> Order</span>
    <span class="p-4 py-2 bg-gradient-to-tr from-zinc-600 to-gray-500 rounded-md text-white"><i class="fa-solid fa-bag-shopping"></i> ${dataprods.reduce((total, { amount }) => Number(amount) + total, 0)}</span>
</h1>
<ul id="order_info" class="mt-5 p-3 text-zinc-400 overflow-y-scroll overscrollHidden border border-dashed border-zinc-300">
    ${dataprods.map(prod => `
    <li class="flex justify-between items-end py-2 border-b border-dashed">
        <div class="flex flex-col">
            <p>${name(prod.idpro)}<br>
            <span class="text-sm">${color(prod.idpro, prod.attribute) + ' - ' + prod.size}</span>
            </p>
            <span class="line-through text-orange-400">${discount(prod.idpro) > 0 ? cost(prod.idpro).toLocaleString('en-US') + ' đ' : ''}</span>
            <span class="font-semibold">${discount(prod.idpro) > 0 ? calcDiscount(prod.idpro).toLocaleString('en-US') + ' đ' : cost(prod.idpro).toLocaleString('en-US')}</span>
        </div>
        <div class="flex flex-col items-end">
            <p>${prod.amount > 5 ? 'x ' + 5 : 'x ' + prod.amount}</p>
            <span class="text-orange-400">${discount(prod.idpro) > 0 ? '- ' + discount(prod.idpro) + ' %' : ''}</span>
            <span class="font-semibold">${calcCost(prod.idpro, prod.amount).toLocaleString('en-US') + ' đ'}</span>
        </div>
    </li>
    `).join('')}
</ul>
<button type="submit" class="cursor-pointer mt-5 font-semibold flex justify-between items-center text-white w-full p-5 bg-gradient-to-br from-amber-400 to-orange-500 hover:bg-gradient-to-tl border-0">
    <span><i class="fa-solid fa-cash-register"></i> Pay</span>
    <span>${'Total ' + calcTotal(dataprods).toLocaleString('en-US') + ' đ'}</span>
</button>
`
}

export default OrderProds