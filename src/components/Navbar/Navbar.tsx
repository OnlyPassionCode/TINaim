type NavbarProps = {
    search: string,
    setSearch: CallableFunction
}

function Navbar({search, setSearch}: NavbarProps){
    return (
    <nav className="mb-[45px] cart:mb-0 relative flex justify-between cart:justify-start border-gray-200 bg-gray-900 min-h-[70px] max-h-[70px] xl:w-[calc(100%-325px)]">
        <div className="max-w-screen-xl flex flex-wrap items-center cart:mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">TrouveTout</span>
            </a>
            <div className="items-center ms-12" id="navbar-search">
                <div className="absolute top-[80px] left-[10vw] cart:left-0 cart:top-0 cart:relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-50">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" id="search-navbar" className="block w-[75vw] cart:w-[500px] p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Rechercher..."/>
                </div>
            </div>
        </div>
        <a href="#cart" className="basis-14 xl:hidden flex justify-center items-center me-5 min-h-[70px] max-h-[70px]">
            <img className="min-w-[50px] min-h-[50px]" src="/images/cart-white.svg" alt="Image d'un cadis" />
        </a>
    </nav>
    )
}

export default Navbar;