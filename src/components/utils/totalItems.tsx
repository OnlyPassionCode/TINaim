import Item from "../Catalog/Item";

export default function totalItems(items: Item[]): number{
    return items.reduce(
        (total, item: Item) => total + item.getTotalPrice(),
        0,
    );
}