import Item from './Item';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

type CatalogItemProps = {
    item: Item,
    addToCart: CallableFunction
};

function CatalogItem({item, addToCart}: CatalogItemProps){
    return (
    <div className="flex flex-col me-4 lg:me-0 w-[80%] max-w-sm xl:max-w-[23rem] border rounded-lg shadow bg-gray-800 border-gray-700 lg:ml-4 mt-4">
        <Link to={"/article/" + item.getId()} className='flex-grow flex justify-center cursor-pointer'>
            <img className="transform transition-transform duration-300 hover:scale-105 p-8 rounded-t-lg overflow-x-hidden max-w-[375px] max-h-[375px] object-contain select-none" src={"/images/resized/webp/" + item.getImageUrl()} alt={item.getName()} />
        </Link>
        <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-white">{item.getDescription()}</h5>
            <div className="flex justify-between">
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">5.0</span>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                    <span className="text-sm md:text-xl tracking-tight text-white">
                    {item.getAmount() > 0 
                    ? `${item.getAmount()} article${item.getAmount() > 1 ? "s" : ""} restant` 
                    : <span className="text-red-900">Plus de stock</span>}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{item.getPrice()}€</span>
                <Button onClick={() => addToCart(item)} disabled={item.getAmount() <= 0} >Ajouter au panier</Button>
            </div>
        </div>
    </div>);
}

type CatalogProps = {
    items: Item[],
    addToCart: CallableFunction,
    search: string,
};

export default function Catalog({items, addToCart, search} : CatalogProps){
    return (
        <section className='w-full min-h-[80vh] xl:w-[calc(100%-325px)]'>
            <div className="flex justify-center flex-wrap">
                {items.filter((item: Item)=>item.getName().toLowerCase().includes(search.toLowerCase())).map((item: Item, index: number)=><CatalogItem key={index} item={item} addToCart={addToCart} />)}
            </div>
        </section>
    )
}