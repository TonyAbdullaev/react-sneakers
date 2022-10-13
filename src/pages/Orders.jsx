import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import AppContext from '../context';
import Card from '../components/Cards';

function Orders(){
    const {  onAddToFavorites, onAddToCard } = useContext(AppContext);
    const [ordered, setOrdered] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        (async() => {
            try {
                const { data } = await axios.get('https://631ec1cc22cefb1edc39b06f.mockapi.io/orders');
                // to group all ordered sneakers
                setOrdered(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                // option with map func: console.log("order data = ", data.map((obj) => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                alert("Error when setting ordered list");
                console.error(error);
            }
        })();
    }, []);
    return ( 
        <div className="content p-40">  
            <div className="mb-40 justify-between d-flex">
                <h1>My orders</h1>
            </div> 
            <div className="d-flex justify-between flex-wrap">
                {
                    // ordered.length > 0 ? 
                    ( isLoading ? [...Array(12)] : ordered ).map((CardProps, index) => (
                            <Card
                                key={index}
                                loading={isLoading}
                                { ...CardProps }
                            />
                        ))
                    //  : 
                    //     <div className='d-flex flex-column emptyOrders align-center'>
                    //         <img width={150} height={150} src="/img/sad-smile.svg" alt="Sad" />
                    //         <b>You don't have any orders</b>
                    //         <p>Are you poor?</p>
                    //         <p>Add at least one order, please!</p>
                    //     </div>
                }
            </div> 
        </div>
    );
};

export default Orders;