import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';
import { useCallback, useState } from 'react';
import useItems from './hooks/useItems';
import Item from './components/Catalog/Item';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  const { items, loading, error } = useItems();
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = useCallback((item: Item) => {
    if(item.getAmount() === 0) return; // cannot add a empty item
    item.decrementAmount();
    setCart((prevCart: Item[]) => {
      const indexCart = prevCart.findIndex(currentItem=>currentItem.equals(item));
      if(indexCart === -1)
        return [...prevCart, item.createItem()];
      const cartItem = prevCart[indexCart];
      cartItem.incrementAmount();
      return [...prevCart];
    });
  }, []);

  const removeFromCart = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => {
      const indexCart = prevCart.findIndex(currentItem=>currentItem.equals(item));
      const indexItem = items.findIndex(currentItem=>currentItem.equals(item));
      if(indexCart === -1 || indexItem === -1) return prevCart;
      items[indexItem].addAmount(item.getAmount());
      prevCart.splice(indexCart, 1);
      return [...prevCart];
    });
  }, [items]);

  const incrementItem = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => {
      const indexItem = items.findIndex(currentItem=>currentItem.equals(item));
      if(indexItem === -1) return prevCart;
      if(items[indexItem].getAmount() === 0) return prevCart;
      items[indexItem].decrementAmount();
      item.incrementAmount();
      return [...prevCart];
    });
  }, [items]);

  const decrementItem = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => {
      const indexItem = items.findIndex(currentItem=>currentItem.equals(item));
      if(indexItem === -1) return prevCart;
      items[indexItem].incrementAmount();
      item.decrementAmount();
      if(item.getAmount() === 0){
        const indexCart = prevCart.findIndex(currentItem=>currentItem.equals(item));
        if(indexCart === -1) return prevCart;
        prevCart.splice(indexCart, 1);
      }
      return [...prevCart];
    });
  }, [items]);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {  
    return <div>Erreur : {error}</div>;
  }

  return (
    <>
    <Navbar></Navbar>
    <main>
      <Catalog items={items} addToCart={addToCart}></Catalog>
      <Cart cart={cart} removeFromCart={removeFromCart} incrementItem={incrementItem} decrementItem={decrementItem}></Cart>
    </main>
    <Footer></Footer>
    </>
  );
}

export default App
