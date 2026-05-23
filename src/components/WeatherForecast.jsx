import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Umbrella,
  Wind,
  Thermometer,
  Sparkles,
} from 'lucide-react';

// Mýto pod Ďumbierom — village center, ~Stodola Pohanské
const LAT = 48.8485;
const LON = 19.6275;
const WEDDING_DATE_STR = '2026-05-30';
const CEREMONY_HOUR = 15;

// Open-Meteo WMO weather codes → label + icon + intent
const codeMap = (code) => {
  if (code === 0) return { label: 'Slnečno', Icon: Sun, kind: 'sun' };
  if (code === 1) return { label: 'Prevažne slnečno', Icon: Sun, kind: 'sun' };
  if (code === 2) return { label: 'Čiastočne oblačno', Icon: Cloud, kind: 'cloud' };
  if (code === 3) return { label: 'Zamračené', Icon: Cloud, kind: 'cloud' };
  if (code === 45 || code === 48) return { label: 'Hmla', Icon: CloudFog, kind: 'fog' };
  if ([51, 53, 55, 56, 57].includes(code))
    return { label: 'Mrholenie', Icon: CloudDrizzle, kind: 'rain' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { label: 'Dážď', Icon: CloudRain, kind: 'rain' };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: 'Sneženie', Icon: CloudSnow, kind: 'snow' };
  if ([95, 96, 99].includes(code))
    return { label: 'Búrky', Icon: CloudLightning, kind: 'storm' };
  return { label: 'Neznáme', Icon: Cloud, kind: 'cloud' };
};

// Pick the visual mood — driven by real conditions, biased toward positive vibes.
const pickMood = ({ kind, precipProb, windMax, cloudCover }) => {
  if (kind === 'storm' || precipProb >= 70) return 'rain';
  if (windMax >= 40) return 'wind';
  if (cloudCover >= 75) return 'overcast';
  if (cloudCover >= 35 || kind === 'cloud') return 'sunny-cloudy';
  return 'sunny';
};

const buildAdvice = ({ tMin, tMax, precipProb, precipMm, windMax, kind }) => {
  const tips = [];

  if (kind === 'storm' || precipProb >= 60 || precipMm >= 4) {
    tips.push({ Icon: Umbrella, text: 'Vezmite si dáždnik – očakávame zrážky' });
  } else if (precipProb >= 30) {
    tips.push({ Icon: Umbrella, text: 'Dáždnik pre istotu odporúčame' });
  }

  if (tMin <= 12) {
    tips.push({ Icon: Thermometer, text: 'Sako alebo ľahká bunda na večer' });
  } else if (tMin <= 15) {
    tips.push({ Icon: Thermometer, text: 'Šál či sako sa večer zídu' });
  }

  if (tMax >= 26) {
    tips.push({ Icon: Sun, text: 'Slnko bude silné – krém a voda' });
  } else if (tMax >= 22 && (kind === 'sun' || kind === 'cloud')) {
    tips.push({ Icon: Sparkles, text: 'Príjemné teplo – ideálne počasie' });
  }

  if (windMax >= 35) {
    tips.push({ Icon: Wind, text: 'Vetrno – pozor na klobúky a účes' });
  }

  if (precipMm >= 1 || tMin <= 14) {
    tips.push({
      Icon: Sparkles,
      text: 'Tráva pri stodole môže byť vlhká – nízke podpätky výhoda',
    });
  }

  if (tips.length === 0) {
    tips.push({ Icon: Sparkles, text: 'Počasie vyzerá nádherne – užijeme si ho naplno' });
  }

  return tips.slice(0, 3);
};

// Encouraging message — always hopeful for sun, regardless of forecast.
// Keyed off `kind` first (matches the label shown), then sharpened with cloudCover/precipProb.
const getEncouragement = ({ label, kind, precipProb, cloudCover }) => {
  if (kind === 'storm') {
    return 'Búrka v predpovedi? Ešte je čas — veríme, že sa to do soboty zmení a slnko si nás nájde.';
  }
  if (kind === 'rain' || precipProb >= 70) {
    return 'Predpoveď zatiaľ spomína dážď, no ešte sa to môže obrátiť — dúfame, že sa nakoniec ukáže slniečko.';
  }
  if (kind === 'snow') {
    return 'Sneh v máji? To by bola raritka — veríme, že sa do soboty otepľuje a slnko si nás nájde.';
  }
  if (kind === 'fog') {
    return 'Hmla v predpovedi, no veríme, že sa do obeda rozplynie a vykukne slniečko.';
  }
  if (label === 'Zamračené' || cloudCover >= 75) {
    return 'Hoci teraz píše zamračené, veríme, že na poslednú chvíľu vykukne slniečko.';
  }
  if (label === 'Čiastočne oblačno' || kind === 'cloud') {
    return 'Píše čiastočne oblačno, ale veríme, že vykukne aj slniečko!';
  }
  if (kind === 'sun') {
    return 'Zdá sa, že nás čaká nádherný slnečný deň!';
  }
  return 'Držíme palce, aby sa pre nás obloha do soboty rozjasnila.';
};

