
export default class Item{
    private id: number;
    private name: string;
    private price: number;
    private description: string;
    private amount: number;
    private imageUrl: string;
    
    constructor(id: number, name: string, price: number, description: string, amount: number, imageUrl: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.amount = amount;
        this.imageUrl = imageUrl;
    }

    getId(): number{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getDescription(): string{
        return this.description;
    }

    getAmount(): number{
        return this.amount;
    }

    getPrice(): number{
        return this.price;
    }

    getImageUrl(): string{
        return this.imageUrl;
    }

    getTotalPrice(): number{
        return this.amount * this.price;
    }

    decrementAmount(): number{
        return --this.amount;
    }

    incrementAmount(): number{
        return ++this.amount;
    }

    addAmount(amount: number){
        this.amount += amount;
    }

    equals(item: Item){
        return this.getId() === item.getId();
    }

    createItem(): Item{
        return new Item(
            this.getId(),
            this.getName(),
            this.getPrice(),
            this.getDescription(),
            1,
            this.getImageUrl()
        );
    }
}