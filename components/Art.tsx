// Hand-drawn SVG illustrations: rath (chariot), temple skyline, emblem, ornaments.
// All original artwork — colours come from CSS variables so the theme stays in one place.

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <g className="wheel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} fill="var(--brown-900)" />
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke="var(--gold)" strokeWidth="5" />
      <circle cx={cx} cy={cy} r={r - 14} fill="none" stroke="var(--saffron)" strokeWidth="2" strokeDasharray="4 5" />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx + (r - 8) * Math.cos((a * Math.PI) / 180)}
          y2={cy + (r - 8) * Math.sin((a * Math.PI) / 180)}
          stroke="var(--gold)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r={11} fill="var(--gold)" />
      <circle cx={cx} cy={cy} r={5} fill="var(--brown-900)" />
    </g>
  );
}

export function Rath({ className = "" }: { className?: string }) {
  const pillars = [72, 148, 252, 328];
  return (
    <svg className={className} viewBox="0 -60 400 400" role="img" aria-label="Illustration of a sacred rath (chariot)">
      {/* halo glow */}
      <circle cx="200" cy="140" r="120" fill="url(#rathGlow)" />
      <defs>
        <radialGradient id="rathGlow">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="roofGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--saffron)" />
        </linearGradient>
      </defs>

      {/* flag */}
      <line x1="200" y1="-6" x2="200" y2="-54" stroke="var(--brown-900)" strokeWidth="3" />
      <path className="flag" d="M200 -54 L246 -44 L200 -30 Z" fill="var(--saffron)" />

      {/* shikhara canopy */}
      <path d="M150 50 C150 20 185 6 200 -2 C215 6 250 20 250 50 Z" fill="url(#roofGrad)" stroke="var(--brown-700)" strokeWidth="2" />
      <path d="M170 50 C172 30 190 16 200 10 C210 16 228 30 230 50" fill="none" stroke="var(--brown-700)" strokeWidth="1.5" opacity=".6" />
      <circle cx="200" cy="-4" r="6" fill="var(--gold)" stroke="var(--brown-700)" strokeWidth="1.5" />
      <path d="M120 72 L140 50 L260 50 L280 72 Z" fill="var(--saffron)" stroke="var(--brown-700)" strokeWidth="2" />
      <path d="M62 98 L96 72 L304 72 L338 98 Z" fill="url(#roofGrad)" stroke="var(--brown-700)" strokeWidth="2" />
      <rect x="48" y="98" width="304" height="16" rx="3" fill="var(--brown-700)" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={60 + i * 21.5} cy={106} r={3.2} fill="var(--gold)" />
      ))}
      {/* hanging bells */}
      {[92, 146, 200, 254, 308].map((x) => (
        <g key={x} className="bell" style={{ transformOrigin: `${x}px 114px` }}>
          <line x1={x} y1={114} x2={x} y2={126} stroke="var(--gold)" strokeWidth="1.5" />
          <path d={`M${x - 5} 132 Q${x} 118 ${x + 5} 132 Z`} fill="var(--gold)" />
        </g>
      ))}

      {/* pillars and arches */}
      {pillars.map((x) => (
        <g key={x}>
          <rect x={x - 5} y={114} width={10} height={88} fill="var(--gold)" stroke="var(--brown-700)" strokeWidth="1.5" />
          <rect x={x - 8} y={196} width={16} height={6} fill="var(--brown-700)" />
          <rect x={x - 8} y={114} width={16} height={6} fill="var(--brown-700)" />
        </g>
      ))}

      {/* deity silhouette with bow, framed by a halo */}
      <circle cx="200" cy="140" r="22" fill="#fff1c1" opacity=".9" />
      <g fill="var(--brown-900)">
        <path d="M191 131 L200 112 L209 131 Z" />
        <circle cx="200" cy="138" r="8.5" />
        <path d="M184 150 Q200 144 216 150 L212 176 L222 200 L178 200 L188 176 Z" />
      </g>
      <path d="M176 116 Q150 158 176 200" fill="none" stroke="var(--brown-900)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="176" y1="116" x2="176" y2="200" stroke="var(--brown-900)" strokeWidth="1" />

      {/* platform */}
      <rect x="36" y="202" width="328" height="42" rx="5" fill="var(--brown-700)" />
      <rect x="36" y="208" width="328" height="7" fill="var(--gold)" />
      <rect x="36" y="232" width="328" height="5" fill="var(--saffron)" />
      <circle cx="200" cy="224" r="12" fill="var(--gold)" stroke="var(--brown-900)" strokeWidth="2" />
      <circle cx="200" cy="224" r="5" fill="var(--saffron)" />
      <path d="M52 244 L348 244 L332 262 L68 262 Z" fill="var(--brown-900)" />

      <Wheel cx={112} cy={272} r={58} />
      <Wheel cx={288} cy={272} r={58} />
    </svg>
  );
}

function shikhara(cx: number, base: number, w: number, h: number) {
  const l = cx - w / 2, r = cx + w / 2, t = base - h;
  return `M${l} ${base} C${l} ${base - h * 0.62} ${cx - w * 0.16} ${t + h * 0.1} ${cx} ${t} C${cx + w * 0.16} ${t + h * 0.1} ${r} ${base - h * 0.62} ${r} ${base} Z`;
}

