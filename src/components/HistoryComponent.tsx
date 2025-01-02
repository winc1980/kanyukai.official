import type { Signal } from "@preact/signals";
import Period from "./Period.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { ScrollIcon } from "../utils/svgs.tsx";


// import { getHistory } from "../lib/microcms";
// const response4= await getHistory({ fields: ["id", "year","title","description"] });

const periods: PeriodType[] = [
  {
    year: "1990",
    title: "タイトルタイトル",
    paragraph:
      "若年者ものづくり競技大会とは、互いの技能を競うことで、次世代を担う若年者のものづくりに対する意識や技能向上を目指す大会です。ウェブデザイン職種では毎年違ったテーマのウェブサイト制作が課題として与えられます。競技後にはプレゼンテーションも行います。この大会で上位3位以内に入賞すると、技能五輪国際大会への出場権が得られます。\n \n詳しく知りたい方は、下記のURLから主催団体である中央職業能力協会のWebサイトをご覧になってください。・・・",
  },
  {
    year: "2000",
    title: "タイトルタイトル",
    paragraph:
      "若年者ものづくり競技大会とは、互いの技能を競うことで、次世代を担う若年者のものづくりに対する意識や技能向上を目指す大会です。ウェブデザイン職種では毎年違ったテーマのウェブサイト制作が課題として与えられます。競技後にはプレゼンテーションも行います。この大会で上位3位以内に入賞すると、技能五輪国際大会への出場権が得られます。\n \n詳しく知りたい方は、下記のURLから主催団体である中央職業能力協会のWebサイトをご覧になってください。・・・",
  },
  {
    year: "2010",
    title: "タイトルタイトル",
    paragraph:
      "若年者ものづくり競技大会とは、互いの技能を競うことで、次世代を担う若年者のものづくりに対する意識や技能向上を目指す大会です。ウェブデザイン職種では毎年違ったテーマのウェブサイト制作が課題として与えられます。競技後にはプレゼンテーションも行います。この大会で上位3位以内に入賞すると、技能五輪国際大会への出場権が得られます。\n \n詳しく知りたい方は、下記のURLから主催団体である中央職業能力協会のWebサイトをご覧になってください。・・・",
  },
  {
    year: "2010",
    title: "タイトルタイトル",
    paragraph:
      "若年者ものづくり競技大会とは、互いの技能を競うことで、次世代を担う若年者のものづくりに対する意識や技能向上を目指す大会です。ウェブデザイン職種では毎年違ったテーマのウェブサイト制作が課題として与えられます。競技後にはプレゼンテーションも行います。この大会で上位3位以内に入賞すると、技能五輪国際大会への出場権が得られます。\n \n詳しく知りたい方は、下記のURLから主催団体である中央職業能力協会のWebサイトをご覧になってください。・・・",
  },
  {
    year: "2010",
    title: "タイトルタイトル",
    paragraph:
      "若年者ものづくり競技大会とは、互いの技能を競うことで、次世代を担う若年者のものづくりに対する意識や技能向上を目指す大会です。ウェブデザイン職種では毎年違ったテーマのウェブサイト制作が課題として与えられます。競技後にはプレゼンテーションも行います。この大会で上位3位以内に入賞すると、技能五輪国際大会への出場権が得られます。\n \n詳しく知りたい方は、下記のURLから主催団体である中央職業能力協会のWebサイトをご覧になってください。・・・",
  },
];

export default function HistoryComponent() {
  //windowSizeが変わった時にhistoryComponentの縦横の向きを変えるためのstate
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //historyComponent全体のref
  const historyRef = useRef<HTMLDivElement>(null);
  //scrollのiconのref
  const iconRef = useRef<HTMLDivElement>(null);

  function elementClick() {
    if (historyRef.current) {
      if (iconRef.current) {
        iconRef.current.classList.add("shrinking");

        setTimeout(() => {
          iconRef.current!.classList.remove("shrinking");
        }, 200);
      }
      historyRef.current.scrollBy({
        top:
          windowWidth <= 767
            ? (-historyRef.current.offsetHeight / periods.length) * 1.4
            : 0,
        left:
          windowWidth > 767
            ? (-historyRef.current.offsetWidth / periods.length) * 1.5
            : 0,
        behavior: "smooth",
      });
    }
  }

  function onShrinkClick(index: number) {
    historyRef.current?.scrollTo({
      top:
        windowWidth <= 767
          ? ((index * historyRef.current.offsetHeight) / periods.length) * 1.4
          : 0,
      left:
        windowWidth > 768
          ? (((index == periods.length ? index + 1 : index) *
              historyRef.current.offsetWidth) /
              periods.length) *
            1.5
          : 0,
      behavior: "smooth",
    });
  }

  return (
    <div class="relative">
      <div class="history__wrapper__guide" onClick={elementClick}>
        <div
          class="history__wrapper__guide__icon"
          ref={(el) => (iconRef.current = el)}
        >
          <ScrollIcon />
        </div>
        <h6 class="helvetica_bold">Scroll</h6>
      </div>
      <div class="history__wrapper" ref={(el) => (historyRef.current = el)}>
        <span
          class="history__wrapper__border"
          style={{
            width: `${windowWidth <= 767 ? 4 : periods.length * windowWidth * 0.4}px`,
            height: `${windowWidth <= 767 ? `${0.667 * periods.length * windowWidth}px` : `${0.139}vw`}`,
          }}
        ></span>
        {periods.map((period, index) => (
          <Period
            year={period.year}
            title={period.title}
            paragraph={period.paragraph}
            periodClick={() => onShrinkClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

