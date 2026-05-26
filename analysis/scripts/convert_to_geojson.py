"""Convert Peru analysis shapefiles to GeoJSON for the web dashboard."""
from pathlib import Path
import geopandas as gpd

ROOT = Path(__file__).parent.parent / "Peru_project"
OUT = Path(__file__).parent.parent / "peru-fire-dashboard" / "public" / "data"
OUT.mkdir(parents=True, exist_ok=True)


def save(gdf: gpd.GeoDataFrame, name: str) -> None:
    path = OUT / name
    gdf.to_crs("EPSG:4326").to_file(path, driver="GeoJSON")
    size_mb = path.stat().st_size / 1_000_000
    print(f"  {name}: {len(gdf)} features, {size_mb:.1f} MB")


print("Converting fire hotspots...")
hot = gpd.read_file(ROOT / "FIRMS_datasets" / "active_fire_hotspot.shp")
keep_hot = ["ACQ_DATE", "SATELLITE", "CONFIDENCE", "BRIGHTNESS", "FRP",
            "natural_ca", "NAME", "lulc2024", "geometry"]
save(hot[keep_hot], "fire_hotspots.geojson")

print("Converting protected areas...")
pa = gpd.read_file(ROOT / "area-natural-protegida" / "area-natural-protegida.shp")
pa = pa.to_crs("EPSG:3857")
pa.geometry = pa.geometry.simplify(100)  # 100 m tolerance in EPSG:3857
save(pa[["nombre", "name_es", "geometry"]], "protected_areas.geojson")

print("Converting indigenous territories...")
cnt = gpd.read_file(ROOT / "comunidad-nativa-titulada" / "comunidad-nativa-titulada.shp")
cnt = cnt.to_crs("EPSG:3857")
cnt.geometry = cnt.geometry.simplify(100)  # 100 m tolerance in EPSG:3857
save(cnt[["nombre", "name_es", "geometry"]], "indigenous_territories.geojson")

print("Converting country boundary...")
country = gpd.read_file(ROOT / "nivel-politico-1" / "nivel-politico-1.shp")
country = country.to_crs("EPSG:3857")
country.geometry = country.geometry.simplify(100)  # 100 m tolerance in EPSG:3857
save(country[["geometry"]], "country_boundary.geojson")

print("Done.")
