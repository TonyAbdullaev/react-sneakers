import React, { useState, useEffect } from 'react';
//import axios from 'axios';

import cardStyles from './Cards.module.scss'

function Card({ id, imgUrl, title, price, onFavorite, onPlus, favorited = false }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imgUrl, price });
    setIsFavorite(!isFavorite);
  };

  const changePlusImg = () => isAdded ? '/img/bt-added.svg' : '/img/plus.svg';
  const changeFavoriteImg = () => isFavorite ? '/img/liked-heart.svg' : '/img/unliked-heart.svg';

  return (
      <div className={cardStyles.card}>
        <div className={cardStyles.favorite} onClick={onClickFavorite}>
          <img src={changeFavoriteImg()} alt="liked" width={32} heigth={32} />
        </div>
        <img heigth={112} width={133} src={imgUrl} alt="sneaker" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Price:</span>
            <b>{price}$</b>
          </div>
          <img className={cardStyles.plus} onClick={onClickPlus} src={changePlusImg()} alt="plus" />
        </div>
      </div>
  );
};

export default Card;  