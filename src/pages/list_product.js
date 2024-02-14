import HeaderComponent from "../components/header"
import FooterComponent from "../components/footer"
import { getData } from "../admin/handleCRUD";

const products = await getData('products');
const type = await getData('type');
const status = await getData('status');

const ListProductPage = () => {

    const checkStatus = (id) => {
        const result = status.find(st => st.id == id)
        const { name } = result
        return name
    }

    return `
<section class="w-full px-48 font-semibold">
    ${HeaderComponent()}    
</section>
<section class="mt-5 px-48 w-full">
<div class="grid grid-cols-10 gap-4">
    <div class="col-span-2 flex flex-col gap-4 text-zinc-500 font-semibold">
        <ul class="border bg-gradient-to-bl h-fit rounded-md overflow-hidden">
            <li class="p-4"><i class="fa-solid fa-arrow-down-wide-short"></i> Type</li>
            <li class="changeListType border-b text-sm cursor-pointer p-4 py-3 w-full bg-gradient-to-br from-orange-500 to-amber-400 text-white hover:from-orange-500 hover:to-amber-400 hover:text-white">
                <span name="checkedListType" data-type="" class=""><i class="fa-solid fa-check mr-1"></i></span> All
            </li>
            ${type.map(t => `
                <li class="changeListType border-b text-sm cursor-pointer p-4 py-3 w-full bg-gradient-to-br hover:from-orange-500 hover:to-amber-400 hover:text-white">
                    <span name="checkedListType" data-type=${t.id} class="hidden"><i class="fa-solid fa-check mr-1"></i></span> ${t.name}
                </li>
            `).join('')}
        </ul>
        <ul class="border bg-gradient-to-bl h-fit rounded-md overflow-hidden">
            <li class="p-4"><i class="fa-solid fa-tag mr-2"></i> Status</li>
            <li class="changeListStatus border-b text-sm cursor-pointer p-4 py-3 w-full bg-gradient-to-br from-orange-500 to-amber-400 text-white hover:from-orange-500 hover:to-amber-400 hover:text-white">
                <span name="checkedListStatus" data-stt="" class=""><i class="fa-solid fa-check mr-1"></i></span> All
            </li>
        ${status.map(s => `
            <li class="changeListStatus border-b text-sm cursor-pointer p-4 py-3 w-full bg-gradient-to-br hover:from-orange-500 hover:to-amber-400 hover:text-white ${s.name == "None" ? 'hidden' : ''}">
                <span name="checkedListStatus" data-stt="${s.id}" class="hidden"><i class="fa-solid fa-check mr-1"></i></span> ${s.name}
            </li>
        `).join('')}
        </ul>
    </div>
    <div id="renderProds" class="col-span-8 grid grid-cols-3 gap-2 overscrollHidden overflow-y-scroll scroll-smooth">
        ${products.map(pro => `
        <input name="attribute_pro_listprod${pro.id}" type="hidden" value="${pro.attribute[0].id}" />
        <input name="size_pro_listprod${pro.id}" type="hidden" value="${pro.attribute[0].sizes[0]}" />
        <div class="rounded-lg shadow-md border-2 h-fit text-zinc-700 hover:border-orange-300 hover:-translate-y-3 cursor-pointer">
            <div class="h-56 flex items-center py-5 overflow-hidden border-b">
                <a href='/detailproduct/${pro.id}' class="">
                    <img class="w-full" src="${pro.attribute[0].img}" alt="${pro.name}">
                </a>
            </div>
            <ul class="p-3 flex flex-col justify-between gap-y-2 ">
                <li class="">
                    <span class="${checkStatus(pro.statusId) == "None" ? 'text-transparent' : 'text-orange-500'} font-semibold">
                    ${checkStatus(pro.statusId)}
                    </span>
                    <p class="font-bold">${pro.name}</p>
                </li>
                <li class="flex justify-between items-end mt-3">
                    <p class="">
                        <span class="cost ${pro.discount > 0 ? 'line-through text-orange-400' : 'text-transparent'}">${pro.discount > 0 ? pro.cost.toLocaleString('en-US') + ' đ' : '0.000.000'}</span><br>  
                        <span class="">
                            ${pro.discount > 0 ? ((100 - pro.discount) * pro.cost / 100).toLocaleString('en-US') + ' đ' : pro.cost.toLocaleString('en-US') + ' đ'}</span>
                    </p>
                    <button id="listprod_add_to_cart${pro.id}"
                        class="p-2 px-3 rounded-md bg-gradient-to-br hover:from-orange-500 from-zinc-600 to-gray-400 hover:to-amber-300 text-white active:translate-y-1">
                        <i class="fa-solid fa-cart-arrow-down"></i>
                    </button>
                </li>
            </ul>
        </div>
        `).join('')}
    </div>
</div>
</section>
${FooterComponent()}
`
}
export default ListProductPage