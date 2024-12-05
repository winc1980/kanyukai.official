export const BigUnderline = () => {
    return (
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
    );
}

export function PrevIcon() {
    return (
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 6L9 11" stroke="black"/>
        </svg>
    );
}

export function NextIcon() {
    return (
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 6L1 11" stroke="black"/>
        </svg>
    );
}