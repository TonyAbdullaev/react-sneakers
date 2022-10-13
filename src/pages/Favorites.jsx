import React from 'react';

import Card from '../components/Cards';
import AppContext from '../context';

function Favorites() {
    const { favorites, onAddToFavorites } = React.useContext(AppContext);
    
    return ( 
        <div className="content p-40">  
            <div className="mb-40 justify-between d-flex">
                <h1>My favorites</h1>
            </div> 
            <div className="d-flex flex-wrap">
                {
                    favorites.length > 0 ? 
                        (
                            favorites.map((CardProps, index) => (
                                <div className="d-flex mr-40 flex-wrap">
                                    <Card
                                        key={index}
                                        id={CardProps.id}
                                        title={CardProps.title}
                                        price={CardProps.price}
                                        imgUrl={CardProps.imgUrl}
                                        favorited={true}
                                        onFavorite={onAddToFavorites}
                                        //  {...item}
                                    />
                                </div>
                            ))
                        ) : (
                        <div className='d-flex flex-column emptyOrders align-center'>
                            <img width={70} height={70} src="/img/eyes-smile.svg" alt="Sad" />
                            <b>You don't have any orders</b>
                            <p>Are you poor?</p>
                            <p>Add at least one order, please!</p>
                        </div>
                    )
                }
            </div> 
        </div> 
    );
};

export default Favorites;