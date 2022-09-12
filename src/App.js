import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Cards';


function App() {
  const [cardOpened, setCardOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://631ec1cc22cefb1edc39b06f.mockapi.io/sneakers').then((res) => {
      return res.json();
    }).then((json => {
      setSneakers(json);
    }));
  }, []);

  const onAddToCard = (obj) => {
    setCardItems([ ...cardItems, obj]);
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
  <div className="wrapper clear">
    { cardOpened && <Drawer items={cardItems} onClose={() => setCardOpened(false)} /> }
    <Header onClickCard= {() => setCardOpened(true)} />
    <div className="content p-40">  
      <div className="mb-40 justify-between d-flex">
        <h1>{searchValue ? `Search by "${searchValue}"` : "All shoes"}</h1>
        <div className="search-block align-baseline">
          <img src="/img/search.svg" alt="search" />
          {searchValue && <img className="clear cu-p" onClick={() => setSearchValue('')} src="/img/bt-remove.svg" alt="remove button" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
        </div>
      </div>
      
      <div className="d-flex justify-between flex-wrap">
        {
          sneakers.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((CardProps) => (
            <Card 
              
              title={CardProps.title}
              price={CardProps.price}
              imgUrl={CardProps.imgUrl}
              onFavorite={() => console.log('Add to favorites')}
              onPlus={(product) => onAddToCard(product)}
            />
          ))
        }
      </div> 
    </div>
  </div>
);}

export default App;

