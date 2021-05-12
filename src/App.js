import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Locate from "./Locate";
import { Grid, Box, Typography, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import MarkerDialog from "./MarkerDialog";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const libraries = ["places"];

const useStyles = makeStyles({
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    width: "100%",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative"
  },
  locateButton: { width: "25px", height: "50px",position: "absolute",right: "50px"},
});
function App() {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showRadius, setShowRadius] = useState(false);
  const [drawerToggle, setdrawerToggle] = useState(false);
  const [center, setCenter] = useState({
    lat: 32.073582,
    lng: 34.788052,
  });
  let history = useHistory();
  const classes = useStyles();
  var db = firebase.firestore();
  console.log(open);

  useEffect(() => {
    // set map to center every render!

    // get all users!
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { email, lng, lat, name, radius } = doc.data();
          let sendObject = {
            email: email,
            lng: lng,
            lat: lat,
            name: name,
            radius: radius,
            setRadius: false,
          };
          setMarkers((prev) => [...prev, sendObject]);
        });
        console.log(querySnapshot);
      });
  }, [markers]);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  });
  console.log(process.env.REACT_APP_API_KEY);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries,
  });
  const openDialog = useCallback(({ toggle }) => {
    openRef.current = toggle;
  });

  const mapRef = useRef();
  const openRef = useRef();

  const markerHandler = (marker) => {
    setSelected(marker);
    let markerClone = { ...marker };
    markerClone.setRadius = true;
    setMarkers((prev) => [...prev, markerClone]);
    setOpen(!open);
    setShowRadius(!showRadius);
  };
  const LocateHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => null
    );
  };
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      mapRef.current.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      mapRef.current.setZoom(17);
    });
  }, []);

  if (loadError) return "error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/">
          <Grid container>
            {drawerToggle && (
              <Navbar state={drawerToggle} setState={setdrawerToggle} />
            )}
            <Grid item xs={12} className={classes.header}>
              <Box className={classes.headerBox}>
                <h1>
                  DogWalker{" "}
                  <span role="img" aria-label="dogs">
                    🐶
                  </span>
                </h1>
                <Button
                  className={classes.locateButton}
                  variant="contained"
                  onClick={LocateHandler}
                >
                  Locate!
                </Button>
                <IconButton onClick={() => setdrawerToggle(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MarkerDialog
                setShowRadius={setShowRadius}
                open={open}
                setOpen={setOpen}
                selected={selected}
                markers={markers}
                setMarkers={setMarkers}
              />
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onMapLoad}
              >
                {center && (
                  <div style={{ zIndex: 1000 }}>
                    <Marker
                      position={{
                        lat: center.lat,
                        lng: center.lng,
                      }}
                      icon={{
                        url: "/user.svg",
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20),
                      }}
                    />
                  </div>
                )}
                {markers.map((marker, key) => (
                  <>
                    <Marker
                      key={key}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      icon={{
                        url: "/dog.svg",
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20),
                      }}
                      onClick={() => markerHandler(marker)}
                    />
                    <Circle
                      strokeColor="#FF0000"
                      strokeOpacity={0.8}
                      strokeWeight={2}
                      fillColor="#FF0000"
                      fillOpacity={0.35}
                      center={{ lat: marker.lat, lng: marker.lng }}
                      radius={marker.setRadius ? marker.radius : 0}
                    />
                  </>
                ))}
              </GoogleMap>
            </Grid>
          </Grid>
        </Route>
        {/* <Route path="/login">
          <Login/>
        </Route> */}
    {/* </Switch> */}
    </div>
  );
}
export default App;
