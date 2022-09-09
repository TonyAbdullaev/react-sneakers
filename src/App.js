import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';

function App() {
  return (
  <div className="wrapper clear">
    <div style={{display: 'none'}} className="overlay">
      
    </div>
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
        <Card />
      </div> 
    </div>
  </div>
);}

export default App;

