import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import leafletPip from 'leaflet-pip'
import L from 'leaflet'

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])

  let gjLayer = L.geoJSON(borderData);
  let results = leafletPip.pointInLayer([-72.7317, 43.88], gjLayer)

  console.log(results)

  return (
    <MapContainer id="mapContainer"
      center={props.center}
      zoom={8}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      keyboard={false}
      boxZoom={false}
      dragging={false}


      style={{ height: "650px", width: "650px" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <Marker position={props.center} />
      <Polygon
        positions={vtOutline}
        pathOptions={{ color: "orange", fillOpacity: 0 }}
      />
    </MapContainer>
  );
}

export default Map;

{/*function MapManip ({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default MapManip*/}
