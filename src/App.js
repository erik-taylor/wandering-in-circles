import logo from './logo-worldwide.gif';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="title-wrapper">
          <h1>Wandering In Circles</h1>
          <img src={logo} className="app-logo" alt="wandering in circles globe logo" />
        </div>
        <p className="intro-text">From picturesque campsites in national parks to vibrant festivals and charming towns, traveling in an Airstream allows you to immerse yourself in the beauty of diverse landscapes while enjoying the convenience of a well-appointed and stylish mobile abode.</p>        
      <ImageGallery/>
      </header>
    </div>
  );
}

export default App;
