import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContext from './context';


function App() { 
  const [cardOpened, setCardOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    (async function fetchData() {
      try {
        const [ cartResponse, favResponse, sneakersResponse] = await Promise.all([
          axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart'), 
          axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites'), 
          axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/sneakers')
        ]);

        setIsLoading(false);

        setCardItems(cartResponse.data);
        setFavorites(favResponse.data);
        setSneakers(sneakersResponse.data);
      } catch (error) {
        alert('Error in request')
        console.log(error)
      }
    }());
    
  }, []);

  const onAddToCard = async (obj) => {
    const findItem = cardItems.find(itemInFrawer => Number(itemInFrawer.parentId) === Number(obj.id));
    try {
      if(findItem) {
        axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/cart/${String(findItem.id)}`);
        setCardItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
      } else {
        setCardItems([ ...cardItems, obj]);
        const { data } = await axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart', obj);
        setCardItems((prev) => prev.map(item => item.parentId === data.parentId ? {...item, id: data.id} : item));
      }
    } catch(error) {
      console.log(error)
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id))); 
        axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites/${obj.id}`);
      } else{
        const { data } = await axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites', obj);
        setFavorites((prev) => [ ...prev, data]);
      } 
    } catch(error) {
      alert("Can't add to favorite ;(");
      console.log(error)
    }
  };

  const onRemoveFromDrawer = (obj) => {
    try {
      // axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/card/${id}`);
      // setCardItems((prev) => prev.filter(item => item.id !== id));
      axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/cart/${String(obj.id)}`);
      setCardItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } catch (error) {
      alert("Can't remove from drawer ;(")
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isSneakersInDrawer = ( id ) => cardItems.some((obj) => Number(obj.parentId) === Number(id));
  // const isSneakersInFavorites = ( id ) => favorites.some((obj) => Number(obj.id) === Number(id));
  return (
    <AppContext.Provider value={{ sneakers, cardItems, favorites, isSneakersInDrawer, onAddToFavorites, onAddToCard, setCardOpened, setCardItems, isLoading, setIsLoading }}>
      <div className="wrapper clear">
        {/* { cardOpened && <Drawer items={cardItems} onClose={() => setCardOpened(false)} onRemove={onRemoveFromDrawer} /> } */}
        <Drawer items={cardItems} onClose={() => setCardOpened(false)} onRemove={onRemoveFromDrawer} opened={cardOpened} />
        <Header onClickCard= {() => setCardOpened(true)} />
        <Routes>
          <Route path='/' exact element= {
            <Home 
              sneakers={sneakers}
              cardItems={cardItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCard={onAddToCard}
              onAddToFavorites={onAddToFavorites}
              isLoading={isLoading}
          />
          } />
          <Route index path='favorites' element = {
              <Favorites />
          } />
          <Route index path='orders' element = {
              <Orders />
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

