const SignupPage = () => /*html*/`

<section id="signin" class="relative w-full h-screen flex items-center justify-center bg-gradient-to-tr from-orange-600 to-amber-400">
<div class="relative w-3/5 h-2/3 border bg-white rounded-2xl flex justify-between items-center">
    <div class="w-2/4 h-full flex flex-col items-center justify-center">
        <img id="logo_signin" class="w-2/4" src="./assets/img/logo.png" alt=""><br>
        <h2 class="text-3xl font-bold ">Sign Up</h2>
    </div>
    <a href="/" class="p-2 px-3 text-center absolute top-0 right-0 text-1xl text-zinc-400 hover:text-orange-500 hover:text-4xl"><i class="fa-solid fa-xmark"></i></a>
    <div class="w-3/4">
        <form id="signup" action="#" class="flex flex-col items-center justify-center">
            <div class="w-3/5 flex justify-between items-center gap-3">
                <i class="fa-solid fa-lock text-2xl"></i>
                <input required id="signupEmail" type="email" class="w-full outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="Email@">
            </div>
            <div class="w-3/5 flex justify-between items-center gap-3 mt-3">
                <i class="fa-solid fa-key text-2xl"></i>
                <input required id="signupPass" type="password" class="w-full outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="Password***">
            </div>
            <div class="w-3/5 flex justify-between items-center gap-3 mt-3">
                <i class="fa-solid fa-key text-2xl"></i>
                <input required id="repass" type="password" class="w-full outline-none border focus:border-orange-500 rounded-md p-3 px-4" placeholder="RePassword***">
            </div>
            <button class="mt-3 w-3/5 p-3 px-4 bg-gradient-to-br from-orange-500 to-amber-400 text-white font-semibold hover:from-orange-400 hover:to-amber-600">Sign in</button>
            <div class="mt-2 w-3/5">
                <p>Already have ! <a href="/signin" class="underline text-orange-500"> Back to Sign In</a></p>
            </div>
        </form>
    </div>
</div>
</section>
`

export default SignupPage