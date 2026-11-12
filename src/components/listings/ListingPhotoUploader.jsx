'use client';

import { useRef } from 'react';
import { Button } from 'antd';
import { ImagePlus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export const MIN_LISTING_PHOTOS = 8;
export const MAX_LISTING_PHOTOS = 11;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
}

/** Downscale large images so demo data-URL payloads stay manageable. */
function compressDataUrl(dataUrl, maxWidth = 1280, quality = 0.72) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      try {
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Gallery picker for seller listings — enforces 8–11 photos.
 * `value` is an array of data URL / http(s) strings.
 */
export default function ListingPhotoUploader({ value = [], onChange }) {
  const inputRef = useRef(null);
  const photos = Array.isArray(value) ? value : [];

  const setPhotos = (next) => {
    onChange?.(next.slice(0, MAX_LISTING_PHOTOS));
  };

  const handleFiles = async (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith('image/'));
    if (!files.length) {
      toast.error('Please choose image files.');
      return;
    }

    const room = MAX_LISTING_PHOTOS - photos.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_LISTING_PHOTOS} photos allowed.`);
      return;
    }

    const selected = files.slice(0, room);
    if (files.length > room) {
      toast.info(`Only ${room} more photo${room === 1 ? '' : 's'} can be added.`);
    }

    try {
      const loaded = [];
      for (const file of selected) {
        const raw = await readFileAsDataUrl(file);
        const compressed = await compressDataUrl(raw);
        loaded.push(compressed);
      }
      setPhotos([...photos, ...loaded]);
    } catch {
      toast.error('Could not read one or more images.');
    }
  };

  const removeAt = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const move = (index, delta) => {
    const next = [...photos];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setPhotos(next);
  };

  const countLabel = `${photos.length} / ${MAX_LISTING_PHOTOS}`;
  const underMin = photos.length < MIN_LISTING_PHOTOS;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm text-cp-subtle">
            Property photos{' '}
            <span className="text-red-400">*</span>
          </p>
          <p className="text-xs text-cp-faint">
            Upload {MIN_LISTING_PHOTOS}–{MAX_LISTING_PHOTOS} images. First photo
            is the cover. Demo stores compressed data URLs in memory.
          </p>
        </div>
        <span
          className={`text-sm font-medium ${
            underMin ? 'text-amber-300' : 'text-cp-lime'
          }`}
        >
          {countLabel}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
          color: '#ffffff',
          WebkitTextFillColor: '#ffffff',
        }}
        onChange={(e) => {
          handleFiles(e.target.files || []);
          e.target.value = '';
        }}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((src, index) => (
          <div
            key={`${index}-${src.slice(0, 32)}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-cp-stroke bg-cp-elevated"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Listing photo ${index + 1}`}
              className="h-full w-full object-cover"
            />
            {index === 0 ? (
              <span className="absolute top-2 left-2 rounded-full bg-cp-lime px-2 py-0.5 text-[10px] font-semibold text-cp-surface">
                Cover
              </span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/55 p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
              <div className="flex gap-1">
                <button
                  type="button"
                  className="rounded bg-white/10 p-1 text-white hover:bg-white/20"
                  onClick={() => move(index, -1)}
                  aria-label="Move left"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  className="rounded bg-white/10 p-1 text-white hover:bg-white/20"
                  onClick={() => move(index, 1)}
                  aria-label="Move right"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                className="rounded bg-red-500/80 p-1 text-white hover:bg-red-500"
                onClick={() => removeAt(index)}
                aria-label="Remove photo"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {photos.length < MAX_LISTING_PHOTOS ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-cp-stroke bg-cp-elevated/60 text-cp-subtle transition hover:border-cp-lime/50 hover:text-cp-lime"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">Add photos</span>
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="default"
          className="!border-cp-stroke !bg-transparent !text-cp-muted hover:!border-cp-lime hover:!text-cp-lime"
          icon={<ImagePlus className="h-4 w-4" />}
          onClick={() => inputRef.current?.click()}
          disabled={photos.length >= MAX_LISTING_PHOTOS}
        >
          Choose images
        </Button>
        {photos.length ? (
          <Button
            type="text"
            className="!text-cp-subtle hover:!text-red-400"
            onClick={() => setPhotos([])}
          >
            Clear all
          </Button>
        ) : null}
      </div>

      {underMin ? (
        <p className="text-sm text-amber-300">
          Add at least {MIN_LISTING_PHOTOS - photos.length} more photo
          {MIN_LISTING_PHOTOS - photos.length === 1 ? '' : 's'} (minimum{' '}
          {MIN_LISTING_PHOTOS}).
        </p>
      ) : null}
    </div>
  );
}
