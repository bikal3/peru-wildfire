const DATA_SOURCES = [
  '🛰️ NASA FIRMS — J1V-C2, J2V-C2, SV-C2, M-C61',
  '🌍 MODIS MCD64A1 Burned Area',
  '🗺️ Sentinel-2 10m LULC 2024',
  '🏛️ SERNANP National Protected Areas',
  '🌱 MINAM Indigenous Community Boundaries',
]

const PIPELINE = [
  '🐍 Python · GeoPandas · Pandas',
  '📊 DBSCAN Spatial Clustering',
  '📈 STL Temporal Decomposition',
  '🗺️ QGIS · ArcGIS Pro',
  '📁 R Markdown · Jupyter Notebooks',
]

export default function Methodology() {
  return (
    <section id="methodology" className="px-8 py-10 bg-white border-t border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-6">Methodology &amp; Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Data Sources
          </h3>
          <ul className="space-y-2">
            {DATA_SOURCES.map((s) => (
              <li key={s} className="text-sm text-gray-700">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Analysis Pipeline
          </h3>
          <ul className="space-y-2">
            {PIPELINE.map((s) => (
              <li key={s} className="text-sm text-gray-700">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
