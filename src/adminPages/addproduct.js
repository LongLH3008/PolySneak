import { products, status, type } from "../../utils"
import sideNav from "../admin/sideNav"

const addProduct = () => {
    const sizes = [36,37,38,39,40,41,42,43];
    return `
<section class="w-full h-screen bg-zinc-100 overflow-hidden flex justify-between items-start">
${sideNav()}
<div class="w-5/6 h-full flex justify-center items-center p-10 text-zinc-600">
    <form id="addprod" class="grid grid-cols-8 w-full border h-full p-10 gap-5 bg-white rounded-md overflow-hidden">
        <div class="col-span-4 w-full flex flex-col">
            <input required name="nameProd" class="mb-10 text-2xl outline-none border border-s-4 border-zinc-300 border-s-orange-500 focus:text-orange-500 focus:border-orange-500 p-2 px-4" type="text" value="" required>
            <div class="flex gap-3 items-center">
                <div class="flex flex-col w-1/3">
                    <label class="text-md"><i class="fa-solid fa-list mr-1"></i> Type</label>
                    <select required name="typeProd" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4">
                        ${type.map(pd => `
                            <option value="${pd.id}">${pd.name}</option>
                        `)}
                    </select>
                </div>
                <div class="flex flex-col w-1/3">
                    <label class="text-md"><i class="fa-solid fa-tag mr-1"></i> Status</label>
                    <select required name="sttProd" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4">
                    ${status.map(pd => `
                        <option value="${pd.id}">${pd.name}</option>`
                    )}
                    </select>
                </div>
            </div>
            <div class="mt-5 flex gap-3 items-center">
                <div class="flex flex-col w-1/3">
                    <label class="text-md"><i class="fa-solid fa-sack-dollar mr-1"></i> Price</label>
                    <input required name="priceProd" type="number" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4" value="">
                </div>
                <div class="flex flex-col w-1/3">
                    <label class="text-md"><i class="fa-solid fa-percent mr-1"></i> Discount</label>
                    <div class="flex w-full gap-2">
                        <input name="discProd" type="number" min="0" max="100" class="w-1/4 outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 pr-0 ps-2 text-center" value="">
                        <input name="calcDiscProd" type="text" readonly value="No discount" class="w-3/4 outline-none border border-zinc-300 p-2 px-4 text-end"></input>
                    </div>
                </div>

            </div>
            <label class="text-md mt-10 mb-1"><i class="fa-solid fa-quote-right mr-1"></i> Description</label>
            <textarea required name="descProd" cols="30" rows="10" class="resize-none h-full self-end w-full border border-dashed border-zinc-300 outline-none focus:border-orange-500 p-2 px-4"></textarea>
        </div>
        <div class="col-span-4 flex flex-col overflow-hidden">
            <div class="flex gap-1 justify-end mb-10">
                <button name="reset" class="p-3 px-4 border-0 active:translate-y-1 text-white bg-gradient-to-tr hover:bg-gradient-to-bl from-zinc-600 to-gray-500" type="reset"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                <button class="p-3 px-4 border-0 active:translate-y-1 text-white bg-gradient-to-tr hover:bg-gradient-to-bl from-orange-600 to-amber-500" type="submit"><i class="fa-solid fa-check"></i></button>
            </div>
            <ul id="colorsProds" class="h-5/6 overscrollHidden overflow-hidden overflow-y-scroll scroll-smooth flex flex-col gap-y-5 relative">
                    <li name="attElement1" class="attributeProds flex justify-between items-start mb-2 gap-5 border-s ps-4 hover:border-orange-500 relative">
                        <span name="removeAtt1" class="p-2 border active:translate-y-1 active:border-orange-500 hover:border-orange-500 cursor-pointer"><i class="fa-solid fa-trash"></i></span>
                        <div class="w-2/3 grid grid-rows-5">
                            <div class="row-span-2">
                                <input required name="colorAtt1" value="" type="text" class="w-full outline-none border border-zinc-300 focus:text-orange-500 focus:border-orange-500 p-2 px-4">
                            </div>
                            <div class="mt-2 row-span-3 grid grid-cols-5 gap-5">
                                ${sizes.map(s => `
                                    <span name="sizeAtt1" class="sizeProds text-center cursor-pointer p-2 w-5/6 border hover:border-orange-500 rounded-sm font-semibold">${s}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="w-1/3 overflow-hidden h-48 flex items-center relative border border-zinc-500 hover:border-orange-400">
                            <input required name="inputFile1" class="opacity-0" type="file">
                            <span name="changeImgAtt1" class="absolute right-0 top-0 flex items-center justify-center bg-opacity-0 bg-zinc-600 text-transparent w-full h-full cursor-pointer hover:text-orange-600 hover:bg-opacity-20 text-3xl"><i class="fa-regular fa-image"></i></span>
                            <img name="previewImg1" class="w-full" src="">
                        </div>
                    </li>
                <span name="addAtt" class="z-20 w-full order-last p-3 border text-center cursor-pointer text-zinc-500 hover:border-orange-500 hover:text-orange-500">Add more ...</span>
            </ul>
        </div>
    </form>
</div>
</section>
`
}

export default addProduct