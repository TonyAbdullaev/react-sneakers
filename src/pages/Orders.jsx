import Card from '../components/Cards';

function Favorites(
        {favorites,
        onAddToFavorites,
        onRemove}){

    return ( 
        <div className="content p-40">  
            <div className="mb-40 justify-between d-flex">
                <h1>My favorites</h1>
            </div> 
            <div className="d-flex justify-between flex-wrap">
                {
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
                }
            </div> 
        </div>
    );
};

export default Favorites;