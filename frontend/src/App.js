import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import "./app.css";
import { format } from "timeago.js";

// MUI
import { Room, Star } from "@material-ui/icons";

function App() {
  const [POI, setPOI] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    // latitude: 43,
    // longitude: -79,
    // Toronto
    latitude: 43.65107,
    longitude: -79.347015,
    zoom: 12,
  });

  // retrieve POI from backend
  useEffect(() => {
    const getPOIS = async () => {
      try {
        // reading from proxy - only require /poi
        const res = await axios.get("/poi");
        setPOI(res.data);
      } catch (err) {
        console.log(`Get POI Error`, err);
      }
    };
    getPOIS();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {POI.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              // Moss Park
              // latitude={43.6548}
              // longitude={-79.3726}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{ fontSize: viewport.zoom * 7, color: "slateblue" }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
