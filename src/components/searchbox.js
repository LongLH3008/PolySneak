const SearchBox = () => {
    return `
<form id="searchbox" class="-translate-y-full shadow-xl font-semibold flex flex-col items-center p-10 top-0 left-0 absolute w-full h-screen bg-zinc-50 bg-opacity-90 z-50">
    <div class="mb-10 flex justify-center items-center gap-x-5 w-1/2">
        <label class="">Search</label>
        <input name="inputsearchbox" type="text" class="w-2/3 p-3 py-1 bg-transparent border-b outline-none focus:text-orange-500 focus:border-orange-500">
        <button name="resetSearchbox" type="reset" class="p-1 px-2 border hover:border-orange-500 hover:text-orange-500"><i class="fa-solid fa-delete-left"></i></button>
    </div>
    <span name="closeSearchbox" class="absolute -top-1 p-2 right-0 cursor-pointer hover:text-orange-500 font-semibold text-xl"><i class="fa-solid fa-xmark"></i></span>
    <ul id="resultSearch" class="h-full gap-5 w-5/12 flex flex-col items-start overflow-y-scroll overscrollHidden">
    </ul>
    <p id="totalResults" class="border-t border-zinc-300 pt-2 mt-5"></p>
</form>`
}
export default SearchBox