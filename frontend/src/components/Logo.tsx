interface Props { className?: string; gradient?: boolean }

export function Logo({ className = "h-8 w-8", gradient = false }: Props) {
  const stroke = gradient ? "url(#logoGrad)" : "currentColor";
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C2507A" />
          <stop offset="100%" stopColor="#7F3766" />
        </linearGradient>
      </defs>
      {/* leaf */}
      <path
        d="M6 18C6 10 13 5 22 5C22 14 17 20 9 21C7.5 21 6 20 6 18Z"
        stroke={stroke} strokeWidth="1.8" strokeLinejoin="round"
      />
      {/* pulse line */}
      <path
        d="M3 24H10L13 19L17 27L20 23L24 24H30"
        stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
