import React, { useState } from 'react';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {
    
    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        })
        setOpen(true);
    };

    const handleClose = () => {
        props.updateCustomer(props.customer.links[1].href, customer);
        setCustomer({firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''});
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Tooltip title="Edit Customer">
                <Edit variant="outlined" fontSize="default"  color="primary" onClick={handleClickOpen} />
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Existing Customer</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Firstname"
                    name="firstname"
                    value={customer.firstname}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Lastname"
                    name="lastname"
                    value={customer.lastname}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email"
                    name="email"
                    value={customer.email}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone"
                    name="phone"
                    value={customer.phone}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Street Address"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Postcode"
                    name="postcode"
                    value={customer.postcode}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="City"
                    name="city"
                    value={customer.city}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}