'use client';

import { useState } from 'react';
import { Carousel } from 'antd';
import { ImageOff } from 'lucide-react';

function Placeholder({ altText }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cp-elevated text-cp-subtle"
      role="img"
      aria-label={altText ? `${altText} placeholder` : 'Image unavailable'}
    >
      <ImageOff className="h-8 w-8 text-cp-faint" aria-hidden />
      <span className="px-3 text-center text-xs text-cp-faint">Image unavailable</span>
    </div>
  );
}

function SlideImage({ src, alt }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return <Placeholder altText={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

const ImageSlider = ({ images = [], altText = '', containerClass = '' }) => {
  const slides = Array.isArray(images) ? images.filter(Boolean) : [];

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-3xl bg-cp-elevated ${containerClass}`}
    >
      {slides.length === 0 ? (
        <Placeholder altText={altText} />
      ) : (
        <Carousel
          dots={slides.length > 1}
          arrows={slides.length > 1}
          className="custom-carousel !h-full [&_.slick-list]:!h-full [&_.slick-track]:!h-full [&_.slick-slide]:!h-full [&_.slick-slide>div]:!h-full"
          effect="fade"
        >
          {slides.map((image, index) => (
            <div key={`${image}-${index}`} className="relative h-full min-h-[11rem] w-full sm:min-h-[12rem]">
              <SlideImage src={image} alt={`${altText} - Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ImageSlider;
