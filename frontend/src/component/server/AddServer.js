import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Add from '@mui/icons-material/Add';
import {storage} from '../../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {fetchAddNewServer} from '../../features/serverSlice'  
import { useDispatch } from 'react-redux';
export default function AddServer() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  console.log(image)
  const handleCreate = () => {
    handleClose();
    const imageRef = ref(storage, "image")
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        console.log(url)
        if(value !== '') {
          dispatch(fetchAddNewServer({name: value, avatar: url, ownerIds: [], memberIds: [] }))
        }
      }).catch(error => {
        console.log(error.message, "error getting the image url")
      })
    }).catch(error => {
      console.log(error.message)
    })
  }
  return (
    <div>
      <Add onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your server</DialogTitle>
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
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


