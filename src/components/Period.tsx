interface periodProps{
    title: string;
    year: string;
    paragraph: string;
    isDetail: boolean
    periodClick: () => void;
}

export default function Period({title, year, isDetail,paragraph, periodClick}: periodProps) {

    return (
       (isDetail ? (
            <div className="detail_container">
                <div className="year">{year}</div>
                <div className="title">{title}</div>
                <p>{paragraph}</p>
                <div className="bg"></div>
            </div>
        ): (
            (Number(year) ? (
            <>
                <div class="period_wrapper" onClick={periodClick}>
                    <span class="left_circle"></span>
                        <p className="date">{year}</p>
                        <span class="right_circle"></span>
                    <p className="title">{title}</p>
                </div>
            </>
            ): (
                <>
                <div class="mini_period_wrapper" onClick={periodClick}>
                    <span></span>
                    <p className="date">{year}</p>
                    <p className="title">{title}</p>
                </div>
                </>
            ))
            
        )
        )
    );
}
