import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';

describe('<ImageGallery />', () => {
  test('it should mount', () => {
    render(<ImageGallery />);

    const imageGallery = screen.getByTestId('ImageGallery');

    expect(imageGallery).toBeInTheDocument();
  });
});