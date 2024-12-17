import { useEffect } from "preact/hooks";

const ToTop = () => {
    useEffect(() => {
        const footer = document.getElementById('footer');
        const toTop = document.getElementsByClassName('to_top')[0] as HTMLElement;

        if (!footer || !toTop) return;

        const footerHeight = footer.offsetHeight;

        const updatePosition = () => {
            const pos = document.documentElement.scrollHeight - window.scrollY;

            if (pos > window.innerHeight + footerHeight) {
                toTop.style.bottom = "0px";
                toTop.classList.remove("locked");
            } else {
                if (pos > window.innerHeight) {
                    toTop.style.bottom = `${footerHeight - (pos - window.innerHeight)}px`;
                } else {
                    toTop.style.bottom = `${footerHeight}px`;
                    toTop.classList.add("locked");
                }
            }

            if (window.scrollY === 0) {
                toTop.classList.add('fade');
            } else {
                toTop.classList.remove('fade');
            }
        };

        document.addEventListener("scroll", updatePosition);
        updatePosition(); // 初期状態の更新

        return () => document.removeEventListener("scroll", updatePosition); // クリーンアップ
    }, []); // マウント時のみ実行

    return (
        <a class="to_top" href="#header">
            <svg width="100%" height="auto" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.5" x="3" y="3" width="54" height="54" fill="#74C1F5" />
                <path opacity="0.5" d="M7.54606 39.0757C6.48176 40.3903 7.42842 42.3504 9.11976 42.3341L13.5063 42.2918C14.1031 42.2861 14.6662 42.0141 15.0417 41.5501L28.8017 24.5471C29.6021 23.5581 31.1104 23.558 31.9109 24.5469L45.6749 41.5503C46.0504 42.0141 46.6134 42.2861 47.2102 42.2918L51.6309 42.3342C53.3221 42.3505 54.2687 40.3906 53.2046 39.076L31.9315 12.7953C31.1311 11.8065 29.623 11.8064 28.8225 12.7952L7.54606 39.0757Z" fill="#F0F5FD" />
                <rect x="0.5" y="0.5" width="59" height="59" stroke="#51B7F2" />
            </svg>
        </a>
    );
};

export default ToTop;
