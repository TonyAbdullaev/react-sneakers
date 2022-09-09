function Card() {
    return (
        <div className="card d-flex flex-column">
          <div className="favorite">
            <img src="/img/liked-heart.svg" alt="liked" width={32} heigth={32} />
          </div>
          <img heigth={112} width={133} src="/img/sneakers/blazer.jpg" alt="sneaker" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>50$</b>
            </div>
            <button className="button">
              <img height={11} width={11} src="/img/plus.svg" alt="plus" />
            </button>
          </div>
        </div>
    );
};

export default Card;