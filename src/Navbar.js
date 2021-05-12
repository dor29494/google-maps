import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Navbar({ setState, state }) {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <>
      <List>
        {["Profile", "History", "Send email", "Login"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <Link
              to={`/${text.toLowerCase()}`}
              style={{ textDecoration: "none", color: "initial" }}
            >
              {" "}
              <ListItemText primary={text} />{" "}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"top"}
        open={true}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
