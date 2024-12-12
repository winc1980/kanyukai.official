import { useEffect, useRef, useState } from "preact/hooks";

interface periodProps {
  title: string;
  year: string;
  paragraph: string;
  isDetail: boolean;
  periodClick: () => void;
}

export default function Period({
  title,
  year,
  paragraph,
  periodClick,
}: periodProps) {
  const periodRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const period = periodRef.current;
    if (!period) return;
  
    const updateCoord = () => {
      const rect = period.getBoundingClientRect();
      if (windowWidth <= 767) {
        setYCoord(rect.top);
      } else {
        setXCoord(rect.left);
      }
    };
  
    const parent = period.parentElement;
    if (parent) {
      parent.addEventListener("scroll", updateCoord);
    }
  
    const observer = new ResizeObserver(updateCoord);
    observer.observe(period);
  
    // 初期化
    updateCoord();
  
    return () => {
      if (parent) {
        parent.removeEventListener("scroll", updateCoord);
      }
      observer.disconnect();
    };
  }, [windowWidth]);
  

  console.log("xCoord:", xCoord, "yCoord:", yCoord);

  return (
    <div
    ref={(el) => {
      periodRef.current = el;
    }}
      id="period"
      class="p-period"
    >
      {(windowWidth > 767 && xCoord < 500 && xCoord >= 0) ||
      (windowWidth <= 767 && (yCoord < 1150 && yCoord > 750)) ? (
        <div class="p-period__detail">
          <h3 class="p-period__detail__year">{year}</h3>
          <h4 class="p-period__detail__title">{title}</h4>
          <p>{paragraph}</p>
        </div>
      ) : (
        <div class="p-period__shrink" onClick={periodClick}>
          <span class="p-period__shrink__left__circle"></span>
          <h2 class="p-period__shrink__date">{year}</h2>
          <span class="p-period__shrink__right__circle"></span>
          <h5 class="p-period__shrink__title">{title}</h5>
        </div>
      )}
    </div>
  );
}

