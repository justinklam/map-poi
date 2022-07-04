import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

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
      >
        <Marker
          latitude={43.6548}
          longitude={-79.3726}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue" }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
