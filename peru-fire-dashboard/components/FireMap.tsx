'use client'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Map, Source, Layer, NavigationControl } from 'react-map-gl/maplibre'
import { useState } from 'react'
import { LAYERS, PERU_VIEW, MAP_STYLE, LayerId } from '@/lib/constants'

const DEFAULT_ON: LayerId[] = ['hotspots', 'protected']

export default function FireMap() {
  const [active, setActive] = useState<Set<LayerId>>(new Set(DEFAULT_ON))

  const toggle = (id: LayerId) =>
    setActive((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <section className="px-8 py-10 bg-white border-t border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-2">Interactive Fire Map</h2>
      <p className="text-sm text-gray-500 mb-4">Toggle layers · Pan &amp; zoom · Click points for details</p>

      {/* Layer toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {LAYERS.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`px-3 py-1 rounded text-sm font-medium text-white transition-opacity ${
              active.has(id) ? 'opacity-100' : 'opacity-40'
            }`}
            style={{ backgroundColor: color }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
        <Map initialViewState={PERU_VIEW} mapStyle={MAP_STYLE} style={{ width: '100%', height: '100%' }}>
          <NavigationControl position="top-right" />

          {/* Fire hotspot heatmap */}
          {active.has('hotspots') && (
            <Source id="hotspots" type="geojson" data="/data/fire_hotspots.geojson">
              <Layer
                id="hotspots-heat"
                type="heatmap"
                paint={{
                  'heatmap-weight': ['interpolate', ['linear'], ['get', 'BRIGHTNESS'], 300, 0, 500, 1],
                  'heatmap-color': [
                    'interpolate', ['linear'], ['heatmap-density'],
                    0, 'rgba(0,0,0,0)',
                    0.2, '#fed976',
                    0.5, '#fd8d3c',
                    0.8, '#f03b20',
                    1.0, '#bd0026',
                  ],
                  'heatmap-radius': 15,
                  'heatmap-opacity': 0.85,
                }}
              />
            </Source>
          )}

          {/* Protected areas */}
          {active.has('protected') && (
            <Source id="protected" type="geojson" data="/data/protected_areas.geojson">
              <Layer
                id="protected-fill"
                type="fill"
                paint={{ 'fill-color': '#2d6a4f', 'fill-opacity': 0.25 }}
              />
              <Layer
                id="protected-outline"
                type="line"
                paint={{ 'line-color': '#2d6a4f', 'line-width': 1.5 }}
              />
            </Source>
          )}

          {/* Indigenous territories */}
          {active.has('indigenous') && (
            <Source id="indigenous" type="geojson" data="/data/indigenous_territories.geojson">
              <Layer
                id="indigenous-fill"
                type="fill"
                paint={{ 'fill-color': '#8338ec', 'fill-opacity': 0.2 }}
              />
              <Layer
                id="indigenous-outline"
                type="line"
                paint={{ 'line-color': '#8338ec', 'line-width': 1 }}
              />
            </Source>
          )}

          {/* Country boundary */}
          {active.has('boundary') && (
            <Source id="boundary" type="geojson" data="/data/country_boundary.geojson">
              <Layer
                id="boundary-line"
                type="line"
                paint={{ 'line-color': '#457b9d', 'line-width': 2, 'line-dasharray': [4, 2] }}
              />
            </Source>
          )}
        </Map>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Data: NASA FIRMS · SERNANP · MINAM · Base map: OpenFreeMap
      </p>
    </section>
  )
}
