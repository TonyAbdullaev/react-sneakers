function Drawer() {
    return (
        <div className="overlay">
            <div className="drawer d-flex flex-column">
                <div className="header-cart-part">
                <h2 className="mb-30">Shopping cart</h2>
                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(/img/sneakers/blazer.jpg)'}} className="cartItemImg"></div>
                    <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>50$</b>
                    </div>
                    <img className="removeBtn" src="/img/bt-remove.svg" alt="remove button" />
                </div>
                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(/img/sneakers/blazer.jpg)'}} className="cartItemImg"></div>
                    <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>50$</b>
                    </div>
                    <img className="removeBtn" src="/img/bt-remove.svg" alt="remove button" />
                </div>
                </div>
                <div className="cartTotalBlock fotter-cart-part">
                <ul>
                    <li>
                    <span>Total:</span>
                    <div></div>
                    <b>100$</b>
                    </li>
                    <li>
                    <span>Taks 5%</span>
                    <div></div>
                    <b>5$</b>
                    </li>
                </ul>
                <button className="greenButton">Buy
                    <img src="/img/arrow.svg" alt="Arrow" />
                </button>
                </div>
            </div>
        </div>
    )
}; 

export default Drawer;