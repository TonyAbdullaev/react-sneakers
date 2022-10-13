import React, { useState } from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../../context';
//import axios from 'axios';

import cardStyles from './Cards.module.scss'

function Card({ id, imgUrl, title, price, onFavorite, onPlus, favorited = false, loading = false }) {
  const { isSneakersInDrawer } = React.useContext(AppContext);
  // const [isAdded, setIsAdded] = useState(addedToDrawer);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = { id, parentId: id, title, imgUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
    // setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  const changePlusImg = () => isSneakersInDrawer(id) ? '/img/bt-added.svg' : '/img/plus.svg';
  const changeFavoriteImg = () => isFavorite ? '/img/liked-heart.svg' : '/img/unliked-heart.svg';

  return (
      <div className={cardStyles.card}>
        {
          loading ? 
          <ContentLoader 
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            // {...props}
          >
            <rect x="0" y="1" rx="10" ry="10" width="150" height="90" /> 
            <rect x="0" y="101" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="125" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="161" rx="5" ry="5" width="80" height="25" /> 
            <rect x="117" y="155" rx="10" ry="10" width="32" height="32" />
          </ContentLoader> :
          <>
            {
              onFavorite && 
              <div className={cardStyles.favorite} onClick={onClickFavorite}>
                <img src={changeFavoriteImg()} alt="like" width={32} heigth={32} />
              </div>
            }
            <img heigth={112} width={133} src={imgUrl} alt="sneaker" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price}$</b>
              </div>
              {
                onPlus && <img className={cardStyles.plus} onClick={onClickPlus} src={changePlusImg()} alt="plus" />
              }
            </div>
          </> 
        }
        
      </div>
  );
};

export default Card;  