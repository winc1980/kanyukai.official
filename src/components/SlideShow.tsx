import { useEffect, useState, useRef } from "preact/hooks";
import { NextIcon, PrevIcon } from "../utils/svgs";
import type { ImageMetadata } from "astro";
import "../scss/top.scss";
import "../scss/slide.scss";

interface Props {
  imgProps: ImageMetadata[];
  showIndicators?: boolean;
  showNextPrevButton?: boolean;
}

export default function SlideComponent({
  imgProps,
  showIndicators = true,
  showNextPrevButton = true,
}: Props) {
  const slideLength = imgProps.length;
  const [slidePos, changeSlidePos] = useState(0);
  const autoPlayInterval = useRef<number | null>(null);

  function nextClick() {
    changeSlidePos((prev) => (prev + 1) % slideLength);
    resetAutoPlayInterval();
  }

  function prevClick() {
    changeSlidePos((prev) => (prev - 1 + slideLength) % slideLength);
    resetAutoPlayInterval();
  }

  function startAutoPlay() {
    autoPlayInterval.current = window.setInterval(nextClick, 3000);
  }

  function resetAutoPlayInterval() {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    startAutoPlay();
  }

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, []);

  function indicatorClicked(indicatorPos: number) {
    changeSlidePos(indicatorPos);
    resetAutoPlayInterval();
  }

  return (
    <div class="slide_wrapper">
      <div>
        <div
          style={{ display: `${showNextPrevButton ? "flex" : "none"}` }}
          class="flex absolute top-3 left-3 z-50"
        >
          <div id="prev" class="prev w-10" onClick={prevClick}>
            <PrevIcon />
          </div>
          <div id="next" class="next ml-5 w-10" onClick={nextClick}>
            <NextIcon />
          </div>
        </div>

        <ul
          class="indicator"
          id="indicator"
          style={{ display: `${showIndicators ? "flex" : "none"}` }}
        >
          {imgProps.map((_, index) => (
            <li
              class="list"
              style={{
                "background-color": `${index === slidePos % slideLength ? "#000" : "#fff"}`,
              }}
              onClick={() => indicatorClicked(index)}
            ></li>
          ))}
        </ul>
      </div>
      <div
        id="slide"
        style={{
          width: `${100 * slideLength}%`,
          transform: `translateX(-${(100 / slideLength) * (slidePos % slideLength)}%)`,
        }}
      >
        {imgProps.map((img, index) => (
          <div>
            <img
              src={img.src}
              width={img.width}
              height={img.height}
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
