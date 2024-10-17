import { useState, useEffect } from 'react';
import Item from '../components/Catalog/Item';
import ItemType from '../components/Catalog/ItemType';

function useItems() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/articles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                return response.json();
            })
            .then((data: ItemType[]) => {
                const items: Item[] = [];
                for(let i = 0; i < data.length; ++i){
                    const item = data[i];
                    items.push(new Item(item.id, item.name, item.price, item.description, item.amount, item.imageUrl));
                }
                setItems(items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { items, loading, error };
}

export default useItems;
