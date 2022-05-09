import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Add from '@mui/icons-material/Add';
import {fetchAddNewServer} from '../../features/serverSlice'  
import { useDispatch } from 'react-redux';
export default function AddServer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch()
  const handleCreate = () => {
    handleClose();
    if(value !== '') {
      dispatch(fetchAddNewServer({name: value, avatar:"//ssl.gstatic.com/accounts/ui/avatar_2x.png", ownerIds: [], memberIds: [] }))
    }
  }
  return (
    <div>
      <Add onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give your new server a personality with a name. You can always change it later.
          </DialogContentText>
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


