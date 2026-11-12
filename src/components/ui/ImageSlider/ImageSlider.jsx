'use client';

import { useState } from 'react';
import { Carousel } from 'antd';
import { ImageOff } from 'lucide-react';
import './ImageSlider.css';

function Placeholder({ altText }) {
  return (
    <div
      className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-cp-elevated text-cp-subtle"
      role="img"
      aria-label={altText ? `${altText} placeholder` : 'Image unavailable'}
    >
      <ImageOff className="h-8 w-8 text-cp-faint" aria-hidden />
      <span className="px-3 text-center text-xs text-cp-faint">
        Image unavailable
      </span>
    </div>
  );
}

function SlideImage({ src, alt }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return <Placeholder altText={alt} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover object-center"
      loading="lazy"
      draggable={false}
      onError={() => setBroken(true)}
    />
  );
}

/**
 * Fills its parent (typically an aspect-ratio media shell on PropertyCard).
 * Ant Carousel/Slick needs an explicit height chain or slides collapse to
 * min-content and leave a dark void under the photo.
 */
const ImageSlider = ({ images = [], altText = '', containerClass = '' }) => {
  const slides = (Array.isArray(images) ? images : [])
    .map((img) => (typeof img === 'string' ? img : img?.url))
    .filter((src) => typeof src === 'string' && src.trim().length > 0);

  return (
    <div
      className={`cp-image-slider relative h-full w-full overflow-hidden rounded-3xl bg-cp-elevated ${containerClass}`}
    >
      {slides.length === 0 ? (
        <Placeholder altText={altText} />
      ) : slides.length === 1 ? (
        <div className="absolute inset-0">
          <SlideImage src={slides[0]} alt={altText || 'Property image'} />
        </div>
      ) : (
        <Carousel
          dots
          arrows={false}
          effect="scrollx"
          className="cp-image-slider__carousel custom-carousel"
        >
          {slides.map((image, index) => (
            <div key={`${image}-${index}`} className="cp-image-slider__slide">
              <div className="cp-image-slider__frame">
                <SlideImage
                  src={image}
                  alt={`${altText || 'Property'} - Image ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ImageSlider;
