"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const IMAGE_SIZES = "100vw";

type ImageLightboxProps = {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  alt,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const backdropPressedRef = useRef(false);
  const urls = images?.length ? images : [];
  const hasMultiple = urls.length > 1;
  const currentUrl = urls[index];

  const goPrev = useCallback(() => {
    if (urls.length < 2) return;
    setIndex((i) => (i <= 0 ? urls.length - 1 : i - 1));
  }, [urls.length]);
  const goNext = useCallback(() => {
    if (urls.length < 2) return;
    setIndex((i) => (i >= urls.length - 1 ? 0 : i + 1));
  }, [urls.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const scrollContainer = document.querySelector(".main-scroll") as HTMLElement | null;
    const scrollY = scrollContainer?.scrollTop ?? 0;
    document.body.style.overflow = "hidden";
    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.position = "fixed";
      scrollContainer.style.top = `-${scrollY}px`;
      scrollContainer.style.width = "100%";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (scrollContainer) {
        scrollContainer.style.overflow = "";
        scrollContainer.style.position = "";
        scrollContainer.style.top = "";
        scrollContainer.style.width = "";
        scrollContainer.scrollTop = scrollY;
      }
    };
  }, [handleKeyDown]);

  const content = (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal
      aria-label="Galería de imágenes"
    >
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) backdropPressedRef.current = true;
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && backdropPressedRef.current) onClose();
          backdropPressedRef.current = false;
        }}
      >
        {currentUrl ? (
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentUrl}
              alt={`${alt} - imagen ${index + 1}`}
              fill
              sizes={IMAGE_SIZES}
              className="object-contain"
            />
          </div>
        ) : (
          <p className="text-white/70">Sin imágenes</p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            {index + 1} / {urls.length}
          </div>
        </>
      )}

      {currentUrl && (
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4" />
          Abrir en nueva pestaña
        </a>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
