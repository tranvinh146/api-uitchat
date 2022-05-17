import * as React from 'react';
import { API_URL} from "../../app/constant";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useSelector } from 'react-redux';
import { selectInfoServer } from '../../features/infoServerSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { fetchAddMember } from '../../features/memberSlice';
export default function InviteUser() {
  const infoServer = useSelector(selectInfoServer);
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  let member_id = selectedOptions.map(a => a._id);
  const [users, setUsers] = React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`${API_URL}/users`, {headers: authHeader(),})
    .then(res => {
      setUsers(res.data)
    })
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  const handleInvite = () => {
    handleClose();
   dispatch(fetchAddMember({server_id: infoServer._id, owner_ids: [], member_ids: member_id}))
  }
  const handleChange = (event, value) => {
    setSelectedOptions(value);
  }
  console.log(selectedOptions)
  return (
    <div>
      <MenuItem onClick={() => {handleClickOpen()}} disableRipple>
          <GroupAddIcon />
          Invite People
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite people</DialogTitle>
        <DialogContent>
            <Stack spacing={3} sx={{ width: 500 }}>
                <Autocomplete
                    onChange={handleChange}
                    multiple
                    id="tags-outlined"
                    options={users}
                    getOptionLabel={(option) => option.email}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="selected user"
                        placeholder="Typing email or name"
                    />
                    )}
                />
            </Stack>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


