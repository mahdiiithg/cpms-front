'use client';

import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import './ImageSlider.css';

function normalizeSlides(images) {
  return (Array.isArray(images) ? images : [])
    .map((img) => (typeof img === 'string' ? img : img?.url))
    .filter((src) => typeof src === 'string' && src.trim().length > 0);
}

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

function CoverImage({ src, alt, onBroken }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover object-center"
      loading="lazy"
      draggable={false}
      onError={onBroken}
    />
  );
}

/**
 * Full-bleed media for PropertyCard shells.
 * Avoids Ant Carousel/Slick height collapse that left a dark void under photos.
 */
const ImageSlider = ({ images = [], altText = '', containerClass = '' }) => {
  const slides = normalizeSlides(images);
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState(() => new Set());

  useEffect(() => {
    setIndex(0);
    setBroken(new Set());
  }, [slides.join('|')]);

  const usable = slides
    .map((src, i) => ({ src, i }))
    .filter(({ i }) => !broken.has(i));

  const active = usable.length
    ? usable[Math.min(index, usable.length - 1)]
    : null;

  return (
    <div
      className={`cp-image-slider relative h-full w-full overflow-hidden rounded-3xl bg-cp-elevated ${containerClass}`}
    >
      {!active ? (
        <Placeholder altText={altText} />
      ) : (
        <>
          <CoverImage
            key={active.src}
            src={active.src}
            alt={
              slides.length > 1
                ? `${altText || 'Property'} - Image ${active.i + 1}`
                : altText || 'Property image'
            }
            onBroken={() =>
              setBroken((prev) => {
                const next = new Set(prev);
                next.add(active.i);
                return next;
              })
            }
          />

          {usable.length > 1 ? (
            <div className="cp-image-slider__dots" role="tablist" aria-label="Property photos">
              {usable.map((slide, dotIndex) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === Math.min(index, usable.length - 1)}
                  aria-label={`Show photo ${dotIndex + 1}`}
                  className={`cp-image-slider__dot ${
                    dotIndex === Math.min(index, usable.length - 1)
                      ? 'is-active'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex(dotIndex);
                  }}
                />
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ImageSlider;
