import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

// MUI
import { Room } from "@material-ui/icons";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.65107,
    longitude: -79.347015,
    zoom: 12,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={43.6548}
          longitude={-79.3726}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue" }} />
        </Marker>
        <Popup
          latitude={43.6548}
          longitude={-79.3726}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">Moss Park</h4>
            <label>Review</label>
            <p>Great location</p>
            <label>Rating</label>
            <label>Information</label>
          </div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}

export default App;
