import BannerComponent from "../components/banner"
import FooterComponent from "../components/footer"
import { products } from '../../db.json' assert { type: "json"}

const newProducts = products.filter(pd => pd.statusId == 3);

const HomePage = () => `
    ${BannerComponent()}
    <section class="mt-20 px-48 w-full">
        <div class="flex justify-center mb-20">
            <h1 class="text-3xl font-semibold text-zinc-600">OUR NEWS</h1>
        </div>
        <div class="flex justify-between items-center gap-0 flex-wrap">
            ${newProducts.map(pro => `
                <div class="w-72 rounded-md shadow-md border-2 text-zinc-700 hover:border-orange-300 hover:-translate-y-3 cursor-pointer">
                    <div class="w-full overflow-hidden p-3 border-b">
                        <a href='/detailproduct/${pro.id}'>
                            <img class="w-full rounded-md" src="${pro.img}" alt="${pro.name}">
                        </a>
                    </div>
                    <ul class="p-3">
                        <li class="">
                            <span class="text-orange-500 font-semibold">New</span>
                            <p class="font-bold">${pro.name}</p>
                        </li>
                        <li class="flex justify-between items-end mt-3">
                            <p>
                                <span class="cost ${pro.discount > 0 ? 'line-through text-orange-400' : ''}">${pro.cost.toLocaleString('en-US')} đ</span><br>  
                                <span class="">${pro.discount > 0 ? ((100 - pro.discount) * pro.cost / 100).toLocaleString('en-US') + ' đ' : ''}</span>
                            </p>
                            <button
                                class="p-2 px-3 rounded-md bg-gradient-to-br hover:from-orange-500 from-zinc-600 to-gray-400 hover:to-amber-300 text-white active:translate-y-1">Order</button>
                        </li>
                    </ul>
                </div>
            `).join('')}
        </div>
    </section>
    ${FooterComponent()}
`

export default HomePage