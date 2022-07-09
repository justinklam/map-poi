import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import "./app.css";
import { format } from "timeago.js";

// MUI
import { Room, Star } from "@material-ui/icons";

function App() {
  const currentUser = "placeholderUser";
  const [POI, setPOI] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    // spread viewport and duplicate. set lat/long to parameters from click
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;

    // field is provided as the name is the same
    setNewPlace({
      lat,
      long,
    });

    console.log(newPlace);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDblClick={handleAddClick}
        // zoom on marker speed
        transitionDuration="200"
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
                style={{
                  fontSize: viewport.zoom * 7,
                  // if poi's user is === currentUser = color is red else blue
                  color: p.username === currentUser ? "#0000ff" : "#896fbc",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
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
                  <p className="desc">{p.description}</p>
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
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form>
                <label>Title</label>
                <input placeholder="Enter a Title"></input>
                <label>Review</label>
                <textarea placeholder="Describe the Place"></textarea>
                <label>Rating</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
