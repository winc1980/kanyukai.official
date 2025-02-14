import "../scss/chAward.scss";
import type { Award } from "../pages/awards.astro";
import SlideComponent from "./SlideShow";

const medalColorClass = {
  金: 'bg-yellow-500',  // 金メダル
  銀: 'bg-gray-400',    // 銀メダル
  銅: 'bg-orange-600',  // 銅メダル
  その他: 'bg-gray-300', // それ以外
};
const getMedalColor = (medalcolor: string) => medalColorClass[medalcolor] || medalColorClass["その他"];
export default function ChAward({ date, tags, title, content, images, medalcolor }: Award & { medalcolor: string }) {

  return (
    <div class="ch__award">
      <div class="ch__award__top">
        <div class="ch__award__top__left">
          <span class={`medalspan ${getMedalColor(medalcolor)}`}></span>
          <div>
            <h5 class="ch__award__top__left__date zenkaku_light">{date}</h5>
            <h4 class="ch__award__top__left__title zenkaku_normal">{title}</h4>
          </div>
        </div>
        <div class="ch__award__top__right">
          {tags.map((tag: string) => (
            <span>{`#${tag}`}</span>
          ))}
        </div>
      </div>
      <div class="ch__award__main">
        {!images || images.length !== 1 ? (
          <div class="ch__award__main__description">
            <p>{content}</p>
            <div class="ch__award__main__description__img__wrapper">
              <SlideComponent imgProps={images} />
            </div>
          </div>
        ) : (
          <div class="ch__award__main__fewImgContainer">
            <p>{content}</p>

            {images[0] && (
              <div class="ch__award__main__fewImgContainer__imgs">
                <img src={images[0].src} />
                <div style={`background-image: url(${images[0].src});`}></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
