import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


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
    });
    axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    })
  }, []);

  const onAddToCard = (obj) => {
    try {
      if(cardItems.find(itemInDrawer => {
        console.log(`is ${itemInDrawer.id} equal ${obj.id} => ${Number(itemInDrawer.id) === Number(obj.id)}`);
        })) {
        axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/cart/${obj.id}`);
        setCardItems((prev) => prev.filter(item => item.id !== obj.id));
      } else {
        console.log('CARD there is not id so we add it')
        axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart', obj);
        setCardItems([ ...cardItems, obj]);
      }
    } catch(error) {
      alert("Cant add to drawer")
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        console.log('FAVORITE there is id so we remove it')
        axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(item => item.id !== obj.id)); 
      } else{
        console.log('FAVORITE there is not id so we add it')
        const { data } = await axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/favorites', obj);
        setFavorites((prev) => [ ...prev, data]);
      } 
    } catch(error) {
      alert("Cant add to favorites")
    }
  };

  const onRemoveFromDrawer = (id) => {
    console.log(id);
    axios.delete(`https://631ec1cc22cefb1edc39b06f.mockapi.io/card/${id}`);
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
    <Routes>
      <Route path='/' exact element= {
        <Home 
        sneakers={sneakers}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToCard={onAddToCard}
        onAddToFavorites={onAddToFavorites}
      />
      } />
      <Route index path='favorites' element ={
        <Favorites
          favorites={favorites}
          onAddToFavorites={onAddToFavorites}
        />
        }>
      </Route>
      <Route index path='orders' element ={
        <Favorites
          favorites={favorites}
          onAddToFavorites={onAddToFavorites}
        />
        }>
      </Route>
    </Routes>
  </div>
);}

export default App;

