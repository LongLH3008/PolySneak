import { products } from "../../utils"
import { getData } from "../admin/handleCRUD";

const type = await getData('type');
const status = await getData('status');

const ListProds = (type = "", stt = "") => {
    let listProds = [];
    // console.log(type);
    // console.log(stt);
    const checkStatus = (id) => {
        const result = status.find(st => st.id == id)
        const { name } = result
        return name
    }

    if (type !== "" && stt !== "") {
        let filter = products.filter(pd => pd.typeId == type);
        listProds = filter.filter(pd => pd.statusId == stt);
    } else {
        if (type !== "") {
            listProds = products.filter(pd => pd.typeId == type);
        } else if (stt !== "") {
            listProds = products.filter(pd => pd.statusId == stt);
        } else {
            listProds = products
        }
    }
    return `
${listProds.length > 0
    ? `
    ${listProds.map(pro => `
        <input name="attribute_pro_listprod${pro.id}" type="hidden" value="${pro.attribute[0].id}" />
        <input name="size_pro_listprod${pro.id}" type="hidden" value="${pro.attribute[0].sizes[0]}" />
        <div class="h-fit rounded-lg shadow-md border-2 text-zinc-700 hover:border-orange-300 hover:-translate-y-3 cursor-pointer">
            <div class="h-56 flex items-center py-5 overflow-hidden border-b">
            <a href='/detailproduct/${pro.id}' class="">
                <img class="w-full" src="${pro.img}" alt="${pro.name}">
            </a>
            </div>
            <ul class="p-3 flex flex-col justify-between gap-y-2 ">
                <li class="">
                    <span class="${checkStatus(pro.statusId) == "none" ? 'text-transparent' : 'text-orange-500'} font-semibold">
                    ${checkStatus(pro.statusId)}
                    </span>
                    <p class="font-bold">${pro.name}</p>
                </li>
                <li class="flex justify-between items-end mt-3">
                    <p>
                        <span class="cost ${pro.discount > 0 ? 'line-through text-orange-400' : ''}">${pro.cost.toLocaleString('en-US')} đ</span><br>  
                        <span class="${pro.discount > 0 ? '' : 'text-transparent'}">
                            ${pro.discount > 0 ? ((100 - pro.discount) * pro.cost / 100).toLocaleString('en-US') + ' đ' : ''}</span>
                    </p>
                    <button id="listprod_add_to_cart${pro.id}"
                    class="p-2 px-3 rounded-md bg-gradient-to-br hover:from-orange-500 from-zinc-600 to-gray-400 hover:to-amber-300 text-white active:translate-y-1">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    </button>
                </li>
            </ul>
        </div>
    `).join('')}
    `
    : `
    <div class="col-span-8 h-full flex justify-center items-center border border-dashed border-zinc-300 text-zinc-500 rounded-md">
        No data founded <i class="fa-regular fa-face-sad-tear ms-1"></i>
    </div>
    `
}
`
}

export default ListProds