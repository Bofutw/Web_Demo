import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function ConfirmDialog({
  profilesend,
  setProfileSend,
  emailref,
  nicknameref,
  realnameref,
  birthdayref,
  profileURL,
  arearef,
  signref,
}) {
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  let email = emailref.current.value;
  let nickname = nicknameref.current.value;
  let birthday = birthdayref.current.value;
  let area = arearef.current.value;
  let sign = signref.current.value;
  let realname = realnameref.current.value;

  let a = [realname, email, profileURL, nickname, birthday, area, sign];

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   setProfileSend(true);
  //   setAgree(false);
  // };

  const handleClose = () => {
    setProfileSend(false);
    setAgree(false);
  };

  const handleAgree = (e) => {
    e.preventDefault();

    setProfileSend(true);
    console.log(a);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        開啟對話窗
      </Button> */}
      <Dialog
        open={profilesend}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={() => setProfileSend(false)}
      >
        <DialogTitle id="alert-dialog-title">提示視窗</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定要把表單送出嗎?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>再想想</Button>
          <Button onClick={handleAgree} autoFocus>
            確認送出
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