// ---------- Animated background ----------

const Sky = ({ mood }) => {
  const gradient =
    mood === 'rain'
      ? 'linear-gradient(180deg, #b8c6d1 0%, #d4dbe2 55%, #e9eef3 100%)'
      : mood === 'wind'
        ? 'linear-gradient(180deg, #cfdee8 0%, #e3eaf0 55%, #f3f6f9 100%)'
        : mood === 'overcast'
          ? 'linear-gradient(180deg, #d8dee5 0%, #e6e9ed 55%, #f1f3f5 100%)'
          : mood === 'sunny'
            ? 'linear-gradient(180deg, #ffe9b6 0%, #fff3d2 35%, #fff9ea 70%, #fdfaf3 100%)'
            : 'linear-gradient(180deg, #dbe9f1 0%, #f1ecdf 70%, #fdf8ec 100%)';

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: gradient }}
    />
  );
};

const SunStage = ({ intense = false, dimmed = false }) => (
  <div
    aria-hidden="true"
    className="absolute pointer-events-none"
    style={{
      top: '-4%',
      right: '-2%',
      width: '420px',
      height: '420px',
      opacity: dimmed ? 0.55 : 1,
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at center, rgba(255, 224, 150, 0.55) 0%, rgba(255, 224, 150, 0.18) 35%, rgba(255, 224, 150, 0) 70%)',
        filter: 'blur(14px)',
        animation: 'sunBreath 9s ease-in-out infinite',
      }}
    />
    <div
      className="absolute inset-[18%]"
      style={{
        background:
          'conic-gradient(from 0deg, rgba(255,210,120,0.0) 0deg, rgba(255,210,120,0.18) 8deg, rgba(255,210,120,0) 16deg, rgba(255,210,120,0) 45deg, rgba(255,210,120,0.16) 53deg, rgba(255,210,120,0) 61deg, rgba(255,210,120,0) 90deg, rgba(255,210,120,0.18) 98deg, rgba(255,210,120,0) 106deg, rgba(255,210,120,0) 135deg, rgba(255,210,120,0.16) 143deg, rgba(255,210,120,0) 151deg, rgba(255,210,120,0) 180deg, rgba(255,210,120,0.18) 188deg, rgba(255,210,120,0) 196deg, rgba(255,210,120,0) 225deg, rgba(255,210,120,0.16) 233deg, rgba(255,210,120,0) 241deg, rgba(255,210,120,0) 270deg, rgba(255,210,120,0.18) 278deg, rgba(255,210,120,0) 286deg, rgba(255,210,120,0) 315deg, rgba(255,210,120,0.16) 323deg, rgba(255,210,120,0) 331deg)',
        borderRadius: '50%',
        filter: 'blur(8px)',
        animation: 'sunSpin 140s linear infinite',
        opacity: intense ? 0.85 : 0.55,
        maskImage:
          'radial-gradient(circle, black 30%, rgba(0,0,0,0.7) 50%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(circle, black 30%, rgba(0,0,0,0.7) 50%, transparent 75%)',
      }}
    />
    <div
      className="absolute"
      style={{
        top: '38%',
        left: '38%',
        width: '24%',
        height: '24%',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 35% 35%, #fff4cc 0%, #ffd97a 45%, #f4b94a 100%)',
        boxShadow:
          '0 0 60px rgba(255, 200, 100, 0.55), 0 0 140px rgba(255, 200, 100, 0.25)',
        opacity: intense ? 1 : 0.92,
      }}
    />
    <div
      className="absolute"
      style={{
        top: '42%',
        left: '42%',
        width: '6%',
        height: '6%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
        animation: 'sunBreath 6s ease-in-out infinite',
      }}
    />
  </div>
);

