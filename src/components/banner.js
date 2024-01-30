import HeaderComponent from "./header"

const BannerComponent = () => `
<section class="w-full px-48 font-semibold">
${HeaderComponent()}
<div id="banner" style="height: 85vh;" class="mt-5 bg-gradient-to-br from-orange-400 to-amber-400 rounded-md relative h-screen">
    <h1 class="absolute left_banner z-20 text-9xl text-orange-200">NEW</h1>
    <img class="absolute left-1/2 img_banner cursor-pointer hover:z-30" src="./assets/img/banner.png" alt="">
    <h1 class="absolute right_banner text-8xl text-amber-200 drop-shadow-lg">ARRIVAL</h1>
</div>
</section>
`

export default BannerComponent