

const HeaderComponent = () => {

    return `
<nav class="flex justify-between items-center border-b py-4 text-zinc-600 relative">
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
    <ul id="" class="flex justify-between items-center text-1xl">
        <li id="openSearchbox" class="mr-5 cursor-pointer p-2 px-3 rounded-md hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white">
            <i class="fa-solid fa-magnifying-glass"></i>
        </li>
        <li id="userStatus" class="relative">
            <a href="/signin" class="p-2 px-3 rounded-md hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white"><i class="fa-solid fa-key"></i></a>
        </li>
    </ul>
    <div id="searchbox"class="hidden flex flex-col items-center p-10 top-full left-0 absolute w-full h-96 bg-zinc-50 bg-opacity-90 z-50">
        <div class="mb-10 flex justify-center items-center gap-x-5 w-1/2">
            <label class="">Search</label>
            <input name="inputsearchbox" type="search" class="w-2/3 p-3 py-1 bg-transparent border-b border-zinc-500 border-dashed outline-none focus:text-orange-500 focus:border-orange-500">
        </div>
        <span name="closeSearchbox" class="absolute -top-1 p-2 right-0 cursor-pointer hover:text-orange-500 font-semibold text-xl"><i class="fa-solid fa-xmark"></i></span>
        <ul id="resultSearch" class="h-full gap-5 w-5/12 flex flex-col items-start overflow-y-scroll overscrollHidden">
        </ul>    
    </div>
</nav>
`
}
export default HeaderComponent