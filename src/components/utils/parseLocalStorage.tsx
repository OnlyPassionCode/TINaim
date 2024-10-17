import Item from "../Catalog/Item";
import ItemType from "../Catalog/ItemType";

function parseLocalStorage(items: Item[]): Item[]{
    const storage = localStorage.getItem('articles');
    const jsonArticles: ItemType[] = storage !== null ? JSON.parse(storage) : null;
    if(jsonArticles === null) return [];

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
    
    return itemArticles;
}

export default parseLocalStorage;