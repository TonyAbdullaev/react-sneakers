import Card from '../components/Cards';

function Orders(
    {
        favorites,
        onAddToFavorites
    }){

    return ( 
        <div className="content p-40">  
            <div className="mb-40 justify-between d-flex">
                <h1>My favorites</h1>
            </div> 
            <div className="d-flex justify-between flex-wrap">
                {
                    favorites.length > 0 ? 
                        favorites.map((CardProps, index) => (
                            <Card
                                key={index}
                                id={CardProps.id}
                                title={CardProps.title}
                                price={CardProps.price}
                                imgUrl={CardProps.imgUrl}
                                favorited={true}
                                onFavorite={onAddToFavorites}
                            />
                        ))
                     : 
                        <div className='d-flex flex-column emptyOrders align-center'>
                            <img width={150} height={150} src="/img/sad-smile.svg" alt="Sad" />
                            <b>You don't have any orders</b>
                            <p>Are you poor?</p>
                            <p>Add at least one order, please!</p>
                        </div>
                }
            </div> 
        </div>
    );
};

export default Orders;