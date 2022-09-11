import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Cards';

function App() {
  const CardProps = [
    {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 50, imgUrl: '/img/sneakers/blazer.jpg'},
    {title: 'Мужские Кроссовки Nike Air Max 270', price: 45, imgUrl: '/img/sneakers/air max.jpg'},
    {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 45, imgUrl: '/img/sneakers/blazer-white.jpg'},
    {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 50, imgUrl: '/img/sneakers/Aka-boku.jpg'}
  ];
  
  return (
  <div className="wrapper clear">
    <Drawer />
    <Header />
    <div className="content p-40">  
      <div className="mb-40 justify-between d-flex">
        <h1>All shoes</h1>
        <div className="search-block align-baseline">
          <img src="/img/search.svg" alt="search" />
          <input placeholder="Search..."/>
        </div>
      </div>
      
      <div className="d-flex justify-between">
        {
          CardProps.map((CardProps) => (
            <Card 
              title={CardProps.title}
              price={CardProps.price}
              imgUrl={CardProps.imgUrl}
              onClick={() => console.log(CardProps)}
            />
          ))
        }
      </div> 
    </div>
  </div>
);}

export default App;

