// Importing dependencies from react leaflet//

import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import React from 'react'
import ChangeView from '../components/ChangeView'

//functional component Map of Vermont taking props//

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])


  return (
    <MapContainer //props allow us to manipulate teh map properties for click events//
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={false} // disabling user interaction with map//
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      keyboard={false}
      dragging={false}


      style={{ height: "650px", width: "650px" }}
    >
      <ChangeView center={props.center} zoom={props.zoom}/>
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
