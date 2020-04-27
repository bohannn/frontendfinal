import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
export default function AddTraining(props) {

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({
        activity: '',
        date: '',
        duration: '',
        customer: props.customer.links[1].href
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // Format the date to ISO-8601
        training.date = moment(training.date).toISOString();
        console.log(training.date);
        props.addTraining(training);
        setTraining({activity: '', date: '', duration: '', customer: ''});
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                ADD TRAINING
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Activity"
                    name="activity"
                    value={training.activity}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Date (MM-dd-yy hh:mm)"
                    name="date"
                    value={training.date}
                    onChange={(e) => inputChanged(e)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Duration"
                    name="duration"
                    value={training.duration}
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