import logo from '../../assets/img/logo.png';

const sideNav = () => {
    return `
<div class="w-1/6 bg-gradient-to-bl from-zinc-700 to-gray-500 h-full">
<ul class="flex flex-col h-full w-full font-semibold">
    <li class="">
        <a href="/admin" class="p-10 flex justify-start items-center gap-x-3 mb-20">
            <img class="w-1/4" src="${logo}" alt="">
            <h1 class="text-white text-2xl">PolySneak</h1>
        </a>
    </li>
    <li class="p-10 py-5 text-zinc-50 w-full hover:*:translate-x-2 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400"><a class="" href="/admin/products"><i class="w-1/6 fa-solid fa-cube"></i> Products</a></li>
    <li class="p-10 py-5 text-zinc-50 w-full hover:*:translate-x-2 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400"><a class="" href="/admin/categories"><i class="w-1/6 fa-solid fa-layer-group"></i> Categories</a></li>
    <li class="p-10 py-5 text-zinc-50 w-full hover:*:translate-x-2 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400"><a class="" href="/admin/users"><i class="w-1/6 fa-solid fa-users"></i> Users</a></li>
    <li class="p-10 py-5 text-zinc-50 w-full hover:*:translate-x-2 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400"><a class="" href="/admin/order"><i class="w-1/6 fa-solid fa-box"></i> Order</a></li>
    <li class="p-10 py-5 text-zinc-50 w-full hover:*:translate-x-2 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400"><a class="" href="/admin/bill"><i class="w-1/6 fa-solid fa-clipboard-list"></i> Bill</a></li>
</ul>
</div>
`
}
export default sideNav