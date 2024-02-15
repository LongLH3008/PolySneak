import { products, type, user } from "../../utils";
import { getData } from "../admin/handleCRUD";
const data = await getData('users')

function bouncingLoad() {
    let bounce = document.querySelectorAll('.fa-solid.fa-circle');
    console.log(bounce[0]);
    bounce[0].classList.add('bounce');
    setTimeout(() => {
        bounce[1].classList.add('bounce');
    }, 300)
    setTimeout(() => {
        bounce[2].classList.add('bounce');
    }, 600)
}

const handleSearchBox = () => {
    const app = document.getElementById('app');
    const openSearchbox = document.getElementById('openSearchbox');
    const searchbox = document.getElementById('searchbox');
    const resultSearch = document.getElementById('resultSearch');
    const inputsearchbox = document.querySelector('input[name="inputsearchbox"]');
    const closeSearchbox = document.querySelector('span[name="closeSearchbox"]');

    closeSearchbox.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        searchbox.classList.add('hidden');
    })

    openSearchbox.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        searchbox.classList.remove('hidden');
    })

    window.addEventListener('beforeunload', function () {
        !searchbox.classList.contains('hidden') ? searchbox.classList.add('hidden') : '';
        document.body.style.overflow = 'auto';
    });

    inputsearchbox.addEventListener('input', () => {
        resultSearch.innerHTML = `
        <li class="flex justify-center items-center h-full w-full">
            <div class="text-sm text-orange-500">
                <i class="fa-solid fa-circle"></i>
                <i class="fa-solid fa-circle"></i>
                <i class="fa-solid fa-circle"></i>
            </div>
        </li>
        `
        bouncingLoad();
    })

    inputsearchbox.addEventListener('keyup', () => {
        let value = inputsearchbox.value;
        console.log(inputsearchbox.value);
        if (value !== '') {
            const results = products.filter(pd => pd.name.toLowerCase().includes(value.toLowerCase()))
            console.log(results.length);
            if (results.length > 0) {
                setTimeout(() => {
                    resultSearch.innerHTML = `
                    ${results.map(e => `
                    <li class="w-full cursor-pointer border-l-2 border-r-2 border-transparent hover:border-orange-500 ps-4 hover:text-orange-500">
                        <a href="/detailproduct/${e.id}" class="w-full h-full flex justify-start gap-10 items-center">
                            <div class="w-1/6 overflow-hidden flex items-center">
                                <img src="${e.attribute[0].img}" class="w-full">
                            </div>
                            <p>${e.name}</p>
                        </a>
                    </li>
                    `).join('')}
                    `
                }, 1000);
            } else {
                setTimeout(() => {
                    resultSearch.innerHTML = `
                    <li class="flex justify-center items-center h-full w-full">
                        No data founded <i class="fa-regular fa-face-sad-tear ms-1"></i>
                    </li>
                    `
                }, 1000);
            }
        }
    })
}

const ActiveStatus = () => {
    handleSearchBox();
    const userStatus = document.getElementById('userStatus');

    if (user) {
        const dataUsers = data.find(dt => dt.username === user)
        // console.log(dataUsers);
        userStatus.innerHTML = `
                <div id="activeUser" class="cursor-pointer p-2 px-3 rounded-tr-md rounded-tl-md border-b-0 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white">
                    <i class="fa-solid fa-circle-user text-2xl"></i>
                </div>
                <div id="dropdownuser" class="text-sm border right-0 absolute bg-white w-64 rounded-md overflow-hidden shadow-xl z-20">
                    <ul class="flex flex-col justify-start">
                        <li>
                            <a href=""
                                class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                <img class="w-1/5" src="./assets/img/logo.png" alt="">${(dataUsers.username.split('@'))[0]}
                            </a>
                        </li>
                        ${dataUsers.rule == 'admin'
                ? `
                            <li>
                                <a href="/admin"
                                    class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                    <i class="fa-solid fa-user-gear"></i><span>Administrator</span>
                                </a>
                            </li>
                            `
                : `
                            <li>
                                <a href="/cart"
                                    class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                    <i class="fa-solid fa-bag-shopping"></i><span>Cart</span>
                                </a>
                            </li>
                            <li>
                                <a href=""
                                    class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                    <i class="fa-solid fa-clipboard-list"></i></i><span>Your Order</span>
                                </a>
                            </li>
                            <li>
                                <a href=""
                                    class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                    <i class="fa-solid fa-heart"></i></i>Favorite
                                </a>
                            </li>
                            `
            }
                        <li>
                            <a href="/signout"
                                class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                <i class="fa-solid fa-power-off"></i></i>Sign out
                            </a>
                        </li>
                    </ul>
                </div>    
                `
    } else {
        userStatus.innerHTML = '<a href="/signin" class="p-2 px-3 rounded-md hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white"><i class="fa-solid fa-key"></i></a>'
    }
}
export default ActiveStatus