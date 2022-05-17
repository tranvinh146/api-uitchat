import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import {storage} from '../../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useDispatch } from 'react-redux';
import { fetchUpdateServer } from '../../features/serverSlice';
import { selectInfoServer } from "../../features/infoServerSlice";

export default function UpdateServer() {
  const infoServer = useSelector(selectInfoServer);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null)
  const [value, setValue] = React.useState(infoServer.name);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleUpdate = () => {
    handleClose();
    if(image !== null) {
      const imageRef = ref(storage, "image")
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((url) => {
          if(value !== '') {
            dispatch(fetchUpdateServer({server_id: infoServer._id, name: value, avatar: url}))
          }
        }).catch(error => {
          console.log(error.message, "error getting the image url")
        })
      }).catch(error => {
        console.log(error.message)
      })
    }
    else {
      if(value !== '') {
        dispatch(fetchUpdateServer({server_id: infoServer._id, name: value, avatar: null}))
      }
    }
  }
  return (
    <div>
      <MenuItem onClick={() => {
            handleClickOpen()
          }} disableRipple>
              <EditIcon />
              Update Server Profile
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update your server</DialogTitle>
        <DialogContent>
          <input label="SERVER IMAGE" type="file" onChange={handleImageChange}/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="SERVER NAME"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => {setValue(e.target.value);
          }}
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


