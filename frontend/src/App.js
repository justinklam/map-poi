import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import "./app.css";
import { format } from "timeago.js";

// Components
import Register from "./components/register/Register";
import Login from "./components/login/Login";

// MUI
import { Room, Star } from "@material-ui/icons";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [POI, setPOI] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPOI = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      // send newPOI to post route
      const res = await axios.post("/poi", newPOI);
      setPOI([...POI, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
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
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
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
                    {/* Array.fill used cause not jsx */}
                    {/* take rating as a number. fill it with the same amount of stars */}
                    {Array(p.rating).fill(<Star className="star" />)}
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
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a Title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  placeholder="Describe the Place"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Rating </label>
                <select onChange={(e) => setRating(e.target.value)}>
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
        {/* if currentUser exists. show logout. else show others */}
        {currentUser ? (
          <button className="button logout">Log Out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log In
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {/* if showRegister state is true, show Register component */}
        {showRegister && <Register />}
        {showLogin && <Login />}
      </ReactMapGL>
    </div>
  );
}

export default App;
