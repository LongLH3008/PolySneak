const HeaderComponent = () => `
<nav class="flex justify-between items-center border-b py-4 text-zinc-600">
    <img width="60px" src="./assets/img/logo.png" alt="">
    <ul class="flex justify-between items-center gap-3">
        <li class="">
            <a class="p-3 px-6 rounded-md hover:text-white hover:bg-gradient-to-br from-orange-400 to-amber-400 hover:transition-all cursor-pointer"
                href="/">Home</a>
        </li>
        <li class="">
            <a class="p-3 px-6 rounded-md hover:text-white hover:bg-gradient-to-br from-orange-400 to-amber-400 hover:transition-all cursor-pointer"
                href="/product">Product</a>
        </li>
        <li class="">
            <a class="p-3 px-6 rounded-md hover:text-white hover:bg-gradient-to-br from-orange-400 to-amber-400 hover:transition-all cursor-pointer"
                href="/contact">Contact</a>
        </li>
        <li class="">
            <a class="p-3 px-6 rounded-md hover:text-white hover:bg-gradient-to-br from-orange-400 to-amber-400 hover:transition-all cursor-pointer"
                href="/">Help</a>
        </li>
    </ul>
    <ul class="flex justify-between items-center text-1xl">
        <li class="mr-5 cursor-pointer p-2 px-3 rounded-md hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white">
            <i class="fa-solid fa-magnifying-glass"></i>
        </li>
        <li><a href="/signin" class="p-2 px-3 rounded-md hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white"><i class="fa-solid fa-key"></i></a></li>
    </ul>
</nav>
`

export default HeaderComponent