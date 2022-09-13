import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';


function App() {
  const [cardOpened, setCardOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/sneakers').then((res) => {
      setSneakers(res.data);
    });
    axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart').then((res) => {
      setCardItems(res.data);
    })
    
  }, []);

  const onAddToCard = (obj) => {
    axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart', obj);
    setCardItems([ ...cardItems, obj]);
  };

  const onRemoveFromDrawer = (id) => {
    axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/cart/${id}`);
    setCardItems((prev) => prev.filter(item => item.id !== id));
  };

  const onAddToFavorites = (obj) => {
    axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites', obj);
    setFavorites((prev) => [ ...prev, obj]);
  };

  const onRemoveFromFavorites = (id) => {
    axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites/${id}`);
    setCardItems((prev) => prev.filter(item => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
  <div className="wrapper clear">
    { cardOpened && <Drawer items={cardItems} onClose={() => setCardOpened(false)} onRemove={onRemoveFromDrawer} /> }
    <Header onClickCard= {() => setCardOpened(true)} />
    <Route path='/' exact>
      <Home 
      items={sneakers}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onChangeSearchInput={onChangeSearchInput}
      onAddToCard={onAddToCard}
      onAddToFavorites={onAddToFavorites}
      />
    </Route>
  </div>
);}

export default App;

