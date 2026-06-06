export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoLeafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#6BAE75" />
        </linearGradient>
      </defs>
      <path
        d="M16 4C10 4 6 9 6 15C6 21 10 26 16 28C22 26 26 21 26 15C26 9 22 4 16 4Z"
        stroke="url(#logoLeafGrad)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 10V18"
        stroke="#C17B4E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 16H22"
        stroke="#C17B4E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 24H9L12 19L15 27L18 22L22 24H28"
        stroke="#FF4C6A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
