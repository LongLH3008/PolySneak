
const ActiveStatus = () => {
    const userStatus = document.getElementById('userStatus');
    const check = JSON.parse(localStorage.getItem('user'));

    if (check) {
        const api = 'http://localhost:3000/users'
        fetch(api)
            .then(response => response.json())
            .then(function (data) {
                const dataUsers = data.find(dt => dt.username === check.username)
                console.log(dataUsers);
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
                        <li>
                            <a href=""
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
                        <li>
                            <a href="/signout"
                                class="h-full w-full p-3 hover:bg-gradient-to-r from-zinc-600 to-gray-500 hover:text-white flex justify-start gap-x-2 items-center">
                                <i class="fa-solid fa-power-off"></i></i>Sign out
                            </a>
                        </li>
                    </ul>
                </div>    
                `
            })
            .catch(function (err) { console.log(err); })
    }
}
export default ActiveStatus