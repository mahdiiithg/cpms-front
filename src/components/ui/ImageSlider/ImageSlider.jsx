'use client';

import { Carousel } from 'antd';
// import './ImageSlider.css';

const ImageSlider = ({ images = [], altText = '', containerClass = '' }) => {
  if (!images.length) return null;

  return (
    <div className={`relative ${containerClass}`}>
      <Carousel
        dots
        arrows
        className="custom-carousel overflow-hidden rounded-3xl"
        effect="fade"
      >
        {images.map((image, index) => (
          <div key={index} className="h-full w-full">
            <img
              src={image}
              alt={`${altText} - Image ${index + 1}`}
              className="h-44 w-full object-cover sm:h-48"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
