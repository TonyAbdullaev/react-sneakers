import React from 'react'
import { Link } from "react-router-dom";

import axios from 'axios';

import Info from "../Info";
import AppContext from '../../context';

import styles from './Drawer.module.scss'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cardItems, setCardItems, isLoading, setIsLoading } = React.useContext(AppContext);
    
    const [isOrderComplited, setOrderComplited] = React.useState(false);
    const [orederId, setOrederId] = React.useState(null);
    // const [isLoading, setIsLoading] = React.useState()


    const getSumOfItems = () => items.length > 1 ? items.reduce((obj, acc) =>  obj + acc.price, 0) : items[0].price;

    const taks = 5; 
    const getTaks = () => Math.floor(getSumOfItems() / 100 * taks);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://631ec1cc22cefb1edc39b06f.mockapi.io/orders', {
                items: cardItems,
            });
            setOrederId(data.id);
            setOrderComplited(true);
            setCardItems([]);
            for (let i = 0; i < cardItems.length; i++) {
                const element = cardItems[i];
                console.log("Tony, ", element.id)
                await axios.delete('https://631ec1cc22cefb1edc39b06f.mockapi.io/cart' + element.id);
                await delay(1000);
            }
        } catch (error) {
            alert("Can't complite your order");
            console.error(error)
        }
        setIsLoading(false);
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : styles.overlay}`}>
            <div className="drawer d-flex flex-column">
                <div className="headerCartPart d-flex justify-between">
                    <h2 className="mb-30">Shopping cart</h2>
                    <Link to='/'>
                        <div className="cu-p rmv-btn" onClick={onClose}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                            </svg>
                        </div>
                    </Link> 
                </div>
                {
                    items.length > 0 ? (
                        <>
                            <div className="bodyCartPart">
                                {
                                    items.map((obj) =>
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: `url(${obj.imgUrl}`}} className="cartItemImg"></div>
                                            <div className="mr-20">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price}$</b>
                                            </div>
                                            <img   className="removeBtn" src="/img/bt-remove.svg" alt="remove button" onClick={() => onRemove(obj)} />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Total:</span>
                                        <div></div>
                                        <b>{getSumOfItems()}$</b>
                                    </li>
                                    <li>
                                        <span>Taks {taks}%</span>
                                        <div></div>
                                        <b>{getTaks()}$</b>
                                    </li>
                                </ul>
                                    <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
                                        Buy<img src="/img/arrow.svg" alt="Arrow" />
                                    </button>
                            </div>
                        </>
                    ) : (
                            <Info 
                                title={ isOrderComplited ? "Order is processed" : "Empty drawer"} 
                                image={ isOrderComplited ? "/img/shopping-done.jpg" : "/img/EmptyDrawer.jpg"} 
                                description={ isOrderComplited ? `Your order is ${orederId}, you'll receive it as soon as possible` : "Add at least one pair of sneakers to make order"}
                            />
                    )
                }
            </div>
        </div>
    )
}; 

export default Drawer;