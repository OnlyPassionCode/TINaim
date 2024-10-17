import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';
import { useCallback, useState } from 'react';
import useItems from './hooks/useItems';
import Item from './components/Catalog/Item';
function App() {
  const { items, loading, error } = useItems();
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = useCallback((item: Item) => {
    setCart((prevCart: Item[]) => [...prevCart, item]);
  }, []);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {  
    return <div>Erreur : {error}</div>;
  }

  return (
    <main className='lg:flex'>
      <Catalog items={items} addToCart={addToCart}></Catalog>
      <Cart cart={cart}></Cart>
    </main>
  );
}

export default App