function Temple({ cx, base, w, h }: { cx: number; base: number; w: number; h: number }) {
  const t = base - h;
  return (
    <g>
      <path d={shikhara(cx, base, w, h)} />
      <ellipse cx={cx} cy={t - 3} rx={w * 0.14} ry={4} />
      <path d={`M${cx - 4} ${t - 6} Q${cx} ${t - 20} ${cx + 4} ${t - 6} Z`} />
      <line x1={cx} y1={t - 14} x2={cx} y2={t - 40} stroke="currentColor" strokeWidth="2" />
      <path className="flag" d={`M${cx} ${t - 40} L${cx + 22} ${t - 34} L${cx} ${t - 27} Z`} fill="var(--saffron)" />
      {/* mandapa */}
      <path d={shikhara(cx - w * 0.72, base, w * 0.55, h * 0.45)} />
      <path d={shikhara(cx + w * 0.72, base, w * 0.55, h * 0.45)} />
    </g>
  );
}

function Chhatri({ cx, base, w }: { cx: number; base: number; w: number }) {
  const ph = w * 0.7;
  return (
    <g>
      <rect x={cx - w / 2} y={base - ph} width={w * 0.12} height={ph} />
      <rect x={cx + w / 2 - w * 0.12} y={base - ph} width={w * 0.12} height={ph} />
      <rect x={cx - w / 2 - 4} y={base - ph - 6} width={w + 8} height={7} />
      <path d={`M${cx - w / 2} ${base - ph - 6} A${w / 2} ${w / 2.2} 0 0 1 ${cx + w / 2} ${base - ph - 6} Z`} />
      <line x1={cx} y1={base - ph - 6 - w / 2.2} x2={cx} y2={base - ph - w / 2.2 - 18} stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* distant layer */}
      <g fill="var(--brown-500)" color="var(--brown-500)" opacity=".55">
        <Temple cx={420} base={230} w={90} h={150} />
        <Chhatri cx={620} base={230} w={60} />
        <Chhatri cx={880} base={230} w={52} />
        <Temple cx={1040} base={230} w={80} h={130} />
        <rect x="0" y="228" width="1440" height="80" />
      </g>
      {/* near layer */}
      <g fill="var(--brown-900)" color="var(--brown-900)">
        <Temple cx={170} base={250} w={130} h={210} />
        <Chhatri cx={330} base={250} w={70} />
        <Chhatri cx={1150} base={250} w={64} />
        <Temple cx={1300} base={250} w={120} h={190} />
        <rect x="0" y="248" width="1440" height="60" />
        {/* arched wall */}
        {Array.from({ length: 36 }, (_, i) => (
          <path key={i} d={`M${i * 40} 250 L${i * 40} 232 Q${i * 40 + 20} 214 ${i * 40 + 40} 232 L${i * 40 + 40} 250 Z`} />
        ))}
      </g>
      <g fill="var(--gold)" opacity=".85">
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={i * 40 + 20} cy={262} r={2.2} />
        ))}
      </g>
    </svg>
  );
}

export function Emblem({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d="M32 2 L35 12 L29 12 Z"
          fill="var(--gold)"
          transform={`rotate(${i * 22.5} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="19" fill="var(--saffron)" stroke="var(--brown-900)" strokeWidth="2" />
      <text x="32" y="41" textAnchor="middle" fontSize="24" fill="var(--cream)" fontFamily="'Tiro Devanagari Hindi', serif">ॐ</text>
    </svg>
  );
}

export function Toran() {
  // Marigold garland strung across the top of the hero.
  const loops = 12;
  return (
    <svg className="toran" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: loops }, (_, i) => {
        const x0 = i * 100;
        const flowers = Array.from({ length: 9 }, (_, k) => {
          const t = k / 8;
          const x = x0 + t * 100;
          const y = 6 + Math.sin(t * Math.PI) * 34;
          return <circle key={k} cx={x} cy={y} r={5.5} fill={k % 2 ? "var(--gold)" : "var(--saffron)"} />;
        });
        return (
          <g key={i}>
            {flowers}
            <g className="tassel" style={{ transformOrigin: `${x0 + 50}px 40px` }}>
              <line x1={x0 + 50} y1={40} x2={x0 + 50} y2={58} stroke="var(--brown-700)" strokeWidth="1.5" />
              <circle cx={x0 + 50} cy={62} r={4} fill="var(--saffron)" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <svg width="64" height="32" viewBox="0 0 64 32">
        <path d="M32 4 C24 12 24 22 32 28 C40 22 40 12 32 4 Z" fill="var(--saffron)" />
        <path d="M32 28 C22 26 14 20 10 12 C20 12 28 18 32 28 Z" fill="var(--gold)" />
        <path d="M32 28 C42 26 50 20 54 12 C44 12 36 18 32 28 Z" fill="var(--gold)" />
      </svg>
      <span />
    </div>
  );
}

export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">
      <path className="diya-flame" d="M24 6 C29 14 28 20 24 22 C20 20 19 14 24 6 Z" fill="var(--gold)" />
      <path d="M24 12 C26 16 26 19 24 20 C22 19 22 16 24 12 Z" fill="#fff6d6" />
      <path d="M6 26 Q24 22 42 26 Q38 40 24 40 Q10 40 6 26 Z" fill="var(--saffron)" />
      <path d="M10 30 Q24 34 38 30" stroke="var(--brown-700)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
