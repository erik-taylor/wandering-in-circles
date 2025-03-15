import './ImageGallery.css';
import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cloudinaryBaseUrl = "https://res.cloudinary.com/wanderingincircles/image/upload/";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://res.cloudinary.com/wanderingincircles/image/list/wandering.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data.resources);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="image-gallery">
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4, 2000: 6}}>
        <Masonry>
          {images.map((image) => (
            <div key={image.asset_id} className="image-item">
              <img
                src={`${cloudinaryBaseUrl}fl_lossy,q_auto/f_auto/${image.public_id}.${image.format}`}
                alt={`${image.public_id}`}
                style={{width: "100%", display: "block"}}
                loading="lazy"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ImageGallery;