import FooterComponent from "../components/footer"
import HeaderComponent from "../components/header"
import { products } from '../../db.json' assert { type: 'json'};
import { status } from '../../db.json' assert { type: 'json'}
import { type } from '../../db.json' assert { type: 'json'}

const DetailProductPage = (id) => {
    const prod = products.find((product) => product.id == id);
    const { attribute } = prod;
    const presentAttribute = Array.from(attribute).find(a => a.id === 1);
    const presentStatus = status.find((s) => s.id == prod.statusId);
    const presentType = type.find((t) => t.id == prod.typeId);
    const calcCost = prod.discount > 0 ? (100 - prod.discount)*prod.cost/100 : prod.cost;
    const presentColor = presentAttribute.color
    console.log(presentStatus);

return `
<section class="w-full px-48 font-semibold">
    ${HeaderComponent()}    
</section>

<section class="mt-20 px-48 w-full">
<div class="flex flex-between items-start gap-x-20 h-fit overflow-hidden">
    <div class="carousel w-5/12 overflow-hidden flex items-center">
        <img id="imgProduct" width="" src="${prod.img}" alt="">
    </div>
    <div class="detailproduct w-7/12 flex flex-col justify-start items-start text-zinc-600">
        <div class="flex justify-between w-full">
            <h1 class="text-3xl text-zinc-600 font-semibold">
                ${prod.name}
            </h1>
            ${presentStatus.name !== "none" ? `
                <p class="p-2 px-3 bg-gradient-to-br from-orange-500 to-amber-300 text-white font-semibold">
                    ${presentStatus.name}
                </p>` : ''
            }
        </div>
        <span class="text-1xl">${presentType.name}</span>
        <p class="price text-lg">
            <span class="discount line-through text-orange-400 ${prod.discount > 0 ? 'mr-3' : ''}">
                ${prod.discount > 0 ? prod.cost : ''}
            </span>
            <span class="cost font-semibold">${calcCost.toLocaleString('en-US')} đ</span>
        </p>
        <div class="mt-5">
            <label for="colorValue" class="text-lg font-semibold">Color</label><br>
            <input type="radio" id="colorValue" class="hidden" value="${presentAttribute.color}">
            ${Array.from(attribute).map(a => `
                <button data-img="${a.img}" data-color="${a.id}" class="chooseColor p-2 px-3 mt-1 rounded-sm border font-semibold ${presentColor === a.color ? 'border-orange-500' : ''}">
                    ${a.color}
                </button>
            `).join('')}
        </div>
        <div class="mt-5">
            <label for="sizeValue" class="text-lg font-semibold">Size</label><br>
            <input type="radio" id="sizeValue" class="hidden"
            value="${Array.from(presentAttribute.sizes).map(size => size === presentAttribute.sizes[0])}">
            ${Array.from(presentAttribute.sizes).map(size => `
                <button class="chooseSize p-2 px-3 rounded-sm border font-semibold ${size === presentAttribute.sizes[0] ? 'border-orange-500' : ''}">${size}</button>
            `).join('')}
        </div>
        <div class="mt-5 flex justify-between items-center font-semibold">
            <button id="minus" class="p-2 px-3 border active:translate-y-1 active:border-orange-500 active:text-orang-500"> - </button>
            <input id="amount" class="outline-none text-center border p-2 px-3"  type="number" value="1" readonly>
            <button id="plus" class="p-2 px-3 border active:translate-y-1 active:border-orange-500 active:text-orange-500"> + </button>
        </div>
        <div class="mt-5 flex justify-between items-center gap-x-2 font-semibold">
            <button class="p-3 px-4 text-white bg-orange-500 active:*:translate-y-1"><i class="fa-regular fa-heart"></i></button>
            <button class="p-3 px-4 bg-zinc-500 text-white active:translate-y-1 hover:bg-zinc-600">
                <i class="fa-solid fa-cart-arrow-down"></i> Add to Cart
            </button>
        </div>
        <div class="mt-20 overflow-y-scroll h-96 w-full">
            <ul>
                <li class="text-justify">${prod.description}</li>
            </ul>
        </div>
    </div>
</div>
</section>
${FooterComponent()}
`
}
export default DetailProductPage