import { Image } from "astro:assets";
import image1 from "../assets/image 1.png";
import { signal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import image2 from "../assets/sample.jpg";

// 初期画像の src を設定
let initialImage = image1.src;

export default function TopContent() {
  const pos = signal as unknown as Signal<number>;

  const leftClick = () => {
    pos.value -= 1;
    initialImage = image1.src;
  };

  const rightClick = () => {
    pos.value += 1;
    initialImage = image2.src;
  };

  const slide = document.getElementById("slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const indicator = document.getElementById("indicator");
  const lists = document.querySelectorAll(".list");
  const totalSlides = lists.length;
  let count = 0;
  let autoPlayInterval;
  function updateListBackground() {
    for (let i = 0; i < lists.length; i++) {
      lists[i].style.backgroundColor =
        i === count % totalSlides ? "#000" : "#fff";
    }
  }
  function nextClick() {
    slide.classList.remove(`slide${(count % totalSlides) + 1}`);
    count++;
    slide.classList.add(`slide${(count % totalSlides) + 1}`);
    updateListBackground();
  }
  function prevClick() {
    slide.classList.remove(`slide${(count % totalSlides) + 1}`);
    count--;
    if (count < 0) count = totalSlides - 1;
    slide.classList.add(`slide${(count % totalSlides) + 1}`);
    updateListBackground();
  }
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextClick, 3000);
  }
  function resetAutoPlayInterval() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  next.addEventListener("click", () => {
    nextClick();
    resetAutoPlayInterval();
  });
  prev.addEventListener("click", () => {
    prevClick();
    resetAutoPlayInterval();
  });
  indicator.addEventListener("click", (event) => {
    if (event.target.classList.contains("list")) {
      const index = Array.from(lists).indexOf(event.target);
      slide.classList.remove(`slide${(count % totalSlides) + 1}`);
      count = index;
      slide.classList.add(`slide${(count % totalSlides) + 1}`);
      updateListBackground();
      resetAutoPlayInterval();
    }
  });
  startAutoPlay();
  return (
    <div class="top_content">
      <div class="left_content">
        <h1>Enjoy with us!</h1>
        <div class="join_link">
          <div class="link_content">
            <a>Join us!</a>
            <svg
              width="36"
              height="9"
              viewBox="0 0 36 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="8.5" x2="36" y2="8.5" stroke="black" />
              <line
                x1="35.738"
                y1="8.42583"
                x2="22.738"
                y2="0.425829"
                stroke="black"
              />
            </svg>
          </div>
          <div class="bg_link"></div>
        </div>
      </div>
      <div class="right_content">
        <div class="img_wrapper">
          {/* <div>
                        <svg onClick={leftClick} class="left" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1L1 6L9 11" stroke="black" />
                        </svg>
                        <svg onClick={rightClick} class="right" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L9 6L1 11" stroke="black" />
                        </svg>
                    </div> */}
          <div class="slide-wrapper">
            <div class="slide" id="slide">
              <div>
                <p>スライド１</p>
              </div>
              <div>
                <p>スライド２</p>
              </div>
              <div>
                <p>スライド３</p>
              </div>
              <span id="prev" class="prev"></span>
              <span id="next" class="next"></span>

              <ul class="indicator" id="indicator">
                <li class="list"></li>
                <li class="list"></li>
                <li class="list"></li>
              </ul>
            </div>
          </div>

          {/* <Image width={817} height={616} src={initialImage} alt="image1" style="width: 100%; height: auto;" /> */}
        </div>
      </div>
    </div>
  );
}

<script></script>;
