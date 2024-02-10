import { user } from "../../utils";
import { getData } from "../admin/handleCRUD";
const data = await getData('users')

const ActiveStatus = () => {
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