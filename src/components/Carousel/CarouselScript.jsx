import { useState } from "preact/hooks";

export default function CarouselScript() {
  useState(() => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-button.next");
    const prevButton = document.querySelector(".carousel-button.prev");
    const slideWidth = slides[0].getBoundingClientRect().width;

    // 配置を調整
    slides.forEach((slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
    });

    let currentIndex = 0;

    const moveToSlide = (index) => {
      const amountToMove = slides[index].style.left;
      track.style.transform = `translateX(-${amountToMove})`;
      currentIndex = index;
    };

    nextButton.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        moveToSlide(currentIndex + 1);
      }
    });

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        moveToSlide(currentIndex - 1);
      }
    });
  });

  return null; // JavaScriptのみのコンポーネント
}
