import sideNav from "../admin/sideNav"

import { sendRequest, getData, deleteData, updateData, createData } from '../admin/handleCRUD';

const dataUsers = await getData('users');
const presentUser = JSON.parse(localStorage.getItem('user')).username;


const UsersAdminPage = () =>`
<section class="w-full h-screen bg-zinc-100 overflow-hidden flex justify-between items-start">
${sideNav()}
<div class="w-5/6 h-full flex justify-center items-center p-10 text-zinc-600">
    <ul class="w-full h-3/4 shadow-md rounded-sm flex flex-col gap-y-1">
        <ul class="flex columns-8 gap-1">
            <li class="w-1/12 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">#</li>
            <li class="w-2/3 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">Username</li>
            <li class="w-1/3 border border-transparent text-center flex items-center justify-center p-3 bg-zinc-600 text-white font-semibold">Rule</li>
            <a href="/admin/addUser" class="w-1/12 h-full items-center flex justify-center bg-gradient-to-bl from-orange-500 to-amber-400 hover:bg-gradient-to-tr text-2xl rounded-md text-white">
                <i class="fa-regular fa-square-plus"></i> 
            </a>
        </ul>
        <div class="overscrollHidden overflow-y-scroll scroll-smooth flex flex-col gap-y-1">
            ${dataUsers.map(pd => `
            <ul class="flex columns-8 gap-1">
                <li class="w-1/12 border border-zinc-300 text-center flex items-start justify-center p-3 font-semibold">${pd.id}</li>
                <li class="w-2/3 border border-zinc-300 text-center flex items-start justify-start p-3">${pd.username}</li>
                <li class="w-1/3 border border-zinc-300">
                    <form id="changeRule_user${pd.id}" class="w-full h-full flex items-start justify-between text-start p-3">
                        <select name="setRule" class="hidden w-8/12 outline-none border focus:border-orange-500 rounded-md p-3 px-4">
                            <option value="${pd.rule}" selected>${pd.rule}</option>
                            <option value="${pd.rule == 'admin' ? 'customer' : 'admin'}">${pd.rule == 'admin' ? 'customer' : 'admin'}</option>
                        </select>
                        <span name="saveRule" class="hidden button p-2 px-3 bg-gradient-to-tr from-lime-600 to-green-400 hover:bg-gradient-to-bl hover:-translate-y-1 active:translate-y-1 text-white rounded-md"><i class="fa-solid fa-check"></i></span>
                        <span name="rule" class="button p-2 px-3">${pd.rule}</span>
                        <span name="change" class="${presentUser == pd.username ? 'hidden' : ''} button p-2 px-3 bg-gradient-to-tr from-zinc-600 to-gray-400 hover:bg-gradient-to-bl hover:-translate-y-1 active:translate-y-1 text-white rounded-md"><i class="fa-solid fa-pen"></i></span>
                    </form>
                </li>
                <li class="w-1/12 border border-zinc-300 text-center flex py-3 items-${presentUser == pd.username ? 'center' : 'start'} justify-evenly">
                    ${presentUser == pd.username ? `
                    <span class="text-lime-500">
                        <i class="fa-solid fa-circle"></i>
                    </span>`
                    : `
                    <button id="delete_user${pd.id}" class="button p-2 px-3 bg-gradient-to-tr from-red-600 to-red-400 hover:bg-gradient-to-bl hover:-translate-y-1 active:translate-y-1 text-white rounded-md"><i class="fa-regular fa-trash-can"></i></button>
                    `}
                </li>
            </ul>
            `).join('')}
        </div>
    </ul>
</div>
</section>
`

export default UsersAdminPage