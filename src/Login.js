import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Search from "./Search";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
      fontFamily: "Yanone Kaffeesatz",
      fontWeight: "200",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tan",
      },
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
  },
  button: {
    marginTop: "1rem",
    color: "coral",
    borderColor: "white",
    "&.MuiButton-root": {
      "&:hover": {
        background: "#1DB954",
        color: "white",
        borderColor: "white",
      },
    },
  },
}));

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const Login = ({history}) => {
    var db = firebase.firestore();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    password: "",
    lat: null,
    lng: null,
    radius: null,
  });
  const [radius, setRadius] = React.useState('');
  const [errorMsg, setErrorMsg] = useState({
    alert: 0,
    msg: "",
  });
  const classes = useStyles();

  const handleRadiusChange = (e)=>{
    const { ...data } = contactInfo;
    setRadius(e.target.value)
    data.radius = e.target.value  
    setContactInfo(data)   
  }
  const changeHandler = (e) => {
    const { ...data } = contactInfo;
    data[e.target.name] = e.target.value;
    setContactInfo(data);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, lat, lng,radius} = contactInfo;
    
    console.log(contactInfo);
    if (
      name.length >= 3 &&
      password.length >= 8 &&
      password.length <= 16 &&
      validateEmail(email) &&
      lat !== null &&
      lng !== null &&
      radius >= 500 &&
      radius <= 5000
    ) {
        console.log("start")
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          db.collection("users").add(contactInfo).then((docRef)=>{
            console.log("Document written with ID: ", docRef.id);
            history.push("/")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
          // ...
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const checker = ()=>{
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
  }
  return (
    <Box component="div" style={{ background: "#233", height: "100vh" }}>
      <Grid container justify="center">
        <Box component="form" className={classes.form} onSubmit={submitHandler}>
          <Typography
            variant="h5"
            style={{
              color: "coral",
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Londrina Solid",
              fontWeight: 300,
              fontSize: "2rem",
            }}
          >
            Become a Dog Walker! 🐕‍🦺
          </Typography>
          {errorMsg.msg ? (
            <Typography variant="subtitle1" style={{ color: "red" }}>
              {errorMsg.msg}
            </Typography>
          ) : null}
          <InputField
            onChange={changeHandler}
            className={classes.input}
            fullWidth={true}
            name="name"
            label="Full Name"
            inputProps={{ style: { color: "white" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            style={{ marginTop: "10px" }}
          />
          <br />
          <InputField
            onChange={changeHandler}
            className={classes.input}
            fullWidth={true}
            name="email"
            label="Email"
            inputProps={{ style: { color: "white" } }}
            variant="outlined"
            size="medium"
            style={{ marginTop: "10px" }}
          />
          <br />
          <InputField
            type="password"
            onChange={changeHandler}
            className={classes.input}
            fullWidth={true}
            name="password"
            label="password"
            inputProps={{ style: { color: "white" } }}
            variant="outlined"
            size="medium"
            style={{ marginTop: "10px" }}
          />
          <br />
          <Typography
            variant="h5"
            style={{
              color: "coral",
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Londrina Solid",
              fontWeight: 300,
              fontSize: "2rem",
            }}
          >
            Please Choose your address 📍
          </Typography>
          <Search setContactInfo={setContactInfo} contactInfo={contactInfo} />
          <br />
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Radius</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={radius}
          onChange={handleRadiusChange}
        >
          <MenuItem value={500}>{"500m"}</MenuItem>
          <MenuItem value={1000}>1km</MenuItem>
          <MenuItem  value={2000}>2km</MenuItem>
          <MenuItem value={5000}>5km</MenuItem>
        </Select>
        <FormHelperText>Please Select Your Walking Distance</FormHelperText>
      </FormControl>
          <br />
          <Button
            type="submit"
            variant="outlined"
            className={classes.button}
            fullWidth={true}
            endIcon={<SendIcon />}
          >
            Sign up
          </Button>
          <br />
          <Button
            variant="outlined"
            className={classes.button}
            fullWidth={true}
            endIcon={<SendIcon />}
            onClick={checker}
          >
            Check
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Login;
