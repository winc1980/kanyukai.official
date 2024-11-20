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
  isDetail,
  paragraph,
  periodClick,
}: periodProps) {
  return isDetail ? (
    <div class="detail_container">
      <div class="year">{year}</div>
      <div class="title">{title}</div>
      <p>{paragraph}</p>
      <div class="bg"></div>
    </div>
  ) : Number(year) ? (
    <>
      <div class="period_wrapper" onClick={periodClick}>
        <span class="left_circle"></span>
        <p class="date">{year}</p>
        <span class="right_circle"></span>
        <p class="title">{title}</p>
      </div>
    </>
  ) : (
    <>
      <div class="mini_period_wrapper" onClick={periodClick}>
        <span></span>
        <p class="date">{year}</p>
        <p class="title">{title}</p>
      </div>
    </>
  );
}
