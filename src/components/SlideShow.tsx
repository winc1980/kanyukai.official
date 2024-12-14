import { useEffect, useState, useRef } from "preact/hooks";
import { NextIcon, PrevIcon } from "../utils/svgs";
import type { ImageMetadata } from "astro";
import "../scss/top.scss";
import "../scss/slide.scss";
import type { RefObject } from "preact";

interface Props {
  imgProps: ImageMetadata[];
  showIndicators?: boolean;
  showNextPrevButton?: boolean;
  showProgressBar?: boolean;
}

export default function SlideComponent({
  imgProps,
  showIndicators = true,
  showNextPrevButton = true,
  showProgressBar = false,
}: Props) {
  const slideLength = imgProps.length;
  const [slidePos, changeSlidePos] = useState(0);
  const [progress, setProgress] = useState(0);

  const autoPlayInterval = useRef<number | null>(null);
  const duration = 3000;

  function nextClick() {
    changeSlidePos((prev) => (prev + 1) % slideLength);
    resetAutoPlayInterval();
  }

  function startAutoPlay() {
    autoPlayInterval.current = window.setInterval(nextClick, duration);
  }

  function resetAutoPlayInterval() {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    setProgress(0);
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

  useEffect(() => {
    const interval = 10;
    const step = (100 / duration) * interval;
  
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 0;
        }
        return prev + step;
      });
    }, interval);
  
    return () => clearInterval(timer); 
  }, [slidePos]); 
  

  const prevRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  function skipIconClick(iconRef: RefObject<HTMLSpanElement>) {
    if (iconRef.current) {
      iconRef.current.classList.add("shrink");

      setTimeout(() => {
        iconRef.current!.classList.remove("shrink");
      }, 200);
    }
  }

  function nextButtonClick() {
    changeSlidePos((prev) => (prev + 1) % slideLength);
    skipIconClick(nextRef);
    resetAutoPlayInterval();
  }

  function prevButtonClick() {
    changeSlidePos((prev) => (prev - 1 + slideLength) % slideLength);
    skipIconClick(prevRef);
    resetAutoPlayInterval();
  }

  const slideRef = useRef<HTMLDivElement>(null);
  if(prevRef.current && nextRef.current && !showProgressBar && slideRef.current){
    prevRef.current.style.top = `${slideRef.current.offsetHeight/2 - prevRef.current.offsetHeight/2}px`;
    nextRef.current.style.top = `${slideRef.current.offsetHeight/2 - nextRef.current.offsetHeight/2}px`;
    prevRef.current.style.left = `-${prevRef.current.offsetWidth/2}px`;
    nextRef.current.style.right = `-${nextRef.current.offsetWidth/2}px`;
  }

  return (
    <div class="slide_component" ref={(el) => slideRef.current = el}>
      {showProgressBar ? (
        <>
          <div class="slide_component__navigation">
            <h6 class="left">1</h6>
            <div class="slide_component__navigation__progress">
              <span
                class="h-full bg-black"
                style={{ width: `${progress}%` }}
              ></span>
            </div>
            <h6 class="right">{imgProps.length}</h6>
            <div
              style={{ display: `${showNextPrevButton ? "flex" : "none"}` }}
              class="slide_component__navigation__skip z-50"
            >
              <div
                id="prev"
                class="prev__custom"
                onClick={prevButtonClick}
                ref={(el) => (prevRef.current = el)}
              >
                <PrevIcon />
              </div>
              <div
                id="next"
                class="next__custom"
                onClick={nextButtonClick}
                ref={(el) => (nextRef.current = el)}
              >
                <NextIcon/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{ display: `${showNextPrevButton ? "flex" : "none"}` }}
            class="slide_wrapper__skip z-50"
          >
            <div
              id="prev"
              class="prev"
              onClick={prevButtonClick}
              ref={(el) => (prevRef.current = el)}
            >
              <PrevIcon />
            </div>
            <div
              id="next"
              class="next"
              onClick={nextButtonClick}
              ref={(el) => (nextRef.current = el)}
            >
              <NextIcon/>
            </div>
          </div>
        </>
      )}

      <div class="slide_wrapper">
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
                width={'100%'}
                height={'auto'}
                loading="eager"
                alt={img.src}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
