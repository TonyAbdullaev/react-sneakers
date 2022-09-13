function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer d-flex flex-column">
                <div className="header-cart-part d-flex justify-between">
                    <h2 className="mb-30">Shopping cart</h2>
                    <div className="cu-p rmv-btn" onClick={onClose}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                            <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                        </svg>
                    </div>
                </div>
                {
                    items.length > 0 ? (
                        <>
                            <div className="body-cart-part">
                                {
                                    items.map((obj) =>
                                        <div className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: `url(${obj.imgUrl}`}} className="cartItemImg"></div>
                                            <div className="mr-20">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price}$</b>
                                            </div>
                                            <img className="removeBtn" src="/img/bt-remove.svg" alt="remove button" onClick={() => onRemove(obj.id)} />
                                        </div>
                                    )
                                }
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
                        </>
                    ) : (
                        
                            <div className="cardEmpty d-flex align-center justify-center flex-column flex">
                                <img className="mb-20" width={120} height={120} src="/img/EmptyDrawer.jpg" alt="Empty drawer" />
                                <h2>Empty drawer</h2>
                                <p className="opacity-6">Add at least one pair of sneakers to make order</p>
                                <button onClick={onClose} className="greenButton">
                                    <img src="/img/arrow.svg" alt="Arrow" />
                                    Go back...
                                </button>
                            </div>
                    )
                }
            </div>
        </div>
    )
}; 

export default Drawer;