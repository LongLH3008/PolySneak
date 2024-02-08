import sideNav from "../admin/sideNav"

import { sendRequest, getData, deleteData, updateData, createData } from '../admin/handleCRUD';

const dataProducts = await getData('products');

const ProductsAdminPage = () =>`
<section class="w-full h-screen bg-zinc-100 overflow-hidden flex justify-between items-start">
${sideNav()}
<div class="w-5/6 h-full flex justify-center items-center p-10 text-zinc-600">
    <ul class="w-full h-3/4 shadow-md rounded-sm flex flex-col gap-y-1">
        <ul class="flex columns-8 gap-1">
            <li class="w-1/12 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">#</li>
            <li class="w-2/3 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">Name</li>
            <li class="w-1/3 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">Price</li>
            <li class="w-full border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold col-span-3">Color / Size / Images</li>
            <li class="w-2/3  border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">Description</li>
            <a href="/admin/addProduct" class="w-1/3 h-full items-center flex justify-center bg-gradient-to-bl from-orange-500 to-amber-400 hover:bg-gradient-to-tr text-2xl rounded-md text-white">
                <i class="fa-regular fa-square-plus"></i> 
            </a>
        </ul>
        <div class="overscrollHidden overflow-y-scroll scroll-smooth flex flex-col gap-y-1">
            ${dataProducts.map(pd => `
            <ul class="flex columns-7 gap-1">
                <li class="w-1/12 border border-zinc-300 text-center flex items-start justify-center p-3 font-semibold">${pd.id}</li>
                <li class="w-2/3 border border-zinc-300 text-center flex items-start justify-start p-3">${pd.name}</li>
                <li class="w-1/3 border border-zinc-300 text-center flex flex-col items-start justify-start p-3">
                    ${pd.discount > 0 
                        ? `
                        <p class="text-orange-500 font-semibold">Discount ${pd.discount} %</p>
                        <p class="text-orange-500 line-through">${pd.cost.toLocaleString('en-US')} đ</p>
                        ${((100 - pd.discount)*pd.cost/100).toLocaleString('en-US')} đ
                        ` 
                        : `<p class="">${pd.cost.toLocaleString('en-US')} đ</p>`
                    }
                </li>
                <li class="w-full border border-zinc-300 text-center flex flex-col p-3">
                    ${pd.attribute.map(e =>`
                        <div class="flex justify-between items-start border-b mb-2">
                            <div class="flex flex-col items-start gap-2">
                                <p class="font-semibold">${e.color}</p>
                                <p class="flex flex-wrap gap-1">
                                    ${e.sizes.map(s =>`
                                        <span class="p-1 border border-zinc-400">${s}</span>
                                    `).join('')}
                                </p>
                            </div>
                            <div class="w-1/4 h-4/5 flex items-center overflow-hidden">
                                <img class="w-full rounded-md" src="${e.img}" alt="${e.name}">
                            </div>
                        </div>
                    `).join('')}
                </li>
                <li class="w-2/3 border border-zinc-300 flex items-start justify-center text-justify p-3">${pd.description}</li>
                <li class="w-1/3 border border-zinc-300 text-center flex py-3 items-start justify-evenly">
                    <button class="button p-2 px-3 bg-gradient-to-tr from-zinc-600 to-gray-400 hover:bg-gradient-to-bl hover:-translate-y-1 active:translate-y-1 text-white rounded-md"><i class="fa-solid fa-pen"></i></button>
                    <button class="button p-2 px-3 bg-gradient-to-tr from-red-600 to-red-400 hover:bg-gradient-to-bl hover:-translate-y-1 active:translate-y-1 text-white rounded-md"><i class="fa-regular fa-trash-can"></i></button>
                </li>
            </ul>
            `).join('')}
        </div>
    </ul>
</div>
</section>
`

export default ProductsAdminPage