import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.65107,
    longitude: -79.347015,
    zoom: 8,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      ></ReactMapGL>
    </div>
  );
}

export default App;
