import React, { lazy, Suspense } from 'react';

const LazyImageGallery = lazy(() => import('./ImageGallery'));

const ImageGallery = props => (
  <Suspense fallback={null}>
    <LazyImageGallery {...props} />
  </Suspense>
);

export default ImageGallery;
