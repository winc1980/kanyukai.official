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
      if(windowWidth <= 767){
        setYCoord(rect.top);
      }else {
        setXCoord(rect.left);
      }
    }

    const parent = period.parentElement;
    if (parent) {
      if (windowWidth <= 767) {
        parent.addEventListener("scroll", updateCoord);
      } else {
        parent.addEventListener("scroll", updateCoord);
      }
    }

    const observer = new ResizeObserver(updateCoord,);
    observer.observe(period);

    updateCoord();

    return () => {
      if (parent) {
        updateCoord();
      }
      observer.disconnect();
    };
  }, []);

  console.log(yCoord);
  console.log(windowWidth);

  return (
    <div
    ref={(el) => {
      periodRef.current = el;
    }}
      id="period"
      class="p-period"
    >
      {(windowWidth > 767 && xCoord < 400 && xCoord > 50) ||
      (windowWidth <= 767 && (yCoord < 1150 && yCoord > 1050)) ? (
        <div class="p-period__detail">
          <h3 class="p-period__detail__year">{year}</h3>
          <h4 class="p-period__detail__title">{title}</h4>
          <p>{paragraph}</p>
        </div>
      ) : (
        <div class="period_wrapper" onClick={periodClick}>
          <span class="left_circle"></span>
          <p class="date">{year}</p>
          <span class="right_circle"></span>
          <p class="title">{title}</p>
        </div>
      )}
    </div>
  );
}