const CloudShape = ({ tone = 'light' }) => {
  const fill = tone === 'dark' ? '#cfd6dd' : '#ffffff';
  const fillSoft = tone === 'dark' ? '#dde2e8' : '#fbfcfd';
  return (
    <svg width="220" height="100" viewBox="0 0 220 100" fill="none">
      <defs>
        <filter id={`cloudSoft-${tone}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter={`url(#cloudSoft-${tone})`}>
        <ellipse cx="110" cy="72" rx="95" ry="20" fill={fillSoft} opacity="0.65" />
        <ellipse cx="60" cy="62" rx="40" ry="28" fill={fill} />
        <ellipse cx="100" cy="50" rx="46" ry="34" fill={fill} />
        <ellipse cx="148" cy="58" rx="42" ry="30" fill={fill} />
        <ellipse cx="178" cy="68" rx="32" ry="22" fill={fill} />
        <ellipse cx="92" cy="42" rx="28" ry="14" fill="#ffffff" opacity="0.55" />
        <ellipse cx="142" cy="48" rx="22" ry="11" fill="#ffffff" opacity="0.45" />
      </g>
    </svg>
  );
};

const DriftingCloud = ({
  top,
  startLeft = '-20%',
  scale = 1,
  duration = 100,
  delay = 0,
  opacity = 0.7,
  tone = 'light',
  blur = 0,
}) => (
  <div
    aria-hidden="true"
    className="absolute pointer-events-none will-change-transform"
    style={{
      top,
      left: startLeft,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      animation: `cloudDrift ${duration}s linear ${delay}s infinite`,
      opacity,
      filter: blur ? `blur(${blur}px)` : undefined,
    }}
  >
    <CloudShape tone={tone} />
  </div>
);

// Build a list of cloud configs whose count + density tracks actual cloud cover.
// Cover% maps roughly linearly to count so 33% clouds *looks* like 33% clouds.
const buildClouds = (cloudCover, mood) => {
  // base count scales linearly: 0% → 1, 100% → 16
  // (rain mood gets a bonus so the sky reads "stormy" even at lower covers)
  const base = Math.round(1 + (cloudCover / 100) * 15);
  let count = base;
  if (mood === 'rain') count = Math.max(count, 12);

  const heavy = mood === 'rain';
  const overcast = mood === 'overcast' || cloudCover >= 75;

  const rng = (seed) => {
    let x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };

  const clouds = [];
  for (let i = 0; i < count; i++) {
    const r1 = rng(i + 1);
    const r2 = rng(i + 1.7);
    const r3 = rng(i + 3.3);

    // distribute across the full vertical span (8% .. 78%)
    const top = 8 + r1 * 70;
    // larger range of sizes — some really big when cover is high
    const scale = overcast ? 0.85 + r2 * 1.1 : heavy ? 0.95 + r2 * 1.0 : 0.55 + r2 * 1.0;
    const blur = Math.max(0, 1.8 - Math.min(1.6, scale));
    // opacity scales with cover too — denser cover = more solid clouds
    const baseOpacity = 0.55 + (cloudCover / 100) * 0.4; // 55% .. 95%
    const opacity = Math.max(0.3, baseOpacity - r3 * 0.2);
    const duration = 110 + r2 * 140;
    const delay = -r1 * duration;
    const startLeft = '-25%';
    const tone = heavy && i % 2 === 0 ? 'dark' : overcast && i % 2 === 0 ? 'dark' : 'light';

    clouds.push({ top: `${top}%`, scale, blur, opacity, duration, delay, startLeft, tone });
  }

  // sort by scale so smaller/blurrier (far) render first → feels like depth
  clouds.sort((a, b) => a.scale - b.scale);
  return clouds;
};

const Raindrops = () => {
  const drops = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      const layer = i % 3;
      const left = (i * 37 + (i % 5) * 11) % 100;
      const delay = ((i * 0.13) % 2.4).toFixed(2);
      const dur = (0.85 + layer * 0.25 + ((i * 7) % 11) / 30).toFixed(2);
      const len = 10 + layer * 10 + ((i * 3) % 6);
      const op = 0.25 + layer * 0.22;
      const w = layer === 0 ? 1 : layer === 1 ? 1.4 : 1.8;
      arr.push({ left, delay, dur, len, op, w });
    }
    return arr;
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${d.left}%`,
            top: '-30px',
            width: `${d.w}px`,
            height: `${d.len}px`,
            background:
              'linear-gradient(180deg, rgba(150,180,200,0) 0%, rgba(150,180,200,0.85) 60%, rgba(150,180,200,0.95) 100%)',
            borderRadius: '2px',
            opacity: d.op,
            transform: 'rotate(8deg)',
            animation: `rainFall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const WindWisps = () => {
  const wisps = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        top: 12 + i * 11 + (i % 2) * 3,
        delay: (i * 0.7).toFixed(2),
        dur: 9 + (i % 4) * 1.5,
        opacity: 0.25 + (i % 3) * 0.12,
        scale: 0.7 + (i % 3) * 0.25,
      });
    }
    return arr;
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {wisps.map((w, i) => (
        <svg
          key={i}
          className="absolute"
          width="320"
          height="40"
          viewBox="0 0 320 40"
          style={{
            top: `${w.top}%`,
            left: '-30%',
            opacity: w.opacity,
            transform: `scale(${w.scale})`,
            animation: `windDrift ${w.dur}s ease-in-out ${w.delay}s infinite`,
          }}
        >
          <path
            d="M0 22 Q60 6, 130 20 T260 18 T320 22"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
};

const WeatherBackdrop = ({ mood, cloudCover }) => {
  const clouds = useMemo(() => buildClouds(cloudCover, mood), [cloudCover, mood]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Sky mood={mood} />

      {/* Sun is always on the side. Dimmed when overcast/wind/rain so it reads as "behind clouds". */}
      <SunStage
        intense={mood === 'sunny'}
        dimmed={mood === 'overcast' || mood === 'rain' || mood === 'wind'}
      />

      {/* Clouds: count and density driven by actual cloud cover %. */}
      {clouds.map((c, i) => (
        <DriftingCloud
          key={i}
          top={c.top}
          startLeft={c.startLeft}
          scale={c.scale}
          duration={c.duration}
          delay={c.delay}
          opacity={c.opacity}
          tone={c.tone}
          blur={c.blur}
        />
      ))}

      {mood === 'rain' && <Raindrops />}
      {mood === 'wind' && <WindWisps />}

      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            mood === 'rain' || mood === 'overcast'
              ? 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(220,225,230,0.4) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,240,210,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.45) 100%)',
        }}
      />
    </div>
  );
};

