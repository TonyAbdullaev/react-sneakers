import cardStyles from './Cards.module.scss'
function Card(CardProps) {
  const addButton = () => {
    alert(CardProps.title);
  };

  return (
      <div className={cardStyles.card}>
        <div className={cardStyles.favorite}>
          <img src="/img/liked-heart.svg" alt="liked" width={32} heigth={32} />
        </div>
        <img heigth={112} width={133} src={CardProps.imgUrl} alt="sneaker" />
        <h5>{CardProps.title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Price:</span>
            <b>{CardProps.price}$</b>
          </div>
          <button className="button" onClick={addButton}>
            <img height={11} width={11} src="/img/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
  );
};

export default Card;