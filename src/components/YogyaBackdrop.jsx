// The original Figma background is a set of exported illustration PNGs (Tugu
// Jogja monument, a pendopo pavilion, clouds, birds) that this sandbox could not
// download. This is a lightweight SVG silhouette in the same spirit/palette —
// swap for the real artwork in src/assets when you have it.
export default function YogyaBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-red-900">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {/* Tugu Jogja monument, left */}
        <g fill="#fff">
          <rect x="150" y="560" width="10" height="220" />
          <rect x="120" y="500" width="70" height="60" rx="4" />
          <polygon points="155,380 200,500 110,500" />
          <rect x="140" y="360" width="30" height="24" />
          <circle cx="155" cy="350" r="10" />
        </g>
        {/* Pendopo / joglo roof, right */}
        <g fill="#fff">
          <polygon points="1180,560 1440,560 1400,460 1220,460" />
          <polygon points="1220,460 1400,460 1360,400 1260,400" />
          <rect x="1200" y="560" width="14" height="140" />
          <rect x="1280" y="560" width="14" height="140" />
          <rect x="1360" y="560" width="14" height="140" />
          <rect x="1420" y="560" width="14" height="140" />
        </g>
        {/* rolling hills */}
        <path d="M0 780 Q 360 700 720 780 T 1440 780 V900 H0 Z" fill="#fff" opacity="0.5" />
        {/* clouds */}
        <g fill="#fff" opacity="0.7">
          <path d="M260 120 q20-24 44-10 q10-20 34-14 q22 4 20 26 q18 6 10 24 h-96 q-16-4-12-26z" />
          <path d="M1080 90 q16-20 38-8 q8-16 28-12 q18 4 16 22 q14 6 8 20 h-82 q-14-4-8-22z" />
        </g>
        {/* birds */}
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M1250 180 q10-10 20 0 q10-10 20 0" />
          <path d="M1300 210 q8-8 16 0 q8-8 16 0" />
        </g>
      </svg>
    </div>
  );
}
