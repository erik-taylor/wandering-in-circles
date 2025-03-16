import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="title-wrapper">
          <h1 className="countryside">Wandering In Circles</h1>
          <img src="caravan.svg" className="caravan-logo" alt="airstream caravan logo" style={{width: '175px', height: 'auto'}} />
        </div>
        <p className="intro-text">From picturesque campsites in national parks to vibrant festivals and charming towns, traveling in an Airstream allows you to immerse yourself in the beauty of diverse landscapes while enjoying the convenience of a well-appointed and stylish mobile abode.</p>        
      
      </header>
        <ImageGallery/>
      <footer>
      <a href="https://www.flaticon.com/free-animated-icons/caravan" title="caravan animated icons">Caravan animated icons created by Freepik - Flaticon</a>
      </footer>
    </div>
  );
}

export default App;
