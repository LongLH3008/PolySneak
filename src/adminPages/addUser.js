import sideNav from "../admin/sideNav"

const addUser = () =>`
<section class="w-full h-screen bg-zinc-100 overflow-hidden flex justify-between items-start">
${sideNav()}
<div class="w-5/6 h-full flex justify-center items-center p-10 text-zinc-600">  
    <form id="adduser" action="#" method="" class="w-5/6 p-10 border flex justify-between items-center">
        <div class="w-8/12">
            <input name="user" type="email" class="w-full mb-2 outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="Email@" required/>
            <input name="pass" type="password" class="w-full mb-2 outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="Pass***" required/>
            <input name="repass" type="password" class="w-full mb-2 outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="Repass" required/>
            <select name="rule" class="w-full mb-2 outline-none border focus:border-orange-500 rounded-md p-3 px-4 text-zinc-500 font-normal">
                <option value="" selected>Choose rule</option>
                <option value="customer" selected>Customer</option>
                <option value="admin" selected>Admin</option>
            </select>
        </div>
        <button type="submit" class="w-3/12 h-16 items-center flex justify-center bg-gradient-to-bl from-orange-500 to-amber-400 hover:bg-gradient-to-tr text-xl rounded-md text-white">
            Add User
        </button>
    </form>
</div>
</section>
`

export default addUser