import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';
import { useCallback, useEffect, useState } from 'react';
import useItems from './hooks/useItems';
import Item from './components/Catalog/Item';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import parseLocalStorage from './components/utils/parseLocalStorage';

function App() {
  const { items, loading, error } = useItems();
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    if(!loading && localStorage.getItem('articles') !== null)
      setCart(parseLocalStorage(items));
  }, [loading])

  const addToCart = useCallback((item: Item) => {
    if(item.getAmount() === 0) return; // cannot add a empty item
    item.decrementAmount();
    setCart((prevCart: Item[]) => {
      const indexCart = prevCart.findIndex(currentItem=>currentItem.equals(item));
      let toReturn: Item[]|null = null;
      if(indexCart === -1){
        toReturn = [...prevCart, item.createItem()];
      }else{
        const cartItem = prevCart[indexCart];
        cartItem.incrementAmount();
        toReturn = [...prevCart];
      }
      localStorage.setItem('articles', JSON.stringify(toReturn));
      return toReturn;
    });
  }, []);

  const removeFromCart = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => {
      const indexCart = prevCart.findIndex(currentItem=>currentItem.equals(item));
      const indexItem = items.findIndex(currentItem=>currentItem.equals(item));
      if(indexCart === -1 || indexItem === -1) return prevCart;
      items[indexItem].addAmount(item.getAmount());
      prevCart.splice(indexCart, 1);
      let toReturn: Item[] = [...prevCart];
      localStorage.setItem('articles', JSON.stringify(toReturn));
      return toReturn;
    });
  }, [items]);

  const incrementItem = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => {
      const indexItem = items.findIndex(currentItem=>currentItem.equals(item));
      if(indexItem === -1) return prevCart;
      if(items[indexItem].getAmount() === 0) return prevCart;
      items[indexItem].decrementAmount();
      item.incrementAmount();
      let toReturn: Item[] = [...prevCart];
      localStorage.setItem('articles', JSON.stringify(toReturn));
      return toReturn;
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
      let toReturn: Item[] = [...prevCart];
      localStorage.setItem('articles', JSON.stringify(toReturn));
      return toReturn;
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
