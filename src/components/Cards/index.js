import React, { useState,useEffect } from 'react';

import cardStyles from './Cards.module.scss'

function Card({ imgUrl, title, price, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  const changeImg = () => isAdded ? '/img/bt-added.svg' : '/img/plus.svg';

  return (
      <div className={cardStyles.card}>
        <div className={cardStyles.favorite} onClick={onFavorite}>
          <img src="/img/liked-heart.svg" alt="liked" width={32} heigth={32} />
        </div>
        <img heigth={112} width={133} src={imgUrl} alt="sneaker" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Price:</span>
            <b>{price}$</b>
          </div>
          <img className={cardStyles.plus} onClick={onClickPlus} src={changeImg()} alt="plus" />
        </div>
      </div>
  );
};

export default Card;  