const FooterComponent = () => `
<section id="footer" class="mt-20 px-48 w-full bg-gradient-to-tl from-zinc-500 to-zinc-800 p-20 text-white">
<div class="flex justify-center">
    <img width="80px" src="./assets/img/logo.png" alt="">
</div>
<div class="flex justify-center">
    <h1 class="mt-2 text-3xl font-bold">PolySneak</h1>
</div>
<div class="flex justify-between mt-20">
    <ul>
        <li class="font-bold text-orange-400 mb-5 text-2xl">Contact</li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Address</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Phone</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Email</a></li>
    </ul>
    <ul>
        <li class="font-bold text-orange-400 mb-5 text-2xl">Contact</li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Address</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Phone</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Email</a></li>
    </ul>
    <ul>
        <li class="font-bold text-orange-400 mb-5 text-2xl">Contact</li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Address</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Phone</a></li>
        <li class="hover:text-orange-400 cursor-pointer"><a href="/">Email</a></li>
    </ul>
    <ul class="p-3 bg-white rounded-md w-4/12 text-zinc-600 ">
        <li class="font-bold text-lg">
            " Leave your email for news !"
        </li>
        <li class="mt-3">
            <form action="#">
                <input type="email"
                    class="p-3 px-4 w-10/12 border outline-none focus:border-orange-500 rounded-lg"
                    placeholder="Your Email">
                <button type="submit"
                    class="p-3 bg-gradient-to-r from-orange-500 to-amber-400 rounded-md text-white">Send</button>
            </form>
        </li>
    </ul>
</div>
</section>
`

export default FooterComponent