// ---------- Compact, interactive temperature graph ----------

const smoothPath = (points) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
};

const TempGraph = ({ hours }) => {
  const W = 720;
  const H = 140;
  const padX = 36;
  const padTop = 36;
  const padBottom = 32;

  const temps = hours.map((h) => h.temp);
  const minT = Math.min(...temps);
  const maxT = Math.max(...temps);
  const range = Math.max(2, maxT - minT);
  const yMin = minT - range * 0.22;
  const yMax = maxT + range * 0.28;

  const xFor = (h) => padX + (h / 23) * (W - padX * 2);
  const yFor = (t) =>
    padTop + ((yMax - t) / (yMax - yMin)) * (H - padTop - padBottom);

  const points = hours.map((h) => ({ x: xFor(h.hour), y: yFor(h.temp) }));
  const linePath = smoothPath(points);
  const areaPath =
    `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${(H - padBottom).toFixed(2)}` +
    ` L ${points[0].x.toFixed(2)} ${(H - padBottom).toFixed(2)} Z`;

  // 5 informative inline labels at meaningful hours (skipping ceremony - it has its own marker)
  const labelHours = [6, 10, 18, 22];
  const tickHours = [0, 6, 12, 18, 23];
  const tickLabel = (h) => (h === 23 ? '24' : String(h));
  const ceremony = hours.find((h) => h.hour === CEREMONY_HOUR);
  const ceremonyX = ceremony ? xFor(CEREMONY_HOUR) : null;

  const idxMax = temps.indexOf(maxT);
  const idxMin = temps.indexOf(minT);

  // Hover state
  const [hover, setHover] = useState(null); // { hour, temp }
  const svgRef = useRef(null);

  const handleMove = (clientX) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPx = clientX - rect.left;
    const xVB = (xPx / rect.width) * W;
    const hourRaw = ((xVB - padX) / (W - padX * 2)) * 23;
    const h = Math.max(0, Math.min(23, Math.round(hourRaw)));
    setHover({ hour: hours[h].hour, temp: hours[h].temp });
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-gray-800 font-bold">
          Teplota počas dňa
        </h3>
        <span className="font-serif italic text-sm text-gray-500 hidden md:inline">
          potiahnite kurzorom pre detail
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        className="block touch-none"
        role="img"
        aria-label="Graf hodinovej teploty na deň svadby"
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseLeave={() => setHover(null)}
        onTouchStart={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
        onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
        onTouchEnd={() => setHover(null)}
      >
        <defs>
          <linearGradient id="tempArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0DC82" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#92B085" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#92B085" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tempLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a3b8d6" />
            <stop offset="35%" stopColor="#e6c878" />
            <stop offset="65%" stopColor="#e6a55a" />
            <stop offset="100%" stopColor="#7a9aa8" />
          </linearGradient>
        </defs>

        <line
          x1={padX}
          x2={W - padX}
          y1={H - padBottom}
          y2={H - padBottom}
          stroke="#e8e2d4"
          strokeWidth="1"
        />

        <path d={areaPath} fill="url(#tempArea)" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#tempLine)"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* hour ticks */}
        {tickHours.map((h) => (
          <g key={h}>
            <line
              x1={xFor(h)}
              x2={xFor(h)}
              y1={H - padBottom}
              y2={H - padBottom + 5}
              stroke="#cfc7b6"
              strokeWidth="1"
            />
            <text
              x={xFor(h)}
              y={H - padBottom + 24}
              fontSize="17"
              textAnchor="middle"
              fill="#7a7468"
              style={{ fontFamily: 'Alegreya, Georgia, serif' }}
            >
              {tickLabel(h)}h
            </text>
          </g>
        ))}

        {/* 5+ informative inline temperature labels */}
        {labelHours
          .filter((h) => hours[h])
          .map((h) => {
            const t = hours[h].temp;
            return (
              <g key={`lbl-${h}`} pointerEvents="none">
                <circle cx={xFor(h)} cy={yFor(t)} r="3.5" fill="#8a8170" />
                <text
                  x={xFor(h)}
                  y={yFor(t) - 13}
                  fontSize="17"
                  textAnchor="middle"
                  fill="#5a544a"
                  style={{ fontFamily: 'Alegreya, Georgia, serif', fontWeight: 600 }}
                >
                  {Math.round(t)}°
                </text>
              </g>
            );
          })}

        {/* ceremony marker */}
        {ceremony && (
          <g pointerEvents="none">
            <line
              x1={ceremonyX}
              x2={ceremonyX}
              y1={padTop - 10}
              y2={H - padBottom}
              stroke="#92B085"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              opacity="0.9"
            />
            <circle
              cx={ceremonyX}
              cy={yFor(ceremony.temp)}
              r="6.5"
              fill="#92B085"
              stroke="white"
              strokeWidth="2.5"
            />
            <rect
              x={ceremonyX - 60}
              y={padTop - 34}
              width="120"
              height="28"
              rx="14"
              fill="#92B085"
            />
            <text
              x={ceremonyX}
              y={padTop - 14}
              fontSize="16"
              textAnchor="middle"
              fill="white"
              style={{ fontFamily: 'Alegreya, Georgia, serif', fontWeight: 600 }}
            >
              Obrad · {Math.round(ceremony.temp)}°
            </text>
          </g>
        )}

        {/* Min / max points */}
        <g pointerEvents="none">
          <circle cx={xFor(hours[idxMax].hour)} cy={yFor(maxT)} r="4" fill="#e6a55a" />
          <text
            x={xFor(hours[idxMax].hour)}
            y={yFor(maxT) - 13}
            fontSize="18"
            textAnchor="middle"
            fill="#8a5e2a"
            style={{ fontFamily: 'Alegreya, Georgia, serif', fontWeight: 700 }}
          >
            {Math.round(maxT)}°
          </text>
          <circle cx={xFor(hours[idxMin].hour)} cy={yFor(minT)} r="4" fill="#7a9aa8" />
          <text
            x={xFor(hours[idxMin].hour)}
            y={yFor(minT) + 21}
            fontSize="18"
            textAnchor="middle"
            fill="#4f6a76"
            style={{ fontFamily: 'Alegreya, Georgia, serif', fontWeight: 700 }}
          >
            {Math.round(minT)}°
          </text>
        </g>

        {/* Hover crosshair + tooltip */}
        {hover && (
          <g pointerEvents="none">
            <line
              x1={xFor(hover.hour)}
              x2={xFor(hover.hour)}
              y1={padTop - 4}
              y2={H - padBottom}
              stroke="#8a8170"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <circle
              cx={xFor(hover.hour)}
              cy={yFor(hover.temp)}
              r="6.5"
              fill="#fff"
              stroke="#5a544a"
              strokeWidth="2.25"
            />
            {/* Tooltip — flips to the left half if near the right edge */}
            {(() => {
              const tipW = 122;
              const tipH = 48;
              const cx = xFor(hover.hour);
              const flip = cx > W - tipW - 6;
              const tx = flip ? cx - tipW - 12 : cx + 12;
              const ty = Math.max(padTop - 4, yFor(hover.temp) - tipH / 2);
              return (
                <g>
                  <rect
                    x={tx}
                    y={ty}
                    width={tipW}
                    height={tipH}
                    rx="10"
                    fill="rgba(40, 36, 32, 0.92)"
                  />
                  <text
                    x={tx + tipW / 2}
                    y={ty + 20}
                    fontSize="15"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.78)"
                    style={{ fontFamily: 'Alegreya, Georgia, serif' }}
                  >
                    {String(hover.hour).padStart(2, '0')}:00
                  </text>
                  <text
                    x={tx + tipW / 2}
                    y={ty + 39}
                    fontSize="17"
                    textAnchor="middle"
                    fill="white"
                    style={{ fontFamily: 'Alegreya, Georgia, serif', fontWeight: 700 }}
                  >
                    {hover.temp.toFixed(1)}°C
                  </text>
                </g>
              );
            })()}
          </g>
        )}
      </svg>
    </div>
  );
};

