import { h } from "preact";
import { useState } from "preact/hooks";

const slides = [
  { src: "/images/dummy1.webp", alt: "Slide 1" }, // アップロードした画像のパス
  { src: "/images/dummy2.webp", alt: "Slide 2" }, // 他の画像パス
  { src: "/images/X.webp", alt: "Slide 3" },
];

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div
      class="slideshow-container"
      style={{ position: "relative", "max-width": "600px", margin: "auto" }}
    >
      <button
        onClick={prevSlide}
        style={{ position: "absolute", left: "10px", top: "50%" }}
      >
        &#9664;
      </button>

      {slides.map((slide, index) => (
        <div
          // key={index as any}
          style={{ display: index === currentSlide ? "block" : "none" }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            style={{ width: "100%", "border-radius": "10px" }}
          />
        </div>
      ))}

      <button
        onClick={nextSlide}
        style={{ position: "absolute", right: "10px", top: "50%" }}
      >
        &#9654;
      </button>
    </div>
  );
}