import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';
import { useCallback, useState } from 'react';
import useItems from './hooks/useItems';
import Item from './components/Catalog/Item';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Article from './components/Article/Article';

function App() {
  const { items, loading, error } = useItems();
  const [cart, setCart] = useState<Item[]>([]);
  const localStorageLoading = useLocalStorage({items, setCart, itemsLoading: loading});
  const [search, setSearch] = useState("");

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

  if (loading || localStorageLoading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {  
    return <div>Erreur : {error}</div>;
  }
  
  return (
    <>
    <Navbar search={search} setSearch={setSearch}></Navbar>
    <main>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element=<Catalog items={items} search={search} addToCart={addToCart}></Catalog>/>
          <Route path='/article/:id' element=<Article items={items} addToCart={addToCart} />/>
        </Routes>
      </BrowserRouter>
      <Cart cart={cart} removeFromCart={removeFromCart} incrementItem={incrementItem} decrementItem={decrementItem}></Cart>
    </main>
    <Footer></Footer>
    </>
  );
}

export default App
