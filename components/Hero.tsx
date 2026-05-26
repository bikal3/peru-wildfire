// components/Hero.tsx
import { SKILL_TAGS } from '@/lib/constants'

export default function Hero() {
  return (
    <header
      className="px-8 py-10"
      style={{ background: 'linear-gradient(135deg,#1b3a2d 0%,#2d6a4f 60%,#40916c 100%)' }}
    >
      <p className="text-xs tracking-widest uppercase text-green-300 mb-2">
        Geospatial Research · 2025
      </p>
      <h1 className="text-3xl font-bold text-white leading-tight mb-1">
        Wildfire Hotspot Analysis in Peru
      </h1>
      <p className="text-base text-green-200 mb-3">
        Spatial Patterns, Temporal Trends &amp; Threats to Protected Areas
      </p>
      <p className="text-sm text-green-100 max-w-2xl mb-5 leading-relaxed">
        This study analyzes active fire hotspots and burned area data across Peru using NASA FIRMS,
        MODIS MCD64, and Sentinel-2 LULC, identifying high-risk clusters and their overlap with
        national protected areas and indigenous territories.
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {SKILL_TAGS.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs border border-white/30 bg-white/15 text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/bikal3/peru-wildfire"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-200 border-b border-green-400 hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="#methodology"
          className="text-sm text-green-200 border-b border-green-400 hover:text-white transition-colors"
        >
          Methodology
        </a>
      </div>
    </header>
  )
}
