import HeaderComponent from "../components/header"
import FooterComponent from "../components/footer"
import { products } from '../../db.json' assert { type: "json"}
import { status } from '../../db.json' assert { type: "json"}

const ListProductPage = () => {
    const checkStatus = (id) => {
        const result = status.find(st => st.id == id)
        const { name } = result
        console.log(name);
        return name
    }
    return `
<section class="w-full px-48 font-semibold">
    ${HeaderComponent()}    
</section>

<section class="mt-20 px-48 w-full">
<div class="flex justify-between items-center gap-y-4 flex-wrap">
    ${products.map(pro => `
        <div class="w-72 rounded-lg shadow-md border-2 text-zinc-700 hover:border-orange-300 hover:-translate-y-3 cursor-pointer">
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
                    <button
                        class="p-2 px-3 rounded-md bg-gradient-to-br hover:from-orange-500 from-zinc-600 to-gray-400 hover:to-amber-300 text-white active:translate-y-1">
                        <i class="fa-solid fa-cart-arrow-down"></i>
                        </button>
                </li>
            </ul>
        </div>
    `).join('')}
</div>
</section>
${FooterComponent()}
`
}
export default ListProductPage