// ---------- Main component ----------

const WeatherForecast = () => {
  const [state, setState] = useState({
    status: 'loading',
    data: null,
    hours: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max` +
      `&hourly=temperature_2m,cloud_cover` +
      `&timezone=Europe%2FBratislava` +
      `&start_date=${WEDDING_DATE_STR}&end_date=${WEDDING_DATE_STR}`;

    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('weather fetch failed');
        return r.json();
      })
      .then((json) => {
        const d = json.daily;
        const h = json.hourly;
        if (!d || !d.time || d.time.length === 0) {
          throw new Error('no daily data');
        }
        const code = d.weather_code[0];
        const meta = codeMap(code);

        // average daytime cloud cover (8:00 – 22:00) for mood + animation density
        let cloudCover = 0;
        if (h && Array.isArray(h.cloud_cover)) {
          const slice = h.cloud_cover.slice(8, 23).filter(Number.isFinite);
          cloudCover = slice.length
            ? Math.round(slice.reduce((a, b) => a + b, 0) / slice.length)
            : 0;
        }

        const data = {
          tMin: Math.round(d.temperature_2m_min[0]),
          tMax: Math.round(d.temperature_2m_max[0]),
          precipMm: d.precipitation_sum[0] ?? 0,
          precipProb: d.precipitation_probability_max[0] ?? 0,
          windMax: Math.round(d.wind_speed_10m_max[0] ?? 0),
          cloudCover,
          ...meta,
        };

        let hours = null;
        if (h && Array.isArray(h.time) && Array.isArray(h.temperature_2m)) {
          hours = h.time
            .map((t, i) => ({
              hour: parseInt(t.slice(11, 13), 10),
              temp: h.temperature_2m[i],
            }))
            .filter((x) => Number.isFinite(x.hour) && Number.isFinite(x.temp))
            .slice(0, 24);
        }

        setState({ status: 'ready', data, hours, error: null });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', data: null, hours: null, error: err.message });
      });

    return () => controller.abort();
  }, []);

  const daysUntil = Math.max(
    0,
    Math.ceil((new Date(WEDDING_DATE_STR + 'T15:00:00+02:00') - new Date()) / 86400000),
  );

  const reliabilityNote =
    daysUntil > 7
      ? 'Dlhodobá predpoveď – ešte sa môže zmeniť'
      : daysUntil > 3
        ? 'Aktualizované teraz · presnosť rastie každým dňom'
        : 'Aktualizované teraz · krátkodobá predpoveď';

  const mood = state.data ? pickMood(state.data) : 'sunny-cloudy';
  const cloudCover = state.data?.cloudCover ?? 30;

  return (
    <section
      id="weather"
      aria-label="Počasie na deň svadby"
      className="relative px-4 py-14 md:py-16 overflow-hidden"
    >
      <style>{`
        @keyframes sunBreath {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes sunSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cloudDrift {
          from { transform: translate3d(0, 0, 0) scale(var(--s, 1)); }
          to { transform: translate3d(150vw, 0, 0) scale(var(--s, 1)); }
        }
        @keyframes rainFall {
          0% { transform: translate3d(0, -10vh, 0) rotate(8deg); opacity: 0; }
          12% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translate3d(20vh, 110vh, 0) rotate(8deg); opacity: 0; }
        }
        @keyframes windDrift {
          0% { transform: translate3d(0, 0, 0) scale(var(--s, 1)); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate3d(180vw, -2vh, 0) scale(var(--s, 1)); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="weather-anim"], .weather-anim { animation: none !important; }
        }
      `}</style>

      <WeatherBackdrop mood={mood} cloudCover={cloudCover} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-800 font-bold inline-flex items-center gap-3">
            <Sun className="w-8 h-8 md:w-9 md:h-9 text-sage" strokeWidth={1.5} />
            Počasie na deň svadby
          </h2>
          <p className="font-serif italic text-gray-600 mt-2 text-sm sm:text-base">
            Mýto pod Ďumbierom · sobota 30. 5. 2026
          </p>
        </div>

        {state.status === 'loading' && (
          <div className="text-center font-serif text-gray-600 py-10">
            Načítavame predpoveď…
          </div>
        )}

        {state.status === 'error' && (
          <div className="text-center font-serif text-gray-600 py-10">
            Predpoveď sa zatiaľ nepodarilo načítať. Skúste, prosím, znova neskôr.
          </div>
        )}

        {state.status === 'ready' && state.data && (
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-md border border-white/60 p-5 sm:p-6 md:p-7">
            {/* Top row: forecast + advice side by side */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-7 items-start">
              {/* Forecast block */}
              <div className="flex items-center gap-5 md:pr-7 md:border-r md:border-sage/15">
                <state.data.Icon
                  className="w-20 h-20 sm:w-24 sm:h-24 text-sage shrink-0"
                  strokeWidth={1.25}
                />
                <div className="min-w-0">
                  <p className="font-serif text-base sm:text-lg text-gray-700 leading-tight">
                    {state.data.label}
                  </p>
                  <p className="font-serif font-semibold text-gray-800 text-3xl sm:text-4xl md:text-[2.5rem] tabular-nums leading-tight mt-0.5">
                    {state.data.tMax}°
                    <span className="text-gray-400 text-xl sm:text-2xl ml-2 font-normal">
                      / {state.data.tMin}°
                    </span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 font-serif">
                    <span className="inline-flex items-center gap-1.5">
                      <Umbrella className="w-4 h-4" strokeWidth={1.75} />
                      {state.data.precipProb}%
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Cloud className="w-4 h-4" strokeWidth={1.75} />
                      {state.data.cloudCover}%
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Wind className="w-4 h-4" strokeWidth={1.75} />
                      {state.data.windMax} km/h
                    </span>
                  </div>
                </div>
              </div>

              {/* Advice block */}
              <div>
                <p className="font-serif text-xs sm:text-[13px] uppercase tracking-[0.2em] text-gray-500 mb-2.5">
                  Čo si zbaliť
                </p>
                <ul className="space-y-2.5">
                  {buildAdvice(state.data).map(({ Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-sage/15 text-sage shrink-0">
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </span>
                      <p className="font-serif text-sm sm:text-[15px] text-gray-700 leading-snug">
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full-width graph row */}
            {state.hours && state.hours.length >= 12 && (
              <div className="mt-6 pt-5 border-t border-sage/15">
                <TempGraph hours={state.hours} />
              </div>
            )}

            {/* Encouraging message + reliability — footer row */}
            <div className="mt-5 pt-4 border-t border-sage/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <p className="font-serif italic text-gray-700 text-base sm:text-lg leading-relaxed text-center sm:text-left">
                {getEncouragement(state.data)}
              </p>
              <p className="font-serif italic text-xs text-gray-500 text-center sm:text-right shrink-0">
                {reliabilityNote} · open-meteo.com
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherForecast;
