"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MultipleImages() {
  const images = [
    {
      src: "/images/pets/Graciela_1.jpeg",
      alt: "Graciela, una gatita que dejaron en la calle con solo 2 semanas de vida.",
    },
    {
      src: "/images/pets/Julieta_1.jpeg",
      alt: "Julieta, una perrita rescatada de la calle que estaba perdida y recién había dado crías",
    },
    {
      src: "/images/pets/Lola_1.jpeg",
      alt: "Lola, una perrita muy amorosa",
    },
    {
      src: "/images/pets/Oliver_1.jpeg",
      alt: "Oliver, un gato que fue encontrado en la calle muy chico peleando con una banda de perros.",
    },
    {
      src: "/images/pets/Paco_1.jpeg",
      alt: "Paco, un perro compañero de Oliver",
    },
    {
      src: "/images/pets/Romeo_1.jpeg",
      alt: "Romeo, un perro que fue encontrado en la calle con sus 2 hermanos, fue el único que sobrevivió.",
    },
    {
      src: "/images/pets/Lola_2.jpeg",
      alt: "Lola, una perrita muy amorosa",
    },
    {
      src: "/images/pets/Oliver_2.jpeg",
      alt: "Oliver, un gato que fue encontrado en la calle muy chico peleando con una banda de perros.",
    },
    {
      src: "/images/pets/Walter_1.jpeg",
      alt: "Walter, un gato encontrado en la calle muy lastimado y mal nutrido",
    },
    {
      src: "/images/pets/Paco_2.jpeg",
      alt: "Paco, un perro compañero de Oliver",
    },
  ];

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(1);
  const [nextBottomIndex, setNextBottomIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        // After animation, update indices
        setTopIndex(bottomIndex);
        setBottomIndex(nextBottomIndex);
        setNextBottomIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, [bottomIndex, nextBottomIndex, images.length]);

  return (
    <div className="w-full h-full flex items-center justify-center lg:justify-end">
      <div className="relative w-full max-w-full md:max-w-[520px] lg:max-w-[580px] xl:max-w-[720px] aspect-square">
        {isAnimating && (
          <div
            key={`next-${nextBottomIndex}`}
            className="absolute inset-0 z-[5] w-full h-full opacity-80 rounded-[20px] overflow-hidden animate-[fadeInBottom_600ms_ease-in-out]"
            style={{ transform: "rotate(4deg) scale(0.98)" }}
          >
            <Image
              src={images[nextBottomIndex].src}
              alt={images[nextBottomIndex].alt}
              width={1200}
              height={1200}
              className="rounded-[20px] w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Current bottom - moves to top */}
        <div
          key={`bottom-${bottomIndex}`}
          className={`absolute inset-0 z-[10] w-full h-full overflow-hidden rounded-[20px] transition-none ${
            isAnimating
              ? "animate-[bottomToTop_600ms_ease-in-out_forwards]"
              : ""
          }`}
          style={{
            transform: isAnimating ? undefined : "rotate(4deg) scale(0.98)",
            opacity: isAnimating ? undefined : 0.8,
          }}
        >
          <Image
            src={images[bottomIndex].src}
            alt={images[bottomIndex].alt}
            width={1200}
            height={1200}
            className="rounded-[20px] w-full h-full object-cover"
            priority
          />
        </div>

        {/* Current top - fades out */}
        <div
          key={`top-${topIndex}`}
          className={`absolute inset-0 z-20 w-full h-full overflow-hidden rounded-[20px] ${
            isAnimating ? "animate-[topFadeOut_600ms_ease-in-out_forwards]" : ""
          }`}
        >
          <Image
            src={images[topIndex].src}
            alt={images[topIndex].alt}
            width={1200}
            height={1200}
            className="rounded-[20px] w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
