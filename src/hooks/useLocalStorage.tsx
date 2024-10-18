import { useState, useEffect } from 'react';
import Item from '../components/Catalog/Item';
import ItemType from '../components/Catalog/ItemType';

type UseLocalStorageProps = {
    items: Item[],
    setCart: CallableFunction,
    itemsLoading: boolean
}

function useLocalStorage({items, setCart, itemsLoading}: UseLocalStorageProps) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(itemsLoading) return;
        const storage = localStorage.getItem('articles');
        const jsonArticles: ItemType[] = storage !== null ? JSON.parse(storage) : null;
        if(jsonArticles === null){
            setLoading(false);
            return;
        }
    
        const itemArticles: Item[] = [];
    
        for(const article of jsonArticles){
            const storageItem = new Item(article.id, article.name, article.price, article.description, article.amount, article.imageUrl);
            itemArticles.push(storageItem);
            for(const item of items){
                if(!item.equals(storageItem)) continue;
                item.addAmount(-article.amount);
                break;
            }
        }
        setCart(itemArticles);
        setLoading(false);
    }, [itemsLoading]);

    return loading;
}

export default useLocalStorage;
