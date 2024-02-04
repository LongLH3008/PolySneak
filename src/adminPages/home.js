import sideNav from "../admin/sideNav"

const HomeAdminPage = () => `
    <section class="w-full h-screen bg-zinc-100 overflow-hidden flex justify-between items-start">
    ${sideNav()}
    </section>
`

export default HomeAdminPage