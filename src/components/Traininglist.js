import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import moment from 'moment';

import { forwardRef } from 'react';

//tableicons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Delete from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {

        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))

    }
    console.log(trainings);
    const deleteTraining = (id) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
            .then(_ => getTrainings())
            .then(_ => {
                setMsg('Training deleted')
                setOpen(true)})
            .catch(err => console.error(err)) 
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [state] = React.useState({
        columns: [
            {title: 'Activity', field: 'activity'},
            {title: 'Date', field: 'date', render: (rowData) => moment(rowData.date).format("DD.MM.YYYY HH:mm A")},
            {title: 'Duration (min)', field: 'duration'},
            {title: 'Customer', field: 'customer', render: (rowData) => rowData.customer.firstname + " " + rowData.customer.lastname},
            {
                width: 60,
                render: (rowData) => (<Tooltip title="Delete Training"><Delete color="secondary" onClick={() => deleteTraining(rowData.id)}/></Tooltip>)
            }
        ],
    })

    return (
        <div>
            <MaterialTable 
                icons={tableIcons}
                title="Trainings"
                columns={state.columns}
                data={trainings}
            />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
        </div>
    )
}