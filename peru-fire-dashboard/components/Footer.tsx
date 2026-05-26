export default function Footer() {
  return (
    <footer
      className="px-8 py-4 flex flex-wrap justify-between items-center text-sm gap-4"
      style={{ background: '#1b3a2d', color: '#95d5b2' }}
    >
      <span>© 2025 · Peru Fire Analysis · Built with Next.js + MapLibre GL</span>
      <div className="flex gap-5">
        <a href="https://github.com" className="border-b border-green-500 hover:text-white transition-colors">
          GitHub
        </a>
        <a href="/data/fire_hotspots.geojson" className="border-b border-green-500 hover:text-white transition-colors">
          Download Data
        </a>
      </div>
    </footer>
  )
}
