import React from 'react';
import Card from '../components/Cards';

function Home(
    {
        sneakers,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToCard,
        onAddToFavorites,
        isLoading
    }){
        const renderSneakers = () => {
            const filteredSneakers = sneakers.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
            return ( isLoading ? [...Array(12)] : filteredSneakers).map((CardProps, index) => (
                // return filteredSneakers.map((CardProps, index) => (
                    <Card 
                        key={index} 
                        // id={CardProps.id} // undefined
                        // title={CardProps.title}
                        // price={CardProps.price}
                        // imgUrl={CardProps.imgUrl}
                        onFavorite={(product) => onAddToFavorites(product)}
                        onPlus={(product) => onAddToCard(product)}
                        // addedToDrawer={isSneakersInDrawer(CardProps && CardProps.id)}
                        loading={isLoading}
                        { ...CardProps }
                    />
            ))
        };
        return ( 
            <div className="content p-40">  
                <div className="mb-40 justify-between d-flex">
                    <h1>{searchValue ? `Search by "${searchValue}"` : "All shoes"}</h1>
                    <div className="search-block align-baseline">
                        <img src="/img/search.svg" alt="search" />
                        {searchValue && <img className="clear cu-p" onClick={() => setSearchValue('')} src="/img/bt-remove.svg" alt="remove button" />}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
                    </div>
                </div> 
                <div className="d-flex justify-between flex-wrap">
                    {renderSneakers()}
                </div> 
            </div>
        );
};

export default Home;