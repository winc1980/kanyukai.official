import { useEffect, useState } from "preact/hooks";

export interface Props {
    src: string;
    width: string;
    height: string;
}

export default function SlideComponent(props: Props[]) {
    const [slidePos, changeSlidePos] = useState(0);

    useEffect(() => {

    }, []);


    return (
        <div class="img_wrapper">
            <div class="slide_wrapper">
                <nav></nav>
            </div>
        </div>
    );
}