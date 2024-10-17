import { useEffect, useState } from 'react';
import Item from './Item';
import ItemType from './ItemType';

type CatalogItemProps = {
    item: Item;
};

function CatalogItem({item}: CatalogItemProps){
    return (
    <div>
        <img src="https://placehold.co/400" alt={item.getName()} />
        <h2>{item.getName()}</h2>
        <p>{item.getDescription()}</p>
        <p>Prix : {item.getPrice()}€</p>
        <p>Article restant : {item.getAmount()}</p>
        <button>Detail de l'article</button>
        <button>Ajouter au panier</button>
    </div>)
}

export default function Catalog(){
    const [items, setItems] = useState<Item[]>([]);

    useEffect(()=>{
        fetch("/articles.json")
        .then((response) => {
            if (!response.ok) 
                throw new Error("Erreur lors du chargement des articles.");
            return response.json();
        })
        .then((data: ItemType[]) => {
            const items: Item[] = [];
            for(let i = 0; i < data.length; ++i){
                const item = data[i];
                items.push(new Item(item.id, item.name, item.price, item.description, item.amount, item.imageUrl));
            }
            setItems(items);
        })
        .catch((error) => {
            console.error("Erreur:", error);
        });
    }, []);

    return (
        <section id="catalog">
            {items.map((item: Item, index: number)=><CatalogItem key={index} item={item} />)}
        </section>
    )
}