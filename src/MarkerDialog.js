import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialogRoot: {
    "& .MuiDialog-paper": {
      position: "absolute",
      bottom: 0,
      width: "100%",
      marginBottom: 0,
    },
  },
});
export default function MarkerDialog({
  open,
  setOpen,
  selected,
  setShowRadius,
  markers,
  setMarkers,
}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowRadius(false);
    let newMarkers = [...markers];
    newMarkers.forEach((marker) => (marker.setRadius = false));
    setMarkers(newMarkers);
  };

  return (
    <>
      {selected && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className={classes.dialogRoot}
        >
          <DialogTitle id="responsive-dialog-title">{`Want to call to ${selected.name}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText>Bla Bla Bla...</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
