import Item from "../Catalog/Item";
import totalItems from "../utils/totalItems";
import Button from "../Button/Button";
import FormValidation from "../FormValidation/FormValidation";


type CartItem = {
    item: Item,
    removeFromCart: CallableFunction,
    incrementItem: CallableFunction,
    decrementItem: CallableFunction,
};

function CartItem({item, removeFromCart, incrementItem, decrementItem}: CartItem){
    return (
    <div className="flex items-center justify-center xl:justify-start gap-4">
        <div className="w-36 h-36 shrink-0 bg-white p-2 rounded-md">
            <img src={"/images/resized/webp/" + item.getImageUrl()} className="w-full h-full object-contain select-none pointer-events-none" />
        </div>
        <div className="xl:w-full">
            <h3 className="text-lg font-semibold text-gray-800">{item.getName()}</h3>
            <h6 className="text-md text-gray-800 font-bold cursor-pointer mt-0.5">{item.getTotalPrice()}€</h6>

            <div className="flex gap-4 mt-4">

                <div>
                    <button type="button"
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                        <svg onClick={() => decrementItem(item)} xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                        </svg>

                        <span className="mx-2.5 text-md">{item.getAmount()}</span>
                        <svg onClick={() => incrementItem(item)} xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                        </svg>
                    </button>
                </div>

                <div className="ml-2 xl:ml-auto" onClick={() => removeFromCart(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 inline cursor-pointer" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    );
}

type CartProps = {
    cart: Item[],
    removeFromCart: CallableFunction,
    incrementItem: CallableFunction,
    decrementItem: CallableFunction
};

function Cart({cart, removeFromCart, incrementItem, decrementItem} : CartProps){
    return (
    <>
    <div id="cart" onLoad={(e)=>(e.target as HTMLElement).focus()} className="relative xl:max-w-[325px] xl:min-w-[325px] bg-gray-100 rounded-md xl:fixed right-0 bottom-0 top-0 overflow-y-auto max-h-screen mt-5 xl:mt-0">
        <div className="bg-gray border-gray-200 min-h-[70px] max-h-[70px] flex justify-center align-center"><img className="w-[85px] h-[85px]" src="/images/cart.svg" alt="Image d'un cadis" /></div>
        {cart.length > 0 && <hr className="border-gray-300 mt-4" />}
        <div className="space-y-4 p-6">
            {cart.map((item: Item, index: number)=><CartItem key={index} item={item} removeFromCart={removeFromCart} incrementItem={incrementItem} decrementItem={decrementItem} />)}
            <hr className="border-gray-300" />
        </div>
        <FormValidation totalPrice={totalItems(cart)}></FormValidation>
    </div>
    </>
)
}

export default Cart;