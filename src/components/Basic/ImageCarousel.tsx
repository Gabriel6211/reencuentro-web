"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3E🐾 Sin imagen%3C/text%3E%3C/svg%3E";

const IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  /** Set for the LCP image (e.g. first card above the fold) to load eagerly */
  priority?: boolean;
};

export default function ImageCarousel({
  images,
  alt,
  className = "",
  priority = false,
}: ImageCarouselProps) {
  const urls = images ?? [];
  const hasImage = urls.length > 0;
  const multipleImages = urls.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );
  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => queueMicrotask(onSelect);
    sync();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!multipleImages) {
    return (
      <Image
        src={hasImage ? urls[0]! : PLACEHOLDER_IMG}
        alt={alt}
        fill
        sizes={IMAGE_SIZES}
        className={`object-cover object-top ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <div className="group relative h-full w-full">
      <div className={`embla overflow-hidden h-full ${className}`} ref={emblaRef}>
        <div className="embla__container flex h-full touch-pan-y">
          {urls.map((url, i) => (
            <div
              key={i}
              className="embla__slide min-w-0 flex-[0_0_100%] relative"
            >
              <Image
                src={url}
                alt={`${alt} - imagen ${i + 1}`}
                fill
                sizes={IMAGE_SIZES}
                className="object-cover object-top"
                priority={priority && i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/55 text-white flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 touch-manipulation"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/55 text-white flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 touch-manipulation"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5">
        {urls.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              emblaApi?.scrollTo(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-200 touch-manipulation ${
              i === selectedIndex
                ? "w-4 bg-white"
                : "w-1.5 